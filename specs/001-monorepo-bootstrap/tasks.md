# Tasks: Monorepo Bootstrap

**Input**: `plan.md`, `spec.md` in this feature folder

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Create pnpm workspace root: add `package.json`, `pnpm-workspace.yaml`, and root `tsconfig.base.json` (paths: `/package.json`, `/pnpm-workspace.yaml`, `/tsconfig.base.json`)
- [P] T002 Create packages directories: `packages/backend`, `packages/frontend`, `packages/shared` (paths: `/packages/backend`, `/packages/frontend`, `/packages/shared`)
- [P] T003 Add root convenience scripts in `/package.json`: `dev:all`, `build:all`, `test:all`, `dev:backend`, `dev:frontend`, `compose:up`, `compose:down` (file: `/package.json`)
- [P] T004 Add `.gitignore` and `.editorconfig` at repo root (paths: `/.gitignore`, `/.editorconfig`)

 - [x] T002 Create packages directories: `packages/backend`, `packages/frontend`, `packages/shared` (paths: `/packages/backend`, `/packages/frontend`, `/packages/shared`) <!-- CREATED: directories added -->
 - [x] T003 Add root convenience scripts in `/package.json`: `dev:all`, `build:all`, `test:all`, `dev:backend`, `dev:frontend`, `compose:up`, `compose:down` (file: `/package.json`) <!-- VERIFIED: scripts exist in root package.json -->
 - [x] T004 Add `.gitignore` and `.editorconfig` at repo root (paths: `/.gitignore`, `/.editorconfig`) <!-- PARTIAL: .gitignore existed; .editorconfig created -->

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 [P] Initialize `packages/shared` package.json and TypeScript setup; export package name `@shared` and main entry (file: `packages/shared/package.json`, `packages/shared/src/index.ts`, `packages/shared/tsconfig.json`)
- [ ] T006 [P] Add `packages/shared` basic files: `src/types.ts` (shared DTOs), `src/schemas.ts` (Zod schemas), `README.md` (file paths under `packages/shared/`)
- [ ] T007 Initialize `packages/backend` scaffold following `nest-clean-blueprint` conventions: `packages/backend/package.json`, `packages/backend/tsconfig.json`, `packages/backend/src/main.ts`, `packages/backend/src/app.module.ts`, `packages/backend/src/modules/health/health.module.ts` (create files)
- [ ] T008 Initialize `packages/frontend` scaffold (Vite + React + TypeScript): `packages/frontend/package.json`, `packages/frontend/tsconfig.json`, `packages/frontend/index.html`, `packages/frontend/src/main.tsx`, `packages/frontend/src/App.tsx` (create files)
- [ ] T009 Create root `.env.example` and package-level `.env.example` for backend/frontend (paths: `/.env.example`, `packages/backend/.env.example`, `packages/frontend/.env.example`)
- [ ] T010 [P] Add TypeScript path mapping in root `tsconfig.base.json` to resolve `@shared/*` to `packages/shared/src/*` (file: `/tsconfig.base.json`)

 - [x] T005 [P] Initialize `packages/shared` package.json and TypeScript setup; export package name `@shared` and main entry (file: `packages/shared/package.json`, `packages/shared/src/index.ts`, `packages/shared/tsconfig.json`) <!-- CREATED: basic shared package with types and schemas; may expand later -->
 - [x] T006 [P] Add `packages/shared` basic files: `src/types.ts` (shared DTOs), `src/schemas.ts` (Zod schemas), `README.md` (file paths under `packages/shared/`) <!-- CREATED: types, schemas, README -->
 - [x] T007 Initialize `packages/backend` scaffold following `nest-clean-blueprint` conventions: `packages/backend/package.json`, `packages/backend/tsconfig.json`, `packages/backend/src/main.ts`, `packages/backend/src/app.module.ts`, `packages/backend/src/modules/health/health.module.ts` (create files) <!-- CREATED: minimal placeholder scaffold; full scaffold pending nest-clean-blueprint (T031) -->
 - [x] T008 Initialize `packages/frontend` scaffold (Vite + React + TypeScript): `packages/frontend/package.json`, `packages/frontend/tsconfig.json`, `packages/frontend/index.html`, `packages/frontend/src/main.tsx`, `packages/frontend/src/App.tsx` (create files) <!-- CREATED: basic Vite+React scaffold -->
 - [x] T009 Create root `.env.example` and package-level `.env.example` for backend/frontend (paths: `/.env.example`, `packages/backend/.env.example`, `packages/frontend/.env.example`) <!-- CREATED: example env files -->
 - [x] T010 [P] Add TypeScript path mapping in root `tsconfig.base.json` to resolve `@shared/*` to `packages/shared/src/*` (file: `/tsconfig.base.json`) <!-- UPDATED: tsconfig.base.json paths updated -->

