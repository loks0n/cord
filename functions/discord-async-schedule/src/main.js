import { Discord } from './discord.js';

export default async function ({ req, res, log }) {
  const discord = new Discord();

  await discord.editOriginalInteractionResponse(req.body.token, {
    'allowed-mentions': { parse: ['users'], replied_user: true },
    content: `Scheduled message from <@${req.body.userId}>: ${req.body.message}`,
  });
  return res.json({ success: true }, 200);
}
