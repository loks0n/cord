declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPWRITE_ENDPOINT: string;
      APPWRITE_FUNCTION_PROJECT_ID: string;
      APPWRITE_FUNCTION_ID: string;
      DISCORD_PUBLIC_KEY: string;
      DISCORD_APPLICATION_ID: string;
      DISCORD_TOKEN: string;
      OPENAI_API_KEY: string;
    }
  }
}

export {};
