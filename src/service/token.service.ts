import JWT, {JwtPayload, Secret } from 'jsonwebtoken';
import { IJwtPayload, ITokenPairs } from '../model/interface/auth.interface';
import { redisClient } from '../database/redis.db';

export class TokenService {

  static async generate(payload: IJwtPayload): Promise<ITokenPairs> {
    const accessToken = JWT.sign(payload, process.env.JWT_ACCESS_SECRET as Secret, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
    const refreshToken = JWT.sign(payload, process.env.JWT_REFRESH_SECRET as Secret, { expiresIn: process.env.JWT_REFRESH_EXPIRE });

    await redisClient.hSet('userTokens', payload.id, refreshToken);

    return {
      accessToken,
      refreshToken
    }
  }

  static async verifyAccessToken(token: string): Promise<IJwtPayload> {
    const tokenData = await JWT.verify(token, process.env.JWT_ACCESS_SECRET as Secret) as JwtPayload;
    return { id: tokenData.id };
  }

  static async verifyRefreshToken(token: string): Promise<IJwtPayload> {
    const tokenData = await JWT.verify(token, process.env.JWT_REFRESH_SECRET as Secret) as JwtPayload;
    return { id: tokenData.id };
  }

  static async getRefreshTokenById(userId: number): Promise<string | undefined> {
    return await redisClient.hGet('userTokens', userId.toString());
  }

  static async removeRefreshToken(userId: number): Promise<void> {
    await redisClient.hDel('userTokens', userId.toString());
  }

}