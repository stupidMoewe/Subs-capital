declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      CORS_ORIGIN_FE: string;
      CORS_ORIGIN_DM: string;
    }
  }
}

export {}
