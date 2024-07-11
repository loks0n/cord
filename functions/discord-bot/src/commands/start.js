import { InteractionResponseType } from 'discord-interactions';
import { Appwrite } from '../services/appwrite.js';
import { CommandBuilder, CommandOptionType, CommandType } from './command.js';

const start = new CommandBuilder()
  .name('start')
  .type(CommandType.SLASH_COMMAND)
  .description('Start your day command')
  .option({
    type: CommandOptionType.STRING,
    name: 'message',
    description: 'Personal message',
  })
  .action(async ({ member, data }) => {
    const appwrite = new Appwrite(req.headers['x-appwrite-key']);

    try {
      const { timeZone, location, flag } =
        await appwrite.getSettingsByDiscordUserId(member.user.id);

      const timeAtTimeZone = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone,
      });

      const content = [
        `<@${member.user.id}> ${data.options[0].value || 'Starting 👋'}`,
        `:clock1: ${timeAtTimeZone} from ${location} ${flag}`,
      ].join('\n');

      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content,
          'allowed-mentions': { parse: ['users'], replied_user: false },
        },
      };
    } catch (error) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Please set your location first with /location',
        },
      };
    }
  })
  .build();

export { start };
