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
    description: 'The city you are located in',
  })
  .action(async ({ member, data }) => {
    const appwrite = new Appwrite(req.headers['x-appwrite-key']);

    const city = data.options[0].value;
    const timeZone = Geo.getTimezone(location);
    const flag = Geo.getFlag(location);

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
  })
  .build();

export { location };
