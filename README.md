# TrueFeed — Superproject

This repository is the superproject that groups two submodules: the Next.js frontend and the Node.js backend. It contains shared documentation, high-level project structure, and optional shared packages.

Contents

- `TrueFeed-Frontend/` — Next.js client application (Git submodule)
- `TrueFeed-Backend/` — Node.js/Express API server (Git submodule)
- `docs/` — Academic and planning documentation
- `packages/` — Optional shared utilities or TypeScript types

Getting started (high-level)

1. Clone the superproject:

   git clone <superproject-repo-url>

2. Initialize submodules (if using git submodules):

   git submodule update --init --recursive

3. Install and run each subproject separately (see subproject README files):

   - `cd TrueFeed-Frontend` and follow that README
   - `cd TrueFeed-Backend` and follow that README

Notes

- This superproject can host shared utilities under `packages/` when multiple submodules require the same code or types.

---

## Project structure

This structure is designed for maximum clarity, separation of concerns, and scalability, aligning with the Git Submodule architecture.

### 1. Superproject Root (/)

This is the main Git repository that contains references (submodules) to your two independent applications.

```
/
├── frontend/            # Git Submodule: Next.js Client Application
├── backend/             # Git Submodule: Node.js/Express API Server
├── docs/                # FMP Academic and Planning Documentation
│   ├── 01_Research/
│   ├── 02_Design_Documents/
│   └── FMP_Report.pdf   # Final written dissertation/report
├── .git/                # Superproject Git history
├── .gitmodules          # Configuration linking the two submodules
├── README.md            # Project setup and guide
└── package.json         # Optional: Can be used for shared scripts (e.g., `npm run lint:all`)
```

### 2. Frontend Structure (/frontend)

This structure follows modern Next.js App Router conventions, separating UI components from data fetching logic.

```
/frontend
├── src/
│   ├── app/            # Main App Router (Pages & Layouts)
│   │   ├── (auth)/     # Group for authentication routes (login, register)
│   │   ├── dashboard/   # Main application views
│   │   └── layout.tsx   # Root layout and global providers
│   ├── components/     # Reusable UI components
│   │   ├── modules/     # Complex, stateful components (UserTable, ProjectCard)
│   │   └── ui/          # Atomic, style-focused components (Button, Input)
│   ├── lib/             # Client-side helpers and API logic
│   ├── api/             # Specific functions for calling the Node.js backend
│   │   ├── userApi.ts
│   │   └── projectApi.ts
│   ├── hooks/           # Custom React hooks (e.g., useDebounce, useAuth)
│   ├── styles/          # Global CSS, Tailwind setup
│   └── public/          # Static assets (images, fonts, favicon)
├── package.json         # Frontend dependencies
├── next.config.js
├── tsconfig.json
└── .env.local           # NEXT_PUBLIC_API_URL
```

### 3. Backend Structure (/backend)

This structure implements a robust Layered Architecture (Controller-Service-Model), which is essential for maintainability and testing the business logic independently.

```
/backend
├── src/
│   ├── controllers/    # Handle HTTP request/response. Calls services.
│   │   ├── authController.js
│   │   └── projectsController.js
│   ├── services/       # Business Logic Layer. Contains core application logic.
│   │   ├── authService.js
│   │   └── projectsService.js
│   ├── models/         # Database Schemas and Definitions (Mongoose/Prisma/Sequelize models)
│   │   ├── User.js
│   │   └── Project.js
│   ├── routes/         # Define API endpoints and map them to controllers.
│   │   ├── api.js      # Main route entry point
│   │   └── v1/         # API versioning
│   │       ├── authRoutes.js
│   │       └── projectRoutes.js
│   ├── middleware/     # Functions run before controllers (e.g., JWT validation, CORS)
│   ├── config/         # Database connection, logging setup
│   ├── server.js       # Application entry point, starts the server
│   └── tests/          # Unit and Integration Tests
├── package.json        # Backend dependencies (Express, DB driver, Auth library)
└── .env.local          # PORT, DATABASE_URL, JWT_SECRET
```

---

Notes

- Keep business logic in `services/` so it can be tested independently of HTTP concerns.
- Use `routes/` as thin mappings to controllers; controllers should remain small and delegate to services.
- Place shared TypeScript types or utility libraries in the superproject `packages/` folder if multiple submodules need them.
