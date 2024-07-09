import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import OpenAI from 'openai';
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
      const currentDayOfWeekAndDay = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
      });

      const systemPrompt = `Here is a format for daily updates:
🚦 Daily Update - ${currentDayOfWeekAndDay}

🟢 My Progress
- List progress made on tasks
- \`projectName\` - Progress made

🟡 My Plans
- List short term plans

🔴 My Blockers
- List of blockers
None

Structure any given daily updates using this format.
- Avoid rephrasing if possible.
- Correct obvious grammatical and spelling errors.
- If no blockers are mentioned, do not include the section.
- If no plans are mentioned, do not include the section.
- Do not exagerate or change the meaning of progress points.
- Output the result only.`;

      const openai = new OpenAI();

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Here is a daily update: ${data.options[0].value}`,
          },
        ],
      });

      return res.json(
        {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: completion.choices[0].message.content,
          },
        },
        200
      );

    default:
      return res.json({ error: 'Unknown command' }, 400);
  }
};
