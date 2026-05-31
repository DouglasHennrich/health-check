# Feature Specification: Health-Check Monorepo Bootstrap

**Feature Branch**: `002-health-check-monorepo`

**Created**: 2026-05-30

**Status**: Draft

**Input**: User description: "Bootstrap a health-check monorepo with a NestJS backend, Vite React frontend, and shared TypeScript package. The monorepo should include a NestJS backend application that exposes health-check endpoints, a Vite + React frontend application that consumes the backend, a shared TypeScript package for common types/contracts used by both backend and frontend, and standard monorepo tooling (workspace configuration, scripts to run/build/test each package)."

## Executive Summary

Bootstrap a reproducible TypeScript monorepo whose only initial behavior is a working end-to-end health-check loop: a NestJS backend exposes health endpoints, a Vite + React frontend renders the backend's health status, and a shared package supplies the typed contract that binds them together. The deliverable is a workspace that a new developer can install, build, test, and run with a small set of standard scripts, providing a known-good foundation for subsequent features.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Install and run the whole monorepo (Priority: P1)

A developer clones the repository, installs dependencies once at the workspace root, and starts both apps with documented scripts. The frontend, running in a browser, shows the live health status returned by the backend.

**Why this priority**: This is the entire reason for bootstrapping the repo. Without a working install/run loop and a visible end-to-end signal, no further work can begin.

**Independent Test**: On a clean clone, run the documented install command, then the documented dev command. Open the frontend in a browser and observe a health-status indicator showing the backend as healthy.

**Acceptance Scenarios**:

1. **Given** a clean clone and a supported Node + pnpm version, **When** the developer runs the workspace install command, **Then** all packages' dependencies install successfully with no errors.
2. **Given** dependencies are installed, **When** the developer runs the dev script for backend and frontend, **Then** the backend serves its health endpoint and the frontend renders a UI that displays the backend's reported health status within 5 seconds of page load.
3. **Given** the backend is stopped, **When** the frontend polls the health endpoint, **Then** the UI clearly indicates an unhealthy/unreachable backend rather than silently failing.

---

### User Story 2 - Backend exposes typed health-check endpoints (Priority: P1)

A developer or operator can call the backend's health-check endpoints over HTTP and receive a structured response describing the service's status.

**Why this priority**: The backend's health surface is the canonical signal consumed by the frontend, by infrastructure (load balancers, orchestrators), and by humans. It must exist and be stable before anything else is layered on top.

**Independent Test**: Start only the backend. Issue an HTTP GET to each documented health endpoint and verify the responses match the documented JSON shape and status codes.

**Acceptance Scenarios**:

1. **Given** the backend is running, **When** a client sends `GET /health`, **Then** the response is HTTP 200 with a JSON body containing at minimum a `status` field equal to `"ok"` and a timestamp.
2. **Given** the backend is running, **When** a client sends `GET /health/live` (liveness) and `GET /health/ready` (readiness), **Then** each returns HTTP 200 with the documented JSON shape when the service is functioning normally.
3. **Given** a downstream dependency check is configured and failing, **When** a client sends `GET /health/ready`, **Then** the response is HTTP 503 with a JSON body describing which check failed.

---

### User Story 3 - Shared package provides the health contract (Priority: P2)

Backend and frontend both depend on a single shared TypeScript package that defines the health-response types and endpoint paths. Editing the contract in one place updates the types seen by both apps.

**Why this priority**: Without the shared contract, backend and frontend will drift. This story locks in the "single source of truth" pattern that makes the monorepo more valuable than two separate repos.

**Independent Test**: Modify a field in the shared health contract type. Run the workspace type-check script. Both backend and frontend type-check using the updated types without manual rebuilds outside of the documented dev/build flow.

**Acceptance Scenarios**:

1. **Given** the shared package exports a `HealthResponse` type and endpoint path constants, **When** the backend builds its health controller and the frontend builds its health client, **Then** both import from the shared package rather than duplicating the type.
2. **Given** the shared contract is changed in a backward-incompatible way, **When** the workspace type-check runs, **Then** the affected backend and/or frontend code fails type-checking, surfacing the contract break at build time.

---

### User Story 4 - Standard scripts for build, test, and lint across the workspace (Priority: P2)

A developer can run a single workspace-level command to install, build, test, lint, or type-check every package, and can also target an individual package.

**Why this priority**: Consistent scripts are the contract between humans, CI, and editors. They need to exist from day one so later automation (CI, hooks, agents) has stable entry points.

**Independent Test**: From the workspace root, run each documented script (install, build, test, lint, type-check, dev) and confirm it completes with the expected exit code on a clean clone. Then run the same scripts scoped to a single package and confirm only that package is affected.

**Acceptance Scenarios**:

1. **Given** a clean clone, **When** the developer runs the workspace build script, **Then** the shared package builds first and the backend and frontend builds succeed using the shared package's output.
2. **Given** a clean clone, **When** the developer runs the workspace test script, **Then** each package's tests execute and the overall command exits non-zero if any package's tests fail.
3. **Given** the developer wants to work on only the frontend, **When** they run the package-scoped dev script for the frontend, **Then** only the frontend dev server starts (with the shared package available to it).

---

### Edge Cases

