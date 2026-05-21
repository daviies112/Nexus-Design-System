# Secretária IA - WhatsApp Automation Platform

## Project Overview
A full-stack lead generation and automation platform built with React, Express.js, and PostgreSQL. The application helps businesses automate WhatsApp communications, qualify leads, and schedule demos.

## Architecture
- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Replit managed)
- **Build System**: Vite for frontend, TSX for backend
- **UI Components**: shadcn/ui with Radix UI primitives

## Project Structure
```
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # UI components and page sections
│   │   ├── pages/            # Route components
│   │   ├── hooks/            # Custom React hooks
│   │   └── lib/              # Utilities and configurations
├── server/                   # Express backend
│   ├── index.ts              # Main server entry point
│   ├── routes.ts             # API routes
│   ├── db.ts                 # Database connection
│   ├── storage.ts            # Data access layer
│   └── vite.ts               # Vite development integration
├── shared/                   # Shared types and schemas
│   └── schema.ts             # Database schema and validation
└── attached_assets/          # Static assets and images
```

## Key Features
1. **Lead Qualification System** - Intelligent scoring based on business metrics
2. **WhatsApp Chat Automation** - AI-powered conversational interface
3. **Demo Scheduling** - Integrated calendar booking system
4. **ROI Calculator** - Custom business value calculations
5. **Payment Integration** - Stripe subscription management
6. **Email Campaign Management** - Automated nurture sequences

## Configuration Files Created
- `tsconfig.json` - TypeScript configuration with path aliases
- `vite.config.ts` - Vite build configuration with Replit plugins
- `tailwind.config.js` - TailwindCSS styling configuration
- `postcss.config.cjs` - PostCSS processing configuration
- `drizzle.config.ts` - Database ORM configuration

## Database Setup
- Uses Replit's managed PostgreSQL database
- Schema managed via Drizzle ORM
- Automatic migrations with `npm run db:push`

## Development Workflow
- **Start Development**: `npm run dev` (serves on port 5000)
- **Build Production**: `npm run build`
- **Start Production**: `npm run start`
- **Database Push**: `npm run db:push`

## Deployment Configuration
- **Target**: VM deployment (maintains server state)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

## Environment Requirements
- PostgreSQL database (configured via Replit)
- Optional: Stripe API keys for payment processing
- Optional: Google Calendar API for scheduling

## Recent Changes (Fresh GitHub Import - September 25, 2025)
- Successfully imported GitHub project to Replit environment
- Fixed Vite configuration for Replit compatibility (removed problematic plugins)
- Resolved TSX execution by using direct node_modules path
- Set up PostgreSQL database with proper environment variables
- Applied database schema using Drizzle ORM
- Configured development workflow with proper host settings (0.0.0.0:5000)
- Set up VM deployment configuration for production

## Current Status
✅ All dependencies properly configured
✅ Database connected and schema migrated
✅ Development server running successfully on port 5000
✅ Frontend React app rendering correctly
✅ Backend Express.js API operational
✅ Vite hot module replacement working
✅ VM deployment configuration completed
✅ Project import successfully completed
✅ Google Calendar service initialized successfully
✅ API endpoints responding correctly

## Import Resolution Notes
- Used direct paths to npm binaries (tsx, drizzle-kit) due to missing .bin directory
- Simplified Vite config to avoid plugin import issues
- Database environment variables properly detected and configured
- All core functionality verified and working
- Stripe integration requires VITE_STRIPE_PUBLIC_KEY (expected warning)

## Production Ready
The application is now ready for development and can be published to production using Replit's deployment system.