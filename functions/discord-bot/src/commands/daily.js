import { InteractionResponseType } from 'discord-interactions';
import { Appwrite } from '../services/appwrite.js';
import { CommandBuilder, CommandOptionType, CommandType } from './command.js';
import { ExecutionMethod } from 'node-appwrite';

const daily = new CommandBuilder()
  .name('daily')
  .type(CommandType.SLASH_COMMAND)
  .description('Auto format your daily update')
  .option({
    type: CommandOptionType.STRING,
    name: 'message',
    description: 'The daily update message',
    required: true,
  })
  .action(async ({ member, data, token }, { req }) => {
    const { functions } = new Appwrite(req.headers['x-appwrite-key']);

    // It's too slow to call OpenAI, here - we do it async
    await functions.createExecution(
      process.env.DAILY_FUNCTION_ID,
      JSON.stringify({
        userId: member.user.id,
        token,
        update: data.options[0].value,
      }),
      true,
      '/daily',
      ExecutionMethod.POST,
      {
        'Content-Type': 'application/json',
      }
    );

    return {
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    };
  })
  .build();

export { daily };
