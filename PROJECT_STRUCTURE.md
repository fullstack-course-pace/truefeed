<!-- Project Folder Structure for Decoupled FMP -->

# Project Folder Structure for Decoupled FMP

This structure is designed for maximum clarity, separation of concerns, and scalability, aligning with the Git Submodule architecture documented in the README.md.

## 1. Superproject Root (/)

This is the main Git repository that contains references (submodules) to your two independent applications.

```
/
├── frontend/            # Git Submodule: Next.js Client Application
├── backend/             # Git Submodule: Node.js/Express API Server
├── docs/                # FMP Academic and Planning Documentation
│   ├── 01_Research/
│   ├── 02_Design_Documents/
│   └── FMP_Report.pdf   # Final written dissertation/report
├── packages/            # (Optional) Shared resources, e.g., TypeScript types
│   └── types/
├── .git/                # Superproject Git history
├── .gitmodules          # Configuration linking the two submodules
├── README.md            # Project setup and guide (The file you were just viewing)
└── package.json         # Optional: Can be used for shared scripts (e.g., `npm run lint:all`)
```

## 2. Frontend Structure (/frontend)

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

## 3. Backend Structure (/backend)

This structure implements a robust Layered Architecture (Controller-Service-Model), which is essential for maintainability and testing the business logic independently.

```
/backend
├── src/
│   ├── controllers/    # Handle HTTP request/response. Calls services.
│   │   ├── authController.ts
│   │   └── projectsController.ts
│   ├── services/       # Business Logic Layer. Contains core application logic.
│   │   ├── authService.ts
│   │   └── projectsService.ts
│   ├── models/         # Database Schemas and Definitions (Mongoose/Prisma/Sequelize models)
│   │   ├── User.ts
│   │   └── Project.ts
│   ├── routes/         # Define API endpoints and map them to controllers.
│   │   ├── api.ts      # Main route entry point
│   │   └── v1/         # API versioning
│   │       ├── authRoutes.ts
│   │       └── projectRoutes.ts
│   ├── middleware/     # Functions run before controllers (e.g., JWT validation, CORS)
│   ├── config/         # Database connection, logging setup
│   ├── server.ts       # Application entry point, starts the server
│   └── tests/          # Unit and Integration Tests
├── package.json        # Backend dependencies (Express, DB driver, Auth library)
└── .env.local          # PORT, DATABASE_URL, JWT_SECRET
```

---

Notes

- Keep business logic in `services/` so it can be tested independently of HTTP concerns.
- Use `routes/` as thin mappings to controllers; controllers should remain small and delegate to services.
- Place shared TypeScript types or utility libraries in the superproject `packages/` folder if multiple submodules need them.

---

If you'd like, I can also:

- Generate starter README files for `TrueFeed-Frontend` and `TrueFeed-Backend`.
- Initialize a `.gitmodules` example showing how to add the two submodules.
- Expand the frontend and backend file layouts into concrete starter files and minimal working examples.

Let me know which follow-up you'd like next.
