# Ernest Steamers - Carpet Cleaning Website

## Overview
A marketing website for Ernest Steamers, a carpet cleaning service in Chicago & Suburbs. Built with React, Vite, TypeScript, and Tailwind CSS using shadcn/ui components.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form + Zod validation
- **State/Data**: TanStack React Query

## Project Structure
- `src/pages/` - Page components (Index, Services, ServiceAreas, About, Blog, BlogPost, NotFound)
- `src/components/` - Reusable components (Navbar, Footer, HeroSection, etc.)
- `src/components/ui/` - shadcn/ui primitive components
- `src/data/` - Static data (blog posts)
- `src/assets/` - Images and static assets
- `src/hooks/` - Custom React hooks

## Running the App
The app runs on port 5000 via the "Start application" workflow (`npm run dev`).

## Backend (serve.js)
- Express-less Node HTTP server on port 5000 serving the Vite `dist/` build with SPA fallback
- `POST /api/leads` — logs quote-form submissions to PostgreSQL `leads` table
- Uses `pg` Pool with `DATABASE_URL` env var (Replit-managed Postgres)
- `leads` table columns: id, name, email, phone, address, service, rooms, square_footage, preferred_date, message, source (page path), user_agent, ip, created_at
- QuoteFormDialog posts to `/api/leads` only. `serve.js` saves the lead, then forwards it to `N8N_LEAD_WEBHOOK` when that server env var is set. If the var is unset or the forward fails, the lead is still saved.
- Production database is queryable read-only via `executeSql({ environment: "production" })` — user can ask for leads anytime

## Migration Notes
- Configured Vite server host to `0.0.0.0` and port to `5000` for Replit compatibility
- `allowedHosts: true` to support Replit's proxied preview
