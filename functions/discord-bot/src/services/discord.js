import { verifyKey } from 'discord-interactions';

export class Discord {
  constructor() {
    this.fetch = async (endpoint, options) => {
      const { body, method, headers, ...fetchOptions } = options;

      const response = await fetch(`https://discord.com/api/v10${endpoint}`, {
        method: method || 'POST',
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': body ? 'application/json' : undefined,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...fetchOptions,
      });

      if (!response.ok) {
        let message;
        try {
          message = JSON.stringify(await response.json(), null, 2);
        } catch (error) {
          message = `${response.status} - ${response.statusText}`;
        }
        throw new Error(`Discord API error:\n${message}`);
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

  async editOriginalInteractionResponse(token, data) {
    await this.fetch(
      `/webhooks/${process.env.DISCORD_APPLICATION_ID}/${token}/messages/@original`,
      {
        body: data,
        method: 'PATCH',
      }
    );
  }
}
