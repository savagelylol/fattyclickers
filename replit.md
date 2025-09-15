# Overview

This is a 2D web-based idle clicker game called "Become Fat Simulator" built with React, TypeScript, and modern web technologies. The game allows players to create and customize a character who starts slim and gains weight through clicking and eating various foods. The application features a split-screen layout with character visualization on the left and a comprehensive shop system on the right, offering food items, cosmetics, and upgrades. The game includes idle progression mechanics, visual character transformation based on weight stages, and persistent game state management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React-based single-page application (SPA) architecture with TypeScript for type safety. The frontend is built using Vite as the build tool and bundler, providing fast development server and optimized production builds. The component structure follows a modular approach with custom game components and a comprehensive UI component library built on Radix UI primitives.

**Key Design Decisions:**
- **React with TypeScript**: Chosen for type safety, component reusability, and modern development experience
- **Vite Build System**: Selected for fast hot module replacement during development and efficient bundling
- **Custom Hook Pattern**: Game state management is centralized in a custom `useGameState` hook for clean separation of concerns
- **Canvas-based Character Rendering**: Uses HTML5 Canvas for dynamic character visualization that changes based on weight stages and cosmetics

## Backend Architecture
The backend follows a minimalist Express.js server architecture designed primarily for serving the static frontend assets. The server includes a modular route registration system and comprehensive request logging middleware.

**Key Design Decisions:**
- **Express.js Framework**: Lightweight and flexible for handling HTTP requests and static file serving
- **Middleware-first Approach**: Request logging and error handling implemented as Express middleware
- **Modular Route Structure**: Routes are organized in separate modules for maintainability
- **Development-optimized**: Vite integration for development with HMR support

## Data Storage Solutions
The application implements a dual-storage approach combining client-side persistence with an abstracted server-side storage interface.

**Key Design Decisions:**
- **Client-side localStorage**: Game state persistence using browser localStorage for offline gameplay
- **Abstract Storage Interface**: Server implements an `IStorage` interface allowing easy swapping between storage backends
- **In-memory Storage**: Default implementation uses `MemStorage` class for development and testing
- **Database-ready Architecture**: Drizzle ORM configuration prepared for PostgreSQL integration when needed

## Authentication and Authorization
The current implementation includes a basic user schema and storage interface prepared for future authentication features.

**Key Design Decisions:**
- **User Schema Foundation**: Basic user table with username/password fields defined using Drizzle ORM
- **Extensible Design**: Storage interface designed to accommodate future authentication requirements
- **No Current Implementation**: Authentication is not yet implemented, focusing on core game mechanics first

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and consistent styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI components used as foundation for custom components
- **Shadcn/ui**: Pre-built component library built on Radix UI providing consistent design system
- **Lucide React**: Icon library for UI elements and game interface

### Game Development
- **React Query (@tanstack/react-query)**: Data fetching and state management for server communication
- **HTML5 Canvas**: Native browser API for character rendering and visual effects
- **CSS Animations**: Tailwind CSS animations for UI transitions and feedback

### Database and ORM
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect support
- **Neon Database**: Serverless PostgreSQL database service (configured but not yet utilized)
- **Drizzle Kit**: Database migration and schema management tools

### Development Tools
- **TypeScript**: Static typing for improved development experience and code reliability
- **ESBuild**: Fast JavaScript bundler for production builds
- **Wouter**: Lightweight client-side routing library
- **React Hook Form**: Form handling and validation library

### State Management
- **Custom React Hooks**: Centralized game state management using React's built-in state primitives
- **Local Storage API**: Browser storage for game data persistence
- **React Context**: For UI state management (toasts, tooltips)