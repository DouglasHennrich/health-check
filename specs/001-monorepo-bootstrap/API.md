# API Reference — Monorepo Bootstrap

> **Versão:** v0.1.0
> **Data:** 2026-05-29
> **Módulo:** `packages/backend/src/modules/`
> **Destinatário:** Time Backend e Frontend

---

## Endpoints

---

### GET `/api/v1/health`

**Descrição:** Status operacional do serviço e verificações infra (Postgres, Redis, RabbitMQ, etc.).

**Auth:** (dev) nenhuma. (prod) Recomenda-se proteger com `Bearer <JWT>` ou IP allowlist.

**Request:**
- Method: `GET`
- Path params: nenhum
- Query params: nenhum

**Response — 200 OK:**

```json
{
  "status": "ok",                // "ok" | "degraded" | "down"
  "uptime": 12345,                // seconds
  "services": {
    "postgres": { "healthy": true },
    "redis": { "healthy": true },
    "rabbitmq": { "healthy": true }
  },
  "timestamp": "2026-05-29T12:00:00.000Z"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `status` | `string` | Sim | Estado geral do serviço |
| `uptime` | `number` | Sim | Tempo de atividade do processo (s) |
| `services` | `object` | Sim | Saúde dos serviços dependentes |
| `timestamp` | `string (ISO)` | Sim | Timestamp UTC da verificação |

**Errors:** `500` para falhas internas na verificação.

**Owner:** backend-engineer

---

### GET `/api/v1/admin/queues`

**Descrição:** UI administrativa (BullBoard) montada para visualizar e operar filas (workers/redis). Retorna a interface HTML do BullBoard e endpoints auxiliares usados pela UI.

**Auth:** `Bearer <JWT>` or internal-only access. MUST be restricted in staging/production.

**Request:**
- Method: `GET`
- Path params: nenhum

**Response — 200 OK (HTML):**
- Content-Type: `text/html`
- Body: BullBoard single-page admin UI

**API surface used by UI (high-level):**
- `GET /api/v1/admin/queues` — HTML UI
- `GET /api/v1/admin/queues/api/queues` — JSON listing queues (used by UI)
- `POST /api/v1/admin/queues/api/queues/:name/retry` — action to retry jobs (used by UI)

**Errors:**
- `401` / `403` when unauthenticated/unauthorized

**Owner:** backend-engineer
**Reviewers:** frontend-engineer

---

## Notas de Integração

- `GET /health` deve ser simples e rápida — retornar apenas checagens superficiais por padrão.
- `GET /admin/queues` é uma UI administrativa; priorizar proteção por autenticação e/ou network ACLs.
- Campos e shape acima são um esboço inicial — confirmar com implementador antes de depender no frontend.

---

## Generated Summary

- Tasks analyzed: see `specs/001-monorepo-bootstrap/tasks.md`
- API-impacting tasks found: `T015` (health module), `T017` (BullBoard admin UI)
- Destination: `specs/001-monorepo-bootstrap/API.md`
- Endpoint sections created: `/api/v1/health`, `/api/v1/admin/queues`
- Owners assigned: `backend-engineer` (both); `frontend-engineer` as reviewer for `/admin/queues`
