import { eq } from "drizzle-orm";
import { db } from "../index";
import { InsertUserModel, UserModel, userSchema } from "../db/schema";
import tokenService from "./token-service";
import UserDto from "../dtos/user-dto";
import { UserInfoModel } from "../models/user-model";
import UserInfoDto from "../dtos/user-info-dto";

type GetUser = {
  username: string;
  password: string;
};

type CreateUser = GetUser & {
  role?: InsertUserModel["role"];
};

class UserService {
  async createUser({
    username,
    password,
    role = "user",
  }: CreateUser): Promise<UserInfoDto> {
    const user = db.get(
      db.select().from(userSchema).where(eq(userSchema.username, username)),
    );

    if (user) {
      throw new Error("A user with this username already exists");
    }

    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 4,
    });

    const applicant: InsertUserModel = {
      id: crypto.randomUUID(),
      username,
      password: hashedPassword,
      role,
    };

    const addedUser: UserModel = db.get(
      db.insert(userSchema).values(applicant).returning(),
    );

    const userDto = new UserDto(addedUser);
    const tokens = tokenService.generateTokens({ ...userDto });

    const userInfoDto = new UserInfoDto({
      user: addedUser,
      ...tokens,
    });

    tokenService.saveToken({
      userId: userDto.id,
      refreshToken: tokens.refreshToken,
    });

    return {
      ...tokens,
      user: userInfoDto.user,
    };
  }

  async getUser({ username, password }: GetUser) {
    const user: UserModel = db.get(
      db.select().from(userSchema).where(eq(userSchema.username, username)),
    );

    if (!user) {
      throw new Error(`There isn't user ${username}`);
    }

    const isEqualPasswords = await Bun.password.verify(password, user.password);

    if (!isEqualPasswords) {
      throw new Error("Invalid password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    tokenService.saveToken({
      userId: userDto.id,
      refreshToken: tokens.refreshToken,
    });

    return {
      ...tokens,
      user: userDto,
    };
  }

  async refreshUserToken({ refreshToken }: { refreshToken?: string }) {
    if (!refreshToken) {
      throw new Error("Unauthorized");
    }

    const validationInfo = tokenService.validateRefreshToken({
      token: refreshToken,
    });
    const tokenInfo = tokenService.findToken({ refreshToken });

    if (!validationInfo || !tokenInfo) {
      throw new Error("Unauthorized");
    }

    const user: UserModel = db.get(
      db
        .select()
        .from(userSchema)
        .where(eq(userSchema.username, tokenInfo.userId)),
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens(userDto);

    tokenService.saveToken({
      userId: userDto.id,
      refreshToken: tokens.refreshToken,
    });

    return {
      ...tokens,
      user: userDto,
    };
  }

  updateUser() {}

  deleteUser() {}
}

export default new UserService();
