import { throwIfMissing } from './utils.js';

export class Discord {
  constructor() {
    throwIfMissing(process.env, ['DISCORD_APPLICATION_ID', 'DISCORD_TOKEN']);

    this.fetch = (endpoint, options) =>
      fetch(`https://discord.com/api/v9${endpoint}`, {
        ...options,
        method: options.body ? 'POST' : 'GET',
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': options.body ? 'application/json' : undefined,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
  }

  async registerCommand(command) {
    const response = await this.fetch(
      `/applications/${process.env.DISCORD_APPLICATION_ID}/commands`,
      {
        body: command,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to register command: ${response.statusText}`);
    }
  }
}
