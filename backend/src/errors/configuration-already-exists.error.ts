export class ConfigurationAlreadyExistsError extends Error {
  constructor() {
    super('Configuration already exists.');
  }
}
