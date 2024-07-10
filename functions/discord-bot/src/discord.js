import { verifyKey } from 'discord-interactions';
import { throwIfMissing } from './utils.js';

export class Discord {
  constructor() {
    throwIfMissing(process.env, [
      'DISCORD_APPLICATION_ID',
      'DISCORD_TOKEN',
      'DISCORD_PUBLIC_KEY',
    ]);

    this.fetch = async (endpoint, options) => {
      const { body, method, headers, ...fetchOptions } = options;

      const response = await fetch(`https://discord.com/api/v10${endpoint}`, {
        method: method || 'POST',
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': headers?.['Content-Type'] || 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
        ...fetchOptions,
      });

      if (!response.ok) {
        throw new Error(
          `Discord API error:\n${response.status} - ${response.statusText}`
        );
      }
    };
  }

  verifyRequest(req) {
    if (
      !verifyKey(
        req.bodyRaw,
        req.headers['x-signature-ed25519'],
        req.headers['x-signature-timestamp'],
        process.env.DISCORD_PUBLIC_KEY
      )
    ) {
      return false;
    }

    return true;
  }

  async registerCommand(command) {
    await this.fetch(
      `/applications/${process.env.DISCORD_APPLICATION_ID}/commands`,
      {
        body: command,
      }
    );
  }

  async createInteractionResponse(interactionId, token, response) {
    await this.fetch(
      `/interactions/${interactionId}/${token}/callback`,
      response
    );
  }
}
