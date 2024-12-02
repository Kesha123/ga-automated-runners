export class AWSEnvironmentNotFoundError extends Error {
  constructor() {
    super('AWS environment not found.');
  }
}
