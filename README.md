# Task Management App with TypeScript

This project is a fully typed React task management application built with TypeScript and Vite. It includes a task dashboard, task details, create/edit task forms, Auth0 authentication, error handling, and global state management using React Context.

## Features

- Dashboard for viewing and managing tasks
- Task detail view with direct access to edit and delete
- Create and edit forms with validation and typed form state
- Auth0 login and protected task management routes
- React Context API for global task state
- LocalStorage persistence for task data
- TypeScript interfaces and typed hooks throughout the app

## Setup

1. Clone the repository to your local machine.
2. Copy `.env.example` to `.env`.
3. Set your Auth0 values in `.env`:
   - `VITE_AUTH0_DOMAIN`
   - `VITE_AUTH0_CLIENT_ID`
   - `VITE_AUTH0_AUDIENCE`
   - `VITE_AUTH0_REDIRECT_URI`
4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

6. Open the app in your browser. The default Vite port is `http://localhost:5173`.

## Auth0 configuration

- Create an Auth0 application in the Auth0 dashboard.
- Add `http://localhost:5173` to the allowed callback URLs.
- Add the same URI to allowed logout URLs.
- Use the Auth0 domain and client ID in your `.env` file.
- The audience can be set if you use API authorization, but it can remain empty for basic login flows.

## Project structure

- `src/main.tsx` — App entry point and Auth0 provider setup
- `src/App.tsx` — Routes and top-level navigation
- `src/context/TaskContext.tsx` — Typed task management global state
- `src/components/TaskForm.tsx` — Create/edit form with validation
- `src/components/ProtectedRoute.tsx` — Route guard for authenticated pages
- `src/pages` — Dashboard, task details, create/edit forms, login, profile, and not found pages
- `src/types.ts` — TypeScript interfaces and type aliases

## Notes

- Task data is saved to `localStorage` so the dashboard persists between page reloads.
- Authentication is required for creating, editing, and accessing the profile page.
- If you want to publish this repository on GitHub, be sure not to commit your `.env` file.
