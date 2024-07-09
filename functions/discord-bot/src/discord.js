import { throwIfMissing } from './utils.js';

export class Discord {
  constructor() {
    throwIfMissing(process.env, ['DISCORD_APPLICATION_ID', 'DISCORD_TOKEN']);

    this.fetch = async (endpoint, options) => {
      const response = await fetch(`https://discord.com/api/v9${endpoint}`, {
        ...options,
        method: options.body ? 'POST' : 'GET',
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': options.body ? 'application/json' : undefined,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        try {
          const data = await response.json();
          throw new Error(
            `Discord API error:\n${JSON.stringify(data, null, 2)}`
          );
        } catch (e) {
          try {
            const text = await response.text();
            throw new Error(`Discord API error:\n${text}`);
          } catch (e) {
            throw new Error(
              `Discord API error:\n$${response.status} - ${response.statusText}`
            );
          }
        }
      }
    };
  }

  async registerCommand(command) {
    await this.fetch(
      `/applications/${process.env.DISCORD_APPLICATION_ID}/commands`,
      {
        body: command,
      }
    );
  }
}
