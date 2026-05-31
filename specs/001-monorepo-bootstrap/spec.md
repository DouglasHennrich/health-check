# Feature Specification: Monorepo Bootstrap

**Feature Branch**: `001-monorepo-bootstrap`

**Created**: 2026-05-29

**Status**: Draft

**Input**: User description: "precisamos criar um monorepo que irá ter backend e frontend. Utilize o MCP nest-clean-blueprint para buscar as skills e classes do `@shared`. O Backend utilizará NestJS, BullMQ + BullBoard, Postgres, Redis + RabbitMQ. O frontend será em React com vitest. Crie o bootstrap desse monorepo seguindo os padrões estabelecidos pelo `nest-clean-blueprint`"

## Executive Summary

Este projeto cria um monorepo para um analisador de exames médicos com histórico de exames e comparação de valores entre exames. O resultado esperado é um workspace reproduzível que permita equipes backend e frontend iniciarem desenvolvimento rapidamente. Decisões de implementação (frameworks e ferramentas) estão incluídas nesta especificação e serão seguidas conforme descrito.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Initialize monorepo workspace (Priority: P1)

Desenvolvedor precisa clonar o repositório e inicializar um monorepo pronto para desenvolver backend e frontend.

**Why this priority**: entrega imediata de valor — permite começar a implementar features.

**Independent Test**: Executar `pnpm install` e `pnpm -w -r build` / iniciar dev servers conforme instruções do README.

**Acceptance Scenarios**:

1. **Given** repo clonado, **When** dev roda `pnpm install`, **Then** todas as dependências são instaladas sem erros.
2. **Given** monorepo instalado, **When** dev roda `pnpm -w -r build`, **Then** `packages/backend` e `packages/frontend` compilam com sucesso.

---

### User Story 2 - Backend scaffold ready (Priority: P2)

Equipe backend precisa de um scaffold NestJS com integração básica com BullMQ, BullBoard, Postgres, Redis e RabbitMQ, seguindo padrões do `nest-clean-blueprint` registrado no projeto.

**Independent Test**: Iniciar ambiente de desenvolvimento definido e iniciar `packages/backend` em modo dev; endpoints básicos retornam 200 quando chamados com credenciais apropriadas.

**Acceptance Scenarios**:

1. **Given** infra de dependências disponível e variáveis de ambiente definidas, **When** backend é iniciado, **Then** a rota `GET /api/v1/health` retorna 200 com o contrato JSON esperado.
2. **Given** credenciais válidas (configuradas via env), **When** cliente acessa `GET /api/v1/admin/queues`, **Then** BullBoard responde `200` (autenticado) e a UI mínima é servida.

---

### User Story 3 - Frontend scaffold ready (Priority: P3)

Equipe frontend precisa de um app React criado com testes unitários usando Vitest. A arquitetura detalhada do frontend será pesquisada e aplicada seguindo boas práticas de mercado.

**Independent Test**: Executar `pnpm --filter frontend test` e receber testes passando; `pnpm --filter frontend dev` inicia o app.

**Acceptance Scenarios**:

1. **Given** monorepo instalado, **When** dev roda `pnpm --filter frontend test`, **Then** suíte de testes inicia e o teste de smoke (renderizar `App` sem erro) passa.

---

### Edge Cases

- Falha na conexão com serviços externos (Postgres/Redis/RabbitMQ) deve resultar em mensagens de erro claras e fallback de health-check.

## Requirements *(mandatory)*

### Functional Requirements

**FR-001**: Repositório MUST fornecer um workspace pnpm com ao menos `packages/backend` e `packages/frontend`.
**FR-002**: `packages/backend` MUST incluir scaffold NestJS com rota health, integração com BullMQ e painel BullBoard.
**FR-003**: `packages/backend` MUST include connection configs for Postgres, Redis and RabbitMQ and health checks.
**FR-004**: `packages/frontend` MUST include a React app scaffold and a Vitest config with a smoke test (smoke test: renderizar `App` sem erro).
**FR-005**: CI-local README scripts MUST document como rodar a stack localmente (docker-compose/devcontainer) — nota: docker-compose pode ser adiado para fase seguinte, scripts devem mencionar status "adiado" quando aplicável.

### Key Entities

### Key Entities

- **Monorepo workspace**: container for packages and shared libs.
- **Backend app**: NestJS application exposing health and admin routes and worker processes.
- **Frontend app**: React SPA with basic routes and test harness.

## Success Criteria *(mandatory)*

### Measurable Outcomes

### Measurable Outcomes

- **SC-001**: `pnpm install` completes successfully on a clean clone in under 2 minutes (local dev machine with network).
- **SC-002**: `pnpm -w -r build` completes without errors; both `backend` and `frontend` build artifacts are produced.
- **SC-003**: Backend health endpoint `/api/v1/health` retorna 200 e JSON com o contrato esperado.
- **SC-004**: Frontend test suite executa e o smoke test (renderizar `App`) passa.

### Environment Defaults

- Postgres: `POSTGRES_HOST=postgres`, `POSTGRES_PORT=5432`
- Redis: `REDIS_HOST=redis`, `REDIS_PORT=6379`
- RabbitMQ: `RABBITMQ_HOST=rabbitmq`, `RABBITMQ_PORT=5672`
- BullBoard auth: `BULLBOARD_USER` and `BULLBOARD_PASSWORD` (express-basic-auth)

## Assumptions

## Assumptions

- Node 18+ / pnpm available in developer environment.
- Local development will use docker-compose to run Postgres, Redis, RabbitMQ for dev testing (docker-compose may be added in a later phase).
- Use the `nest-clean-blueprint` MCP already registered in the project for backend scaffolding and provided classes/conventions.
