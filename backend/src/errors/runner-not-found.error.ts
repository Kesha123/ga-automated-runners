export class RunnerNotFoundError extends Error {
  constructor() {
    super('Runner not found.');
  }
}
