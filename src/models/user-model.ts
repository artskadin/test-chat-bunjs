import UserDto from "../dtos/user-dto";
import { UserModel } from "../db/schema";

export type UserInfoModel = {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
};
