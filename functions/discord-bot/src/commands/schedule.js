import { InteractionResponseType } from 'discord-interactions';
import { Appwrite } from '../services/appwrite.js';
import { CommandBuilder, CommandOptionType, CommandType } from './command.js';
import { ExecutionMethod } from 'node-appwrite';

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
  .action(async ({ member, data, token }, { req }) => {
    const { functions } = new Appwrite(req.headers['x-appwrite-key']);

    try {
      await functions.createExecution(
        process.env.SCHEDULE_FUNCTION_ID,
        JSON.stringify({
          userId: member.user.id,
          token,
          message: data.options[0].value,
          delay: data.options[1].value,
        }),
        true,
        '/schedule',
        ExecutionMethod.POST,
        {
          'Content-Type': 'application/json',
        }
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
