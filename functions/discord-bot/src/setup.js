import { Discord } from './discord.js';

async function setup() {
  const discord = new Discord();

  try {
    await discord.registerCommand({
      name: 'hello',
      description: 'Hello command',
    });

    await discord.registerCommand({
      name: 'schedule',
      description: 'Schedule message command',
      options: [
        {
          type: 3,
          name: 'message',
          description: 'The message to send',
          required: true,
        },
        {
          type: 3,
          name: 'delay',
          description: 'The delay to send the message - e.g. 1h30m',
          required: true,
        },
      ],
    });

    await discord.registerCommand({
      name: 'start',
      description: 'Start your day command',
      options: {
        type: 3,
        name: 'message',
        description: 'The personal message to send',
      },
    });

    await discord.registerCommand({
      name: 'daily',
      description: 'Auto format your daily update',
      options: {
        type: 3,
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
