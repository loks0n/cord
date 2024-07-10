import { Client, Databases, Functions } from 'node-appwrite';
import { throwIfMissing } from './utils.js';

const DATABASE_ID = 'main';
const USER_SETTINGS_COLLECTION_ID = 'user-settings';

export class Appwrite {
  constructor(apiKey) {
    throwIfMissing(process.env, [
      'APPWRITE_FUNCTION_API_ENDPOINT',
      'APPWRITE_FUNCTION_PROJECT_ID',
    ]);

    this.client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(apiKey);
  }

  get functions() {
    return new Functions(this.client);
  }

  get databases() {
    return new Databases(this.client);
  }

  async getSettingsByDiscordUserId(discordUserId) {
    try {
      return await this.getSettingsByDiscordUserId(discordUserId);
    } catch (error) {
      if (error.code === 404) {
        return false;
      }
      throw error;
    }
  }

  async updateSettingsByDiscordUserId(discordUserId, newSettings) {
    const existingSettings =
      await this.getSettingsByDiscordUserId(discordUserId);

    if (existingSettings) {
      await this.databases.updateDocument(
        DATABASE_ID,
        USER_SETTINGS_COLLECTION_ID,
        discordUserId,
        newSettings
      );
    } else {
      await this.databases.createDocument(
        DATABASE_ID,
        USER_SETTINGS_COLLECTION_ID,
        discordUserId,
        newSettings
      );
    }
  }
}
