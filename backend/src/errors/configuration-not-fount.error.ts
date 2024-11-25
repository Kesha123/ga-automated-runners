export class ConfigurationNotFoundError extends Error {
  constructor() {
    super('Configuration not found.');
  }
}
