import { Client, Functions } from 'node-appwrite';
import { throwIfMissing } from './utils.js';

export class Appwrite {
  constructor(apiKey) {
    throwIfMissing(process.env, [
      'APPWRITE_ENDPOINT',
      'APPWRITE_FUNCTION_PROJECT_ID',
    ]);

    this.client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(apiKey);
  }

  get functions() {
    return new Functions(this.client);
  }
}
