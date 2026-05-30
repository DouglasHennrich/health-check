import { QueuesService } from "./modules/queues/queues.service";

async function startWorker() {
  const qs = new QueuesService();
  const worker = qs.createWorker("sample-queue", async (job: any) => {
    console.log("Processing job", job.id, job.data);
    return true;
  });

  worker.on("completed", (job) => console.log("Job completed", job.id));
}

startWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});
