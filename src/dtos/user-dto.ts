import { UserModel } from "../db/schema";

export default class UserDto {
  id: string;
  username: string;
  role: string;

  constructor(userModel: UserModel) {
    this.id = userModel.id;
    this.username = userModel.username;
    this.role = userModel.role;
  }
}
