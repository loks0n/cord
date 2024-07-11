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

    log('City:', city);
    log('Flag:', flag);
    log('Timezone:', timeZone);

    try {
      const appwrite = new Appwrite(req.headers['x-appwrite-key']);
      await appwrite.updateSettingsByDiscordUserId(member.user.id, {
        city,
        timeZone,
        flag,
      });

      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Location, flag and timezone set! ${flag}`,
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
