import { Discord } from './discord.js';
import { generateDailyUpdate } from './openai.js';

export default async function ({ req, res, log }) {
  const discord = new Discord();

  log(`Received request: ${req.path} ${JSON.stringify(req.body || {})}`);

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

  return res.json({ error: 'Invalid path' }, 400);
}
