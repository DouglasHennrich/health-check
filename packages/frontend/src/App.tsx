import React from "react";
import { HealthStatus } from "@shared";

export default function App() {
  const status: HealthStatus = { ok: true, uptime: 0 };
  return (
    <div>
      <h1>Frontend</h1>
      <pre>{JSON.stringify(status)}</pre>
    </div>
  );
}
