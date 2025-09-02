# Overview

RoboQuest is an educational mobile game that teaches robotics concepts through an interactive platformer experience. Players control a robot character to collect different robot parts (sensors, motors, wires, gears, batteries) while learning about their functions through educational popups. The game features three levels with increasing difficulty, hazards to avoid, and a progression system that rewards learning.

The game is fully branded with STEMverse throughout the interface including menu screens, educational content, and completion screens.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based UI
- **State Management**: Zustand stores for game state, audio management, and educational content
- **Canvas Rendering**: Custom 2D game engine built with HTML5 Canvas for smooth gameplay
- **Styling**: TailwindCSS for responsive design with extensive Radix UI components for consistent interface elements
- **Build System**: Vite for fast development and optimized production builds

## Game Engine Design
- **Modular Architecture**: Separated concerns with dedicated classes for Player, Physics, Renderer, Level, Collectible, and Hazard systems
- **Game Loop**: RequestAnimationFrame-based game loop for 60fps performance
- **Input Handling**: Support for both keyboard controls and touch interfaces for mobile gameplay
- **Educational Integration**: Popup system that displays robot facts when collectibles are gathered

## Backend Architecture
- **Framework**: Express.js server with TypeScript for API endpoints
- **Database Layer**: Drizzle ORM configured for PostgreSQL with Neon database integration
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **Development Setup**: Vite middleware integration for hot reloading in development

## Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless database
- **ORM**: Drizzle with type-safe schema definitions
- **Migration System**: Drizzle Kit for database schema management
- **Local Storage**: Browser localStorage for game settings and progress persistence
- **In-Memory Storage**: Fallback MemStorage class for development without database

## Audio System
- **Audio Management**: Custom Zustand store for background music, sound effects, and mute controls
- **Sound Assets**: Support for MP3, OGG, and WAV audio files
- **Volume Control**: Per-sound type volume management with global mute functionality

## Mobile Optimization
- **Touch Controls**: Virtual joystick and button controls for mobile devices
- **Responsive Design**: Fluid canvas sizing and UI adaptation for different screen sizes
- **Performance**: Optimized rendering pipeline for smooth gameplay on mobile devices
- **Asset Loading**: Lazy loading of game assets with progress indication

# External Dependencies

## Database and ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **drizzle-kit**: Database migration and schema management tools

## Frontend Libraries
- **React Ecosystem**: React 18 with TypeScript support
- **@tanstack/react-query**: Server state management and caching
- **zustand**: Lightweight state management for game state
- **@radix-ui/***: Comprehensive UI component library for accessible interfaces

## 3D and Visual Libraries
- **@react-three/fiber**: React renderer for three.js (for potential 3D elements)
- **@react-three/drei**: Useful helpers and abstractions for 3D scenes
- **@react-three/postprocessing**: Post-processing effects pipeline

## Styling and UI
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Utility for constructing className strings dynamically

## Build and Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting in development

## Audio and Media
- **vite-plugin-glsl**: GLSL shader file support for advanced visual effects
- Support for large model files (GLTF, GLB) and audio formats (MP3, OGG, WAV)