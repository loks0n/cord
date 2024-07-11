//import { commands } from './commands/index.js';
import { Discord } from './services/discord.js';

async function setup() {
  console.log('Init Discord...');
  const discord = new Discord();
  console.log('done');

  /* for (const command of commands) {
    try {
      console.log(`Registering ${command.name} command...`);
      //await discord.registerCommand(command.registration());
      console.log(`done.`);
    } catch (error) {
      console.error(`Failed to register ${command.name} command:`, error);
    }
  } */
}

setup();
