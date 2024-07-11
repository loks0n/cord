import { Discord } from './services/discord.js';
import { generateDailyUpdate } from './services/openai.js';

export async function asyncActions(req, res) {
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
}
