declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'dev' | 'prod' | 'test';
      HOST: string;
      PORT?: number;
      JWT_SECRET_KEY: string;
      JWT_REFRESH_SECRET_KEY: string;
      JWT_ACCESS_EXPIRE: string;
      JWT_REFRESH_EXPIRE: string;
      JWT_REFRESH_EXPIRE_IN_MILLISECONDS: number;
      PG_DATABASE: string;
      PG_USERNAME: string;
      PG_PASSWORD: string;
      PG_HOST: string;
      PG_PORT: number;
    }
  }
}

export {}