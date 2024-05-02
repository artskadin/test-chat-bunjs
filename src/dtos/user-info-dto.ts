import UserDto from "./user-dto";
import { UserInfoModel } from "../models/user-model";

export default class UserInfoDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;

  constructor(userInfoModel: UserInfoModel) {
    this.user = new UserDto(userInfoModel.user);
    this.accessToken = userInfoModel.accessToken;
    this.refreshToken = userInfoModel.refreshToken;
  }
}
