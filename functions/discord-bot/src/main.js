import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import { throwIfMissing } from './utils.js';

export default async ({ req, res, error, log }) => {
  throwIfMissing(process.env, ['DISCORD_PUBLIC_KEY']);

  if (
    !verifyKey(
      req.bodyRaw,
      req.headers['x-signature-ed25519'],
      req.headers['x-signature-timestamp'],
      process.env.DISCORD_PUBLIC_KEY
    )
  ) {
    error('Invalid request.');
    return res.json({ error: 'Invalid request signature' }, 401);
  }

  log('Received valid webhook request.');

  const { type, data } = req.body;

  if (type === InteractionType.PING) {
    return res.json({ type: InteractionResponseType.PONG }, 200);
  }

  if (type !== InteractionType.APPLICATION_COMMAND) {
    return res.json({ error: 'Invalid interaction type' }, 400);
  }

  switch (data.name) {
    case 'hello':
      return res.json(
        {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Hello, World!',
          },
        },
        200
      );
    case 'schedule':
      const message = data.options[0].value;
      const delay = data.options[1].value;

      await new Promise((resolve) => setTimeout(resolve, delay));

      return res.json(
        {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Scheduled message: ${data.options[0].value}`,
          },
        },
        200
      );

    case 'start':
      const personal = data.options[0]?.value || 'Starting 👋';

      const readableLocation = 'Los Angeles, CA :flag_us:';

      const readableTime = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'America/Los_Angeles',
      });

      const content = `${personal}\n at ${readableTime} from ${readableLocation}.`;

      return res.json(
        {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content,
          },
        },
        200
      );

    case 'daily':
      const dailyMessage = data.options[0]?.value || 'Daily update';

      const dailyContent = `${dailyMessage}\n\n- [ ] Yesterday's progress\n- [ ] Today's plan\n- [ ] Blockers`;

      return res.json(
        {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: dailyContent,
          },
        },
        200
      );

    default:
      return res.json({ error: 'Unknown command' }, 400);
  }
};
