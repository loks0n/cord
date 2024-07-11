import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { generateDailyUpdate } from './services/openai.js';
import { Discord } from './services/discord.js';
import { commands } from './commands/index.js';

export default async ({ req, res }) => {
  const discord = new Discord();

  if (req.path === '/daily') {
    await discord.editOriginalInteractionResponse(req.body.token, {
      'allowed-mentions': { parse: ['users'], replied_user: false },
      content: await generateDailyUpdate(req.body.userId, req.body.update),
    });
    return res.json({ success: true }, 200);
  }

  if (req.path === '/schedule') {
    await discord.editOriginalInteractionResponse(req.body.token, {
      'allowed-mentions': { parse: ['users'], replied_user: true },
      content: `Scheduled message from <@${req.body.userId}>: ${req.body.message}`,
    });
    return res.json({ success: true }, 200);
  }

  if (!discord.verifyRequest(req)) {
    return res.json({ error: 'Invalid request signature' }, 401);
  }

  if (type === InteractionType.PING) {
    return res.json({ type: InteractionResponseType.PONG }, 200);
  }

  if (type !== InteractionType.APPLICATION_COMMAND) {
    return res.json({ error: 'Invalid interaction type' }, 400);
  }

  const command = commands.find(
    (command) => command.name === req.body.data.name
  );

  if (!command) {
    return res.json({ error: 'Unknown command' }, 400);
  }

  return res.json(command.action(req.body), 200);
};
