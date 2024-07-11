import { Discord } from './discord.js';
import { generateDailyUpdate } from './openai.js';

export default async function ({ req, res }) {
  const discord = new Discord();

  await discord.editOriginalInteractionResponse(req.body.token, {
    'allowed-mentions': { parse: ['users'], replied_user: false },
    content: await generateDailyUpdate(req.body.userId, req.body.update),
  });
  return res.json({ success: true }, 200);
}
