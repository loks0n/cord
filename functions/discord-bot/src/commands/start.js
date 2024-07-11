import { InteractionResponseType } from 'discord-interactions';
import { Appwrite } from '../services/appwrite.js';
import { CommandBuilder, CommandOptionType, CommandType } from './command.js';
import { AppwriteException } from 'node-appwrite';

const start = new CommandBuilder()
  .name('start')
  .type(CommandType.SLASH_COMMAND)
  .description('Start your day command')
  .option({
    type: CommandOptionType.STRING,
    name: 'message',
    description: 'Personal message',
  })
  .action(async ({ member, data }, { req }) => {
    const appwrite = new Appwrite(req.headers['x-appwrite-key']);

    try {
      const { timeZone, city, flag } =
        await appwrite.getSettingsByDiscordUserId(member.user.id);

      const timeAtTimeZone = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone,
      });

      const message = data.options ? data.options[0].value : 'Starting 👋';

      const content = [
        `<@${member.user.id}> ${message}`,
        `:clock1: ${timeAtTimeZone} from ${city} ${flag}`,
      ].join('\n');

      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content,
          'allowed-mentions': { parse: ['users'], replied_user: false },
        },
      };
    } catch (error) {
      if (error instanceof AppwriteException && error.code === 404) {
        return {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content:
              'Please set your location and timezone first with /location',
          },
        };
      }

      throw error;
    }
  })
  .build();

export { start };
