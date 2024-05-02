import { Context, t } from "elysia";
import userService from "../services/user-service";
import tokenService from "../services/token-service";
import { UserInfoModel } from "../models/user-model";
import UserInfoDto from "../dtos/user-info-dto";

enum Role {
  admin = "admin",
  user = "user",
}

class AuthController {
  readonly signinValidator = {
    body: t.Object({
      username: t.String({
        minLength: 5,
        maxLength: 20,
        error: "username is required and must be from 5 to 20 symbols",
      }),
      password: t.String({
        minLength: 6,
        error: "password is required and must not be lesser than 6 symbols",
      }),
    }),
  };

  readonly signupValidator = {
    body: t.Object({
      ...this.signinValidator.body.properties,
      role: t.Optional(t.Enum(Role, { error: "Invalid user role" })),
    }),
    response: t.Object({ username: t.String() }),
  };

  readonly signoutValidator = {
    cookie: t.Cookie({
      refreshToken: t.Optional(t.String()),
    }),
  };

  readonly refreshValidator = this.signoutValidator;

  async signup(ctx: Context) {
    type signupBody = typeof this.signupValidator.body;

    try {
      const { username, password, role } = ctx.body as signupBody;

      const userInfo = await userService.createUser({
        username,
        password,
        role,
      });

      ctx.cookie.refreshToken.set({
        value: userInfo.refreshToken,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return Response.json(userInfo, {
        status: 200,
      });
    } catch (e) {
      const { username } = ctx.body as signupBody;
      const errMsg = `Failed to signup user ${username}. ${e}`;
      console.error(errMsg);

      return Response.json(
        { message: errMsg },
        {
          status: 400,
        },
      );
    }
  }

  async signin(ctx: Context) {
    type signinBody = typeof this.signinValidator.body;

    try {
      const { username, password } = ctx.body as signinBody;

      const userInfo = await userService.getUser({ username, password });

      ctx.cookie.refreshToken.set({
        value: userInfo.refreshToken,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return Response.json(userInfo.user, {
        status: 200,
      });
    } catch (e) {
      const { username } = ctx.body as signinBody;
      const errMsg = `Failed to signin user ${username}. ${e}`;
      console.error(errMsg);

      return Response.json(
        { message: errMsg },
        {
          status: 400,
        },
      );
    }
  }

  async signout(ctx: Context) {
    try {
      const { refreshToken } = ctx.cookie;

      tokenService.removeToken({ refreshToken: refreshToken.value });

      return Response.json({ message: `Signout success` }, { status: 200 });
    } catch (e) {
      const errMsg = `Failed to remove token. ${e}`;
      console.error(errMsg);

      return Response.json({ message: errMsg }, { status: 400 });
    }
  }

  async refresh(ctx: Context) {
    try {
      const { refreshToken } = ctx.cookie;
      const userInfo = await userService.refreshUserToken({
        refreshToken: refreshToken.value,
      });

      ctx.cookie.refreshToken.set({
        value: userInfo.refreshToken,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return Response.json(userInfo, { status: 200 });
    } catch (e) {
      console.error(`Failed refresh`, e);
    }
  }
}

export default new AuthController();
