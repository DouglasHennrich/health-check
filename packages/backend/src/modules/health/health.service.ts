import { Injectable } from "@nestjs/common";
import { HealthStatusSchema } from "@shared/src/schemas";

@Injectable()
export class HealthService {
  getStatus() {
    const status = { ok: true, uptime: process.uptime() };
    // validate with shared schema if available at runtime
    try {
      return HealthStatusSchema.parse(status);
    } catch (e) {
      return status;
    }
  }
}
