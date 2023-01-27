declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'dev' | 'prod' | 'test';
      HOST: string;
      PORT?: number;
      JWT_SECRET_KEY: string;
      JWT_PUBLIC_KEY: string;
      JWT_REFRESH_SECRET_KEY: string;
      JWT_REFRESH_PUBLIC_KEY: string;
      JWT_ACCESS_EXPIRE: string;
      JWT_REFRESH_EXPIRE: string;
      JWT_REFRESH_EXPIRE_IN_MILLISECONDS: number;
      REDIS_URL: string;
    }
  }
}

export {}