import JWT, { JwtPayload } from 'jsonwebtoken';
import { ITokenPairs } from "../model/interface/auth.model";
import { redisClient } from "../database/redis.db";

export class TokenService {

  static async generate(payload: { id: number }): Promise<ITokenPairs> {
    const privateKey: string = Buffer.from(process.env.JWT_SECRET_KEY as string, 'base64').toString('utf-8');
    const privateKeyRefresh: string = Buffer.from(process.env.JWT_REFRESH_SECRET_KEY as string, 'base64').toString('utf-8');

    const accessToken = JWT.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: process.env.JWT_ACCESS_EXPIRE });
    const refreshToken = JWT.sign(payload, privateKeyRefresh, { algorithm: 'RS256', expiresIn: process.env.JWT_REFRESH_EXPIRE });

    await redisClient.hSet('userTokens', payload.id, refreshToken);

    return {
      accessToken,
      refreshToken
    }
  }

  static async verifyAccessToken(token: string): Promise<{ id: number }> {
    const publicKey: string = Buffer.from(process.env.JWT_PUBLIC_KEY as string, 'base64').toString('utf-8');
    const tokenData = await JWT.verify(token, publicKey, { algorithms: ["RS256"] }) as JwtPayload;
    return { id: tokenData.id };
  }

  static async verifyRefreshToken(token: string): Promise<{ id: number }> {
    const publicKey = Buffer.from(process.env.JWT_REFRESH_PUBLIC_KEY as string, 'base64').toString('utf-8');
    const tokenData = await JWT.verify(token, publicKey, { algorithms: ["RS256"] }) as JwtPayload;
    return { id: tokenData.id };
  }

  static async getRefreshTokenById(userId: number): Promise<string | undefined> {
    return await redisClient.hGet('userTokens', userId.toString());
  }

  static async removeRefreshToken(userId: number): Promise<void> {
    await redisClient.hDel('userTokens', userId.toString());
  }

}