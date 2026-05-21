import express from "express";
import { registerRoutes } from "../server/routes.js";
import { googleCalendarService } from "../server/google-calendar.js";

// Cache the Express app to avoid recreating it on every request
let app;
let initialized = false;

async function initializeApp() {
  if (initialized) return app;
  
  app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Add middleware for logging API requests (simplified for serverless)
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        
        // Safe logging - exclude PII in production
        if (process.env.NODE_ENV !== "production" && capturedJsonResponse) {
          const safeResponse = { ...capturedJsonResponse };
          
          // Remove PII fields
          delete safeResponse.email;
          delete safeResponse.phone;
          delete safeResponse.name;
          delete safeResponse.company;
          delete safeResponse.contactEmail;
          delete safeResponse.contactPhone;
          delete safeResponse.contactName;
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
          delete safeResponse.notes;
          delete safeResponse.attendeeName;
          delete safeResponse.attendeeEmail;
          
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

        console.log(logLine);
      }
    });

    next();
  });

  // Initialize Google Calendar service (optional)
  try {
    await googleCalendarService.initialize();
    console.log('Google Calendar service initialized successfully');
  } catch (error) {
    console.log('Google Calendar service not available (missing credentials) - scheduling will work with database only');
  }
  
  // Register all API routes
  await registerRoutes(app);

  // Global error handler
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(`Error ${status}: ${message}`);
    
    if (process.env.NODE_ENV !== "production") {
      console.error(err);
    }
  });

  initialized = true;
  return app;
}

// Export the serverless function handler
export default async function handler(req, res) {
  try {
    const app = await initializeApp();
    return app(req, res);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}