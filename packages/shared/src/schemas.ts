import { z } from "zod";

export const HealthStatusSchema = z.object({
  ok: z.boolean(),
  uptime: z.number(),
});

export type HealthStatus = z.infer<typeof HealthStatusSchema>;