- Backend is reachable but reports `status !== "ok"` (e.g., a dependency check is failing): the frontend MUST surface a distinct "degraded/unhealthy" state, not a generic error.
- Backend is unreachable (network error, not started, wrong port): the frontend MUST surface an "unreachable" state and not crash.
- Shared package has not been built yet on a fresh clone: the workspace build/dev scripts MUST handle build ordering so that backend and frontend never consume a stale or missing shared build.
- A developer runs `install` from inside a single package directory instead of the workspace root: behavior MUST be documented (either supported or rejected with a clear message), so the developer is never silently in a broken state.
- The same dependency is declared at different versions in multiple packages: the workspace tooling MUST either de-duplicate or surface a warning rather than silently producing two copies.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The repository MUST be organized as a single TypeScript monorepo with a workspace manifest at the root and three packages: a NestJS backend application, a Vite + React frontend application, and a shared TypeScript library.
- **FR-002**: The backend MUST expose at minimum a general health endpoint (`GET /health`) and SHOULD additionally expose liveness (`GET /health/live`) and readiness (`GET /health/ready`) endpoints, each returning a JSON body conforming to the shared contract.
- **FR-003**: The health response payload MUST include, at minimum, a `status` field (with documented allowed values such as `"ok"` and `"error"`) and a timestamp; the exact shape MUST be defined in the shared package and reused by both backend and frontend.
- **FR-004**: The frontend MUST, on initial render, fetch the backend health endpoint and display the resulting status to the user, including distinct visual states for healthy, degraded, and unreachable.
- **FR-005**: The shared package MUST export TypeScript types and endpoint path constants for the health contract, and both backend and frontend MUST import these from the shared package rather than redefining them locally.
- **FR-006**: The workspace MUST provide documented root-level scripts to install, build, test, lint, type-check, and run all packages, and equivalents that target a single package by name.
- **FR-007**: The workspace build MUST guarantee that the shared package is built (or made consumable) before the backend or frontend builds run, so that consumers never compile against a missing or stale shared artifact.
- **FR-008**: Each package MUST have at least one passing automated test out of the box: the shared package tests its exported contract, the backend tests its health endpoint(s), and the frontend tests that it renders the health status component without error.
- **FR-009**: The frontend MUST be configured to talk to the backend at a base URL that is configurable per environment (e.g., via an environment variable consumed at build/dev time), with a sensible default for local development.
- **FR-010**: The repository root MUST include documentation (e.g., `README.md`) describing prerequisites, install steps, how to run each package, how to run tests, and the URL where each app is served in local development.
- **FR-011**: TypeScript configuration MUST be shared via a base `tsconfig` at the workspace root, with each package extending it, so type-checking rules are consistent across packages.
- **FR-012**: The frontend MUST handle backend-unreachable scenarios without uncaught errors or a blank screen; it MUST render a user-visible state describing the problem.

### Key Entities

- **Workspace**: The root of the monorepo. Owns the package manifest, shared TypeScript configuration, root-level scripts, and the list of member packages.
- **Backend package**: A NestJS application providing the health-check HTTP surface. Depends on the shared package for the response contract.
- **Frontend package**: A Vite + React single-page application that renders the backend's health status. Depends on the shared package for the response contract and endpoint paths.
- **Shared package**: A TypeScript library that defines the health contract (response types, status enums, endpoint paths) consumed by both backend and frontend. Has no runtime framework dependency.
- **Health response**: The data structure returned by the backend's health endpoints. Defined once in the shared package; attributes include at minimum a status value and a timestamp, and optionally per-dependency check results.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new developer, following only the repository README on a clean clone, can reach a browser tab showing the backend's health status in under 10 minutes (excluding language-runtime and package-manager install time).
- **SC-002**: From a clean clone, running the workspace install script followed by the workspace build script completes successfully with no manual intervention.
- **SC-003**: From a clean clone, running the workspace test script executes tests in every package and exits with success when no test fails; coverage of at least one meaningful test per package is in place.
- **SC-004**: Calling the backend's main health endpoint returns a 2xx response with the documented JSON shape in 100% of attempts when the backend is running with no failing dependency checks.
- **SC-005**: Changing a field name in the shared health contract causes the workspace type-check command to fail in any package that references the renamed field, with the failure pointing at the consuming file.
- **SC-006**: Stopping the backend while the frontend is loaded causes the frontend to display an "unreachable" state within 5 seconds, with no uncaught exceptions in the browser console.

## Assumptions

- Developers have a supported Node.js LTS version and `pnpm` installed locally; the workspace uses pnpm workspaces (consistent with the existing `pnpm-workspace.yaml` at the repo root).
- The backend and frontend run on different local ports during development; CORS or a dev proxy is configured so the frontend can reach the backend without manual workarounds.
- The shared package is consumed via the workspace protocol (source or built output linked through the workspace), not published to an external registry.
- This feature explicitly does **not** include authentication, persistence, queues, real downstream dependency probes, deployment manifests, or CI pipeline configuration — those are deferred to follow-up features. Readiness checks against real dependencies can be stubbed initially.
- The frontend's health UI is intentionally minimal (a status indicator and a human-readable message); richer dashboards are out of scope.
- "Health-check endpoint" semantics follow the conventional liveness/readiness split used by typical container orchestration, but no specific orchestrator is assumed.
