export class IntegrityViolationError extends Error {
  constructor() {
    super('Integrity violation error.');
  }
}
