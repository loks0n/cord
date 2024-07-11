import { InteractionResponseType } from 'discord-interactions';
import { Appwrite } from '../services/appwrite.js';
import { CommandBuilder, CommandOptionType, CommandType } from './command.js';
import { Geo } from '../services/geo.js';

const location = new CommandBuilder()
  .name('location')
  .type(CommandType.SLASH_COMMAND)
  .description('Set your location for the start command')
  .option({
    type: CommandOptionType.STRING,
    name: 'city',
    description: 'The city you are currently located',
    required: true,
  })
  .action(async ({ member, data }, { req, log }) => {
    const cityQuery = data.options[0].value;

    const { city, flag, timeZone } = await Geo.forward(cityQuery);

    try {
      const appwrite = new Appwrite(req.headers['x-appwrite-key']);
      await appwrite.updateSettingsByDiscordUserId(member.user.id, {
        city,
        timeZone,
        flag,
      });

      const startInTimeZone = new Date().toLocaleTimeString('en-US', {
        hour: 9,
        minute: 0,
        second: 0,
        timeZone,
      });

      const endInTimeZone = new Date().toLocaleTimeString('en-US', {
        hour: 17,
        minute: 0,
        second: 0,
        timeZone,
      });

      const startTimeUnix = new Date(startInTimeZone).getTime() / 1000;
      const endTimeUnix = new Date(endInTimeZone).getTime() / 1000;

      const content = [
        `Nice, we've set your location. Feel free to use the snippet below in your profile:`,

        '```',
        `Current location: ${city} ${flag}`,
        `Available during <t:${startTimeUnix}:t> to <t:${endTimeUnix}:t>`,
        '```',
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
          content: error.message,
        },
      };
    }
  })
  .build();

export { location };
