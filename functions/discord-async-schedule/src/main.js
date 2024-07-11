import { Discord } from './discord.js';

function parseRawDelay(raw) {
  const matches = raw.match(/(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);

  if (!matches) {
    throw new Error('Invalid delay format, please use: 30s, 1m, 1h, 1d, 1h30m');
  }

  const [, days, hours, minutes, seconds] = matches;

  return (
    (parseInt(days, 10) || 0) * 24 * 60 * 60 * 1000 +
    (parseInt(hours, 10) || 0) * 60 * 60 * 1000 +
    (parseInt(minutes, 10) || 0) * 60 * 1000 +
    (parseInt(seconds, 10) || 0) * 1000
  );
}

export default async function ({ req, res, log }) {
  const discord = new Discord();

  const delay = parseRawDelay(req.body.delay);

  await new Promise((resolve) => setTimeout(resolve, delay));

  await discord.editOriginalInteractionResponse(req.body.token, {
    'allowed-mentions': { parse: ['users'], replied_user: true },
    content: `Scheduled message from <@${req.body.userId}>: ${req.body.message}`,
  });
  return res.json({ success: true }, 200);
}
