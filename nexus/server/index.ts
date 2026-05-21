import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { googleCalendarService } from "./google-calendar";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // In production, don't log response bodies to prevent PII leakage
      if (app.get("env") === "development" && capturedJsonResponse) {
        // Safe logging - exclude all potential PII fields
        const safeResponse = { ...capturedJsonResponse };
        
        // Remove basic PII fields
        delete safeResponse.email;
        delete safeResponse.phone;
        delete safeResponse.name;
        delete safeResponse.company;
        delete safeResponse.contactEmail;
        delete safeResponse.contactPhone;
        delete safeResponse.contactName;
        
        // Remove onboarding survey PII fields
        delete safeResponse.companyName;
        delete safeResponse.primaryContact;
        delete safeResponse.businessSegment;
        delete safeResponse.employeeCount;
        delete safeResponse.currentSolutions;
        delete safeResponse.mainChallenges;
        delete safeResponse.automationGoals;
        delete safeResponse.timeline;
        delete safeResponse.budget;
        delete safeResponse.decisionMakers;
        delete safeResponse.additionalInfo;
        
        // Remove demo/lead notes that might contain PII
        delete safeResponse.notes;
        delete safeResponse.attendeeName;
        delete safeResponse.attendeeEmail;
        
        // Only log non-sensitive metadata
        const metadataResponse = {
          id: safeResponse.id,
          status: safeResponse.status,
          createdAt: safeResponse.createdAt,
          type: safeResponse.type,
          leadId: safeResponse.leadId,
          scheduledDate: safeResponse.scheduledDate,
          message: safeResponse.message
        };
        
        logLine += ` :: ${JSON.stringify(metadataResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Initialize Google Calendar service asynchronously after server starts (non-blocking)
  setImmediate(async () => {
    try {
      await googleCalendarService.initialize();
      console.log('Google Calendar service initialized successfully');
    } catch (error) {
      console.log('Google Calendar service not available (missing credentials) - scheduling will work with database only');
    }
  });
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    log(`Error ${status}: ${message}`);
    
    // Don't throw in production - this would crash the server
    if (app.get("env") === "development") {
      console.error(err);
    }
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
