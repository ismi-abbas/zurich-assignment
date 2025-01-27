# Zurich Insurance Claims Management Frontend

## Overview

This is the frontend application for the Zurich Insurance Claims Management System, built with Next.js using the Pages Router architecture and Redux for state management.

## Architecture

### Pages Router

The application uses Next.js Pages Router for routing, providing:

- Server-side rendering for better performance
- File-system based routing
- API routes for backend communication
- Automatic code splitting

### State Management

Redux Toolkit is used for state management with the following structure:

#### Claims Slice (`/store/slices/claimSlice.ts`)

- Manages claims data and UI state
- Features:
  - CRUD operations for claims
  - Filtering and sorting functionality
  - Search capabilities
  - Loading and error states

#### Policies Slice (`/store/slices/policySlice.ts`)

- Handles policy-related state
- Features:
  - Policy data management
  - CRUD operations
  - State synchronization

## Key Features

- Claims Management
  - View all claims with filtering and sorting
  - Create new claims
  - Update claim status
  - Delete claims
- Policy Management
  - View policy details
  - Link policies to claims
- Modern UI with responsive design
- Real-time state updates

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
frontend/
├── src/
│   ├── pages/          # Next.js pages
│   │   ├── claims/     # Claims-related pages
│   │   └── policies/   # Policy-related pages
│   ├── components/     # Reusable components
│   ├── store/          # Redux store configuration
│   │   ├── slices/     # Redux slices
│   │   └── store.ts    # Store configuration
│   └── styles/         # Global styles
└── public/            # Static assets
```

## Technologies Used

- Next.js - React framework
- Redux Toolkit - State management
- TypeScript - Programming language
- Tailwind CSS - Styling
