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

## Migration Notes
- Configured Vite server host to `0.0.0.0` and port to `5000` for Replit compatibility
- `allowedHosts: true` to support Replit's proxied preview
