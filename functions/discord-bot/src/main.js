import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import { generateDailyUpdate } from './openai.js';
import { Discord } from './discord.js';
import { Appwrite } from './appwrite.js';
import { ExecutionMethod } from 'node-appwrite';

export default async ({ req, res }) => {
  const discord = new Discord();

  if (req.path === '/daily') {
    const dailyUpdate = await generateDailyUpdate(req.body.update);
    await discord.editOriginalInteractionResponse(req.body.token, {
      content: dailyUpdate,
    });
    return res.json({ success: true }, 200);
  }

  if (!discord.verifyRequest(req)) {
    return res.json({ error: 'Invalid request signature' }, 401);
  }

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
      const alias = data.member.nick || data.member.user.username;

      const personal = data.options ? data.options[0]?.value : 'Starting 👋';

      const location = 'Cambridge, UK :flag_gb:';

      const time = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Europe/London',
      });

      const content = [
        `**${alias}**: ${personal}`,
        `:clock1: ${time} from ${location}`,
      ].join('\n');

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
      const { functions } = new Appwrite(req.headers['x-appwrite-key']);

      await functions.createExecution(
        process.env.APPWRITE_FUNCTION_ID,
        JSON.stringify({
          token: data.token,
          update: data.options[0].value,
        }),
        true,
        '/daily',
        ExecutionMethod.POST,
        {
          'Content-Type': 'application/json',
        }
      );

      return res.json(
        {
          type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        },
        200
      );

    default:
      return res.json({ error: 'Unknown command' }, 400);
  }
};