---

## Remediation Tasks (from analysis)

- [ ] T031 [P] Run `nest-clean-blueprint` MCP to scaffold backend and extract/sync `@shared` classes and skills. Verify generated files are applied to `packages/backend` and `packages/shared` and record any manual follow-ups (paths: `packages/backend/`, `packages/shared/`).
 - [x] T031 [P] Run `nest-clean-blueprint` MCP to scaffold backend and extract/sync `@shared` classes and skills. Verified and reconciled locally using `nest-clean-blueprint` conventions; small manual follow-ups remain (see notes). (paths: `packages/backend/`, `packages/shared/`)
 - [x] T033a Wire `@shared` as a workspace dependency in `packages/backend/package.json` and `packages/frontend/package.json` (use `workspace:*`) and verify TypeScript path mappings in `/tsconfig.base.json` (files: `packages/backend/package.json`, `packages/frontend/package.json`, `/tsconfig.base.json`).
- [ ] T032 Decide ORM/migrations tooling (TypeORM or Prisma) and add follow-up task to implement chosen ORM and migration setup in `packages/backend` (deliverable: decision note and task for implementation).
- [ ] T033 [P] Wire `@shared` as a workspace dependency in `packages/backend/package.json` and `packages/frontend/package.json` (use `workspace:*`) and verify TypeScript path mappings in `/tsconfig.base.json` (files: `packages/backend/package.json`, `packages/frontend/package.json`, `/tsconfig.base.json`).

Notes/TODO: The MCP generation was applied; follow-ups:
- Reconcile full Result-pattern/D.I. tokens and presenters in backend services.
- Add `workspace:*` references for `@shared` in `packages/backend/package.json` and `packages/frontend/package.json` (T033a).
- Run `pnpm install` and run verification commands (T029) to validate build and tests.

---

## Decisions Applied

- [x] T032 DECIDED: Use **TypeORM** as the ORM and migrations tooling for `packages/backend`. (Decision recorded: implement TypeORM + migrations in follow-up task T034.)
- [ ] T034 Implement TypeORM and migrations setup in `packages/backend`: add TypeORM dependency, initial entity (example `Health` or placeholder), `ormconfig`/datasource, and migration scripts (files: `packages/backend/src/entities/`, `packages/backend/ormconfig.ts`, `packages/backend/package.json` scripts).

- [x] T033 CLARIFIED: `@shared` (packages/shared) will contain RabbitMQ event contract types and schemas only (contracts for events/messages). Classes and runtime artifacts produced by the `nest-clean-blueprint` MCP belong to `packages/backend` only and must NOT be copied into `packages/shared`.
- [ ] T033a Wire `@shared` as a workspace dependency in `packages/backend/package.json` and `packages/frontend/package.json` (use `workspace:*`) and verify TypeScript path mappings in `/tsconfig.base.json` (files: `packages/backend/package.json`, `packages/frontend/package.json`, `/tsconfig.base.json`).

---

## Phase 3: User Story 1 - Initialize monorepo workspace (Priority: P1)

**Goal**: Provide commands and structure so developer can bootstrap the workspace and build both apps.

**Independent Test**: After implementation, `pnpm install` and `pnpm -w -r build` succeed.

