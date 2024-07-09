import { Discord } from './discord.js';

const CommandType = {
  SLASH_COMMAND: 1,
};

const CommandOptionType = {
  STRING: 3,
};

async function setup() {
  const discord = new Discord();

  try {
    await discord.registerCommand({
      name: 'hello',
      type: CommandType.SLASH_COMMAND,
      description: 'Hello command',
    });

    await discord.registerCommand({
      name: 'schedule',
      type: CommandType.SLASH_COMMAND,
      description: 'Schedule message command',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'message',
          description: 'The message to send',
          required: true,
        },
        {
          type: CommandOptionType.STRING,
          name: 'delay',
          description: 'The delay to send the message - e.g. 1h30m',
          required: true,
        },
      ],
    });

    await discord.registerCommand({
      name: 'start',
      type: CommandType.SLASH_COMMAND,
      description: 'Start your day command',
      options: {
        type: 3,
        name: 'message',
        description: 'The personal message to send',
      },
    });

    await discord.registerCommand({
      name: 'daily',
      type: CommandType.SLASH_COMMAND,
      description: 'Auto format your daily update',
      options: {
        type: CommandOptionType.STRING,
        name: 'message',
        description: 'The daily update message',
      },
    });

    console.log('Commands registered successfully');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

setup();
