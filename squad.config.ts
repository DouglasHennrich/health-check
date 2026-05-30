import { defineSquad, defineTeam, defineAgent } from "@bradygaster/squad-sdk";

export default defineSquad({
  team: defineTeam({
    name: "health-check",
    members: [
      defineAgent({
        name: "backend-engineer",
        description: "Backend (NestJS, BullMQ, Postgres, Redis, RabbitMQ)",
      }),
      defineAgent({
        name: "frontend-engineer",
        description: "Frontend (React, Vitest, UI contracts)",
      }),
      defineAgent({
        name: "shared-lib-engineer",
        description: "Shared library owner (`@shared`) and DTOs",
      }),
      defineAgent({
        name: "scribe",
        description: "Documentation and history",
      }),
      defineAgent({
        name: "ralph",
        description: "Persistent project memory",
      }),
    ],
  }),
});
