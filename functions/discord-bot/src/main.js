import { InteractionResponseType, InteractionType } from 'discord-interactions';

import { Discord } from './services/discord.js';
import { commands } from './commands/index.js';
import { asyncActions } from './async.js';

export default async ({ req, res }) => {
  if (req.path != '/') return await asyncActions();

  const discord = new Discord();
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
