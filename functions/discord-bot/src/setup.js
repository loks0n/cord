import { commands } from './commands/index.js';
import { Discord } from './services/discord.js';

async function setup() {
  const discord = new Discord();

  for (const command of commands) {
    try {
      await discord.registerCommand(command.registration());
    } catch (error) {
      console.error(`Failed to register ${command.name} command:`, error);
    }
  }
}

setup();
