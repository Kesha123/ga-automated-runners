export class WorkflowJobActionUnknownError extends Error {
  constructor() {
    super('Workflow job action is unknown.');
  }
}
