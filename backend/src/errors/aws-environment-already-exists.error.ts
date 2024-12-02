export class AWSEnvironmentAlreadyExistsError extends Error {
  constructor() {
    super('AWS environment already exists.');
  }
}
