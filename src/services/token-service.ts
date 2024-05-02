import jwt from "jsonwebtoken";
import { refreshSessionSchema, RefreshSessionModel } from "../db/schema";
import { db } from "../index";
import { eq } from "drizzle-orm";

type SaveToken = { userId: string; refreshToken: string };
type Tokens = { accessToken: string; refreshToken: string };

class TokenService {
  generateTokens(payload: unknown): Tokens {
    const accessToken = jwt.sign(payload!, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload!, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  saveToken({ userId, refreshToken }: SaveToken) {
    const tokenInfo: RefreshSessionModel | undefined = db.get(
      db
        .select()
        .from(refreshSessionSchema)
        .where(eq(refreshSessionSchema.userId, userId)),
    );

    if (tokenInfo?.refreshToken) {
      const updatedToken = db.get(
        db
          .update(refreshSessionSchema)
          .set({ refreshToken })
          .where(eq(refreshSessionSchema.userId, userId))
          .returning(),
      );

      console.log(`User ${userId} update token`);

      return updatedToken;
    }

    const newToken = db.get(
      db
        .insert(refreshSessionSchema)
        .values({ refreshToken, userId })
        .returning(),
    );

    console.log(`User ${userId} received token for the first time`);

    return newToken;
  }

  removeToken({ refreshToken }: Omit<Tokens, "accessToken">) {
    const removedToken = db.get(
      db
        .delete(refreshSessionSchema)
        .where(eq(refreshSessionSchema.refreshToken, refreshToken))
        .returning(),
    );

    console.log(`Token [${removedToken}] was removed`);
    console.log({ removedToken });

    return removedToken;
  }

  findToken({ refreshToken }: Omit<Tokens, "accessToken">) {
    const tokenInfo: RefreshSessionModel | undefined = db.get(
      db
        .select()
        .from(refreshSessionSchema)
        .where(eq(refreshSessionSchema.refreshToken, refreshToken)),
    );

    return tokenInfo;
  }

  validateAccessToken({ token }: { token: string }) {
    try {
      const res = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      console.log({ res });
      return res;
    } catch (e) {
      console.error(`Failed to validate access token. ${e}`);
      return null;
    }
  }

  validateRefreshToken({ token }: { token: string }) {
    try {
      const res = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      console.log({ res });
      return res;
    } catch (e) {
      console.error(`Failed to validate refresh token. ${e}`);
      return null;
    }
  }
}

export default new TokenService();
