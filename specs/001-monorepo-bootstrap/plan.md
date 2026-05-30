# Implementation Plan: Monorepo Bootstrap

## Overview

Create a pnpm monorepo with three packages: `backend`, `frontend`, and `shared`.

Tech stack:
- Workspace: pnpm workspaces
- Backend: NestJS (TypeScript), BullMQ workers, BullBoard admin
- Data/infra: Postgres, Redis (cache + BullMQ), RabbitMQ (messages)
- Frontend: React (Vite), TypeScript, Vitest
- Shared: `@shared` package with DTOs, Zod schemas, and types

Repository layout:

```
/packages
  /backend
  /frontend
  /shared
package.json (workspace)
pnpm-workspace.yaml
docker-compose.yml
/.specify
```

## Implementation Steps (High level)

1. Initialize pnpm workspace and root scripts.
2. Create `packages/shared` with package.json, tsconfig, and exports for `@shared`.
3. Scaffold `packages/backend` using nest-clean-blueprint conventions: modules, config, health route, worker entrypoint.
4. Add BullMQ + BullBoard integration and sample worker queue.
5. Add database/infra env and TypeORM/Prisma placeholder (team choice) configs.
6. Scaffold `packages/frontend` with Vite + React and Vitest, and example usage of `@shared` types.
7. Add `docker-compose.yml` for Postgres, Redis, RabbitMQ, and convenience scripts in root `package.json`.
8. Add CI scripts (build/test) and README instructions.

## Conventions

- Follow `nest-clean-blueprint` module structure and DI token patterns for backend.
- Keep `@shared` strictly for types/schemas/helpers; avoid runtime coupling where possible.
- Use environment files `.env.example` at package roots.

## Deliverables

- Working pnpm workspace with three packages.
- Backend scaffold with health route and BullBoard mounted.
- Frontend scaffold with Vitest smoke test.
- `docker-compose.yml` for local dev stack.
- README with setup and verification steps.
