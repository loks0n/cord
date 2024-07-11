declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPWRITE_FUNCTION_API_ENDPOINT: string;
      APPWRITE_FUNCTION_PROJECT_ID: string;
      ASYNC_FUNCTION_ID: string;
      DISCORD_PUBLIC_KEY: string;
      DISCORD_APPLICATION_ID: string;
      DISCORD_TOKEN: string;
      GEOAPIFY_API_KEY: string;
    }
  }
}

export {};
