declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'dev' | 'prod' | 'test';
      HOST: string;
      PORT?: number;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_EXPIRE: string;
      JWT_REFRESH_EXPIRE: string;
      JWT_REFRESH_EXPIRE_IN_MILLISECONDS: number;
      REDIS_URL: string;
    }
  }
}

export {}