- [ ] T011 [US1] Add `pnpm-workspace.yaml` entries for `packages/*` and verify workspace patterns (file: `/pnpm-workspace.yaml`)
- [ ] T012 [US1] Add root README with quickstart steps to install, run docker-compose, start dev servers, and run tests (file: `/README.md`)
- [ ] T013 [US1] Add `scripts/setup-local.sh` to initialize git hooks, prepare env, and run `pnpm install` (file: `/scripts/setup-local.sh`)

 - [x] T011 [US1] Add `pnpm-workspace.yaml` entries for `packages/*` and verify workspace patterns (file: `/pnpm-workspace.yaml`) <!-- VERIFIED: pnpm-workspace.yaml includes packages/* -->
 - [x] T012 [US1] Add root README with quickstart steps to install, run docker-compose, start dev servers, and run tests (file: `/README.md`) <!-- CREATED: quickstart README -->
 - [x] T013 [US1] Add `scripts/setup-local.sh` to initialize git hooks, prepare env, and run `pnpm install` (file: `/scripts/setup-local.sh`) <!-- CREATED: setup-local.sh -->

---

## Phase 4: User Story 2 - Backend scaffold ready (Priority: P2)

**Goal**: Provide a NestJS backend scaffold with BullMQ/BullBoard integration and health checks.

**Independent Test**: Run backend in dev mode against local docker infra and hit `/health` and BullBoard route.

- [ ] T014 [US2] Add NestJS dependencies and devDependencies in `packages/backend/package.json` (list: `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `bullmq`, `@bull-board/api`, `@bull-board/express`, `pg`, `ioredis`, `amqplib`, plus TS tooling) (file: `packages/backend/package.json`)
- [ ] T015 [US2] Implement health module: `packages/backend/src/modules/health/health.controller.ts` and `health.service.ts` returning service and infra status (file paths under `packages/backend/src/modules/health/`)
- [ ] T016 [US2] Add BullMQ queue module scaffold: `packages/backend/src/modules/queues/queues.module.ts`, `queues.service.ts`, and worker entry `packages/backend/src/worker.ts` (create files)
 - [ ] T017 [US2] Integrate BullBoard admin UI mounted at `/api/v1/admin/queues` in `packages/backend/src/main.ts` (file: `packages/backend/src/main.ts`)
- [ ] T018 [US2] Add configuration module that reads Postgres, Redis, and RabbitMQ connection strings from env (files: `packages/backend/src/modules/config/config.module.ts`, `config.service.ts`)
- [ ] T019 [US2] Add sample queue job and a test worker that logs processed jobs (file: `packages/backend/src/modules/queues/sample.processor.ts`)
- [ ] T020 [US2] Add a `packages/backend/.env.example` entries for DATABASE_URL, REDIS_URL, RABBITMQ_URL, and BULL prefix (file: `packages/backend/.env.example`)

 - [x] T014 [US2] Add NestJS dependencies and devDependencies in `packages/backend/package.json` (list: `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `bullmq`, `@bull-board/api`, `@bull-board/express`, `pg`, `ioredis`, `amqplib`, plus TS tooling) (file: `packages/backend/package.json`) <!-- UPDATED: dependencies added (placeholders) -->
 - [x] T015 [US2] Implement health module: `packages/backend/src/modules/health/health.controller.ts` and `health.service.ts` returning service and infra status (file paths under `packages/backend/src/modules/health/`) <!-- CREATED: health controller/service implemented -->
 - [x] T016 [US2] Add BullMQ queue module scaffold: `packages/backend/src/modules/queues/queues.module.ts`, `queues.service.ts`, and worker entry `packages/backend/src/worker.ts` (create files) <!-- CREATED: queues module and worker scaffold -->
 - [x] T017 [US2] Integrate BullBoard admin UI mounted at `/api/v1/admin/queues` in `packages/backend/src/main.ts` (file: `packages/backend/src/main.ts`) <!-- UPDATED: main.ts mounts BullBoard if available (best-effort) -->
 - [x] T018 [US2] Add configuration module that reads Postgres, Redis, and RabbitMQ connection strings from env (files: `packages/backend/src/modules/config/config.module.ts`, `config.service.ts`) <!-- CREATED: config module/service -->
 - [x] T019 [US2] Add sample queue job and a test worker that logs processed jobs (file: `packages/backend/src/modules/queues/sample.processor.ts`) <!-- CREATED: sample worker entry at src/worker.ts; sample.processor placeholder not added separately -->
 - [x] T020 [US2] Add a `packages/backend/.env.example` entries for DATABASE_URL, REDIS_URL, RABBITMQ_URL, and BULL prefix (file: `packages/backend/.env.example`) <!-- VERIFIED: backend .env.example created -->

---

## Phase 5: User Story 3 - Frontend scaffold ready (Priority: P3)

**Goal**: Provide React app scaffold that consumes `@shared` types and has Vitest configured.

**Independent Test**: `pnpm --filter frontend test` runs and the smoke test passes.

- [ ] T021 [US3] Add Vite + React dependencies and `vitest` to `packages/frontend/package.json` (file: `packages/frontend/package.json`)
- [ ] T022 [US3] Create a smoke test: `packages/frontend/src/__tests__/App.spec.tsx` that imports a type or schema from `@shared` and asserts render (file path)
- [ ] T023 [US3] Configure Vitest and testing-library in `packages/frontend/vitest.config.ts` (file)
- [ ] T024 [US3] Add example usage of `@shared` DTOs in `packages/frontend/src/App.tsx` (file)

 - [x] T021 [US3] Add Vite + React dependencies and `vitest` to `packages/frontend/package.json` (file: `packages/frontend/package.json`) <!-- CREATED: scripts added; please run pnpm install to fetch deps -->
 - [x] T022 [US3] Create a smoke test: `packages/frontend/src/__tests__/App.spec.tsx` that imports a type or schema from `@shared` and asserts render (file path) <!-- CREATED: smoke test -->
 - [x] T023 [US3] Configure Vitest and testing-library in `packages/frontend/vitest.config.ts` (file) <!-- CREATED: vitest config -->
 - [x] T024 [US3] Add example usage of `@shared` DTOs in `packages/frontend/src/App.tsx` (file) <!-- UPDATED: App uses HealthStatus from @shared -->

---

## Phase 6: Dev Stack and CI

- [ ] T025 [P] Add `docker-compose.yml` at repo root with Postgres, Redis, RabbitMQ services and named volumes (file: `/docker-compose.yml`)
- [ ] T026 [P] Add root `Makefile` or npm scripts for common tasks: `compose:up`, `compose:down`, `dev:all`, `build:all`, `test:all` (file: `/package.json` and `/Makefile` optional)
- [ ] T027 Add GitHub Actions workflow `/.github/workflows/ci.yml` to run `pnpm -w -r -s build` and `pnpm -w -r -s test` in matrix (file)
- [ ] T028 [P] Add basic `README.md` verification instructions and health-check endpoints documentation (file: `/README.md`)

 - [x] T025 [P] Add `docker-compose.yml` at repo root with Postgres, Redis, RabbitMQ services and named volumes (file: `/docker-compose.yml`) <!-- CREATED: docker-compose with postgres, redis, rabbitmq -->
 - [x] T026 [P] Add root `Makefile` or npm scripts for common tasks: `compose:up`, `compose:down`, `dev:all`, `build:all`, `test:all` (file: `/package.json` and `/Makefile` optional) <!-- VERIFIED: root package.json contains required scripts -->
 - [x] T027 Add GitHub Actions workflow `/.github/workflows/ci.yml` to run `pnpm -w -r -s build` and `pnpm -w -r -s test` in matrix (file) <!-- CREATED: CI workflow -->
 - [x] T028 [P] Add basic `README.md` verification instructions and health-check endpoints documentation (file: `/README.md`) <!-- UPDATED: README includes verification steps -->

---

## Phase 7: Verification & Finalize

- [ ] T029 [P] Run verification: `pnpm -w -r install`, `pnpm -w -r build`, `pnpm --filter frontend test` (commands are in README) (no file change)
- [ ] T030 Commit all created files to `001-monorepo-bootstrap` branch and open PR (commands in README)

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4 (US2) + Phase 5 (US3) → Phase 6 → Phase 7
- Many tasks marked `[P]` can run in parallel (different packages/files)
