/**
 * Chaos — a high-contrast dark theme.
 * JSDoc, 주석, 태그가 어떻게 보이는지 확인하는 데모 파일.
 * @author DOOYEE
 */

import { readFile } from "node:fs/promises";
import type { Server } from "node:http";

// 상수 — semanticTokenColors 의 variable.constant (#ffa067)
const MAX_RETRIES = 3;
const ENDPOINT = "https://api.example.com/v1/chaos";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

// enum — enumMember 는 시안 (#3de9ff)
enum Status {
  Idle = "idle",
  Running = "running",
  Failed = "failed",
}

interface Task<T = unknown> {
  readonly id: number;
  label: string;
  status: Status;
  payload?: T;
  retries: number;
}

type Handler = (task: Task) => Promise<void> | void;

/** 지수 백오프로 재시도한다. */
export async function withRetry<T>(
  fn: () => Promise<T>,
  attempts: number = MAX_RETRIES,
): Promise<T> {
  let lastError: unknown = null;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      // Math, console 은 defaultLibrary (#ffca67)
      const backoff = Math.min(2 ** i * 100, 5_000);
      console.warn(`attempt ${i + 1}/${attempts} failed, waiting ${backoff}ms`);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }

  throw lastError;
}

export class TaskQueue {
  #tasks = new Map<number, Task>();
  private handlers: Handler[] = [];

  get size(): number {
    return this.#tasks.size;
  }

  add(task: Task): this {
    if (!SLUG_PATTERN.test(task.label)) {
      throw new Error(`invalid label: ${task.label}`);
    }
    this.#tasks.set(task.id, { ...task, status: Status.Idle });
    return this;
  }

  async drain(): Promise<void> {
    for (const [id, task] of this.#tasks) {
      await withRetry(async () => {
        for (const handle of this.handlers) await handle(task);
      });
      this.#tasks.delete(id);
    }
  }
}

// ↓ 의도적인 타입 에러 — 빨간 물결선(#ff2b00)과 Problems 패널 확인용
const broken: Task = { id: "not-a-number", label: 42, status: "nope" };

const config = {
  theme: "chaos",
  contrast: true,
  opacity: 0.98,
  tabs: null,
  palette: ["#ffef00", "#00daff", "#ffa067", "#928eff"],
} as const;

export { config, Status, TaskQueue as Queue };
