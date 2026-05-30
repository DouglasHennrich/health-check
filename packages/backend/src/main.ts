import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import express from "express";
import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mount BullBoard at /api/v1/admin/queues if bull-board is available
  try {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/api/v1/admin/queues");
    createBullBoard({ queues: [], serverAdapter });
    const expressApp = app.getHttpAdapter().getInstance() as express.Express;
    expressApp.use("/api/v1/admin/queues", serverAdapter.getRouter());
  } catch (e) {
    console.warn(
      "BullBoard not mounted (dev dependency missing or not configured)",
    );
  }

  await app.listen(3000);
  console.log("Backend listening on http://localhost:3000");
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
