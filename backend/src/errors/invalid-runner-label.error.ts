export class InvalidRunnerlabels extends Error {
  constructor() {
    super('No allowed labels found for the runner.');
  }
}
