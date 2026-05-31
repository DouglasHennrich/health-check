import { Injectable } from "@nestjs/common";
import { Queue, Worker } from "bullmq";

@Injectable()
export class QueuesService {
  createQueue(name: string) {
    return new Queue(name, { connection: { host: "localhost", port: 6379 } });
  }

  createWorker(name: string, processor: any) {
    return new Worker(name, processor, {
      connection: { host: "localhost", port: 6379 },
    });
  }
}
