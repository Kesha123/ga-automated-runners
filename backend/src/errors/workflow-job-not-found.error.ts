export class WorkflowJobNotFoundError extends Error {
  constructor() {
    super('Workflow job not found.');
  }
}
