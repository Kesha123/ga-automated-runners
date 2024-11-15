export class UnknownJobStatusError extends Error {
  constructor() {
    super('Unknown workflow job status');
  }
}
