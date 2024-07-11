import { InteractionResponseType } from 'discord-interactions';
import { Appwrite } from '../services/appwrite.js';
import { CommandBuilder, CommandOptionType, CommandType } from './command.js';
import { ExecutionMethod } from 'node-appwrite';

/**
 * Parse the delay, can be format: 30s, 1m, 1h, 1d, 1h30m, 1d2h30m25s etc
 *
 * @param {string} raw
 * @returns {DateTime}
 */
function parseRawDelay(raw) {
  const matches = raw.match(/(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);

  if (!matches) {
    throw new Error('Invalid delay format, please use: 30s, 1m, 1h, 1d, 1h30m');
  }

  const [, days, hours, minutes, seconds] = matches;

  const now = DateTime.now();

  return now.plus({
    days: days ? parseInt(days, 10) : 0,
    hours: hours ? parseInt(hours, 10) : 0,
    minutes: minutes ? parseInt(minutes, 10) : 0,
    seconds: seconds ? parseInt(seconds, 10) : 0,
  });
}

const schedule = new CommandBuilder()
  .name('schedule')
  .type(CommandType.SLASH_COMMAND)
  .description('Schedule a message')
  .option({
    type: CommandOptionType.STRING,
    name: 'message',
    description: 'The message to send',
    required: true,
  })
  .option({
    type: CommandOptionType.STRING,
    name: 'delay',
    description: 'The delay to send the message - e.g. 1h30m',
    required: true,
  })
  .action(async ({ member, data }, { req }) => {
    const { functions } = new Appwrite(req.headers['x-appwrite-key']);

    try {
      await functions.createExecution(
        process.env.ASYNC_FUNCTION_ID,
        JSON.stringify({
          userId: member.user.id,
          token,
          message: data.options[0].value,
        }),
        true,
        '/schedule',
        ExecutionMethod.POST,
        {
          'Content-Type': 'application/json',
        },
        parseRawDelay(data.options[1].value).toISO()
      );

      return {
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      };
    } catch (error) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: error.message,
        },
      };
    }
  })
  .build();

export { schedule };
