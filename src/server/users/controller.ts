import { Context } from "koa";
import { User } from "../../entities";
import { AuthUser } from "../../lib/authentication";
import { UserManager } from "../../managers";
import {
  CreateUser,
  LoginUser,
  UpdatePass,
  UpdateUser,
  UserModel
} from "./model";

export class UserController {
  private manager: UserManager;

  constructor(manager: UserManager) {
    this.manager = manager;
  }

  public async create(ctx: Context) {
    const userDto: CreateUser = ctx.request.body as CreateUser;
    const newUser = await this.manager.create(userDto as User);

    ctx.body = new UserModel(newUser);
    ctx.status = 201;
    ctx.set("location", "/api/v1/users/me");
  }

  public async login(ctx: Context) {
    const { email, password } = ctx.request.body as LoginUser;
    ctx.body = {
      accessToken: await this.manager.login(email, password)
    };
  }

  public async update(ctx: Context) {
    const { firstName, lastName } = ctx.request.body as UpdateUser;
    const user = await this.manager.findByEmail(ctx.state.user.email);

    user.firstName = firstName;
    user.lastName = lastName;

    const updatedUser = await this.manager.update(user);

    ctx.body = new UserModel(updatedUser);
    ctx.status = 200;
  }

  public async changePassword(ctx: Context) {
    const { newPassword, oldPassword } = ctx.request.body as UpdatePass;

    await this.manager.changePassword(
      ctx.state.user.email,
      newPassword,
      oldPassword
    );

    ctx.status = 204;
  }

  public async get(ctx: Context) {
    const authUser: AuthUser = ctx.state.user;
    const user = await this.manager.findByEmail(authUser.email);

    ctx.body = new UserModel(user);
    ctx.status = 200;
  }

  public async delete(ctx: Context) {
    await this.manager.delete(ctx.params.id);

    ctx.status = 204;
  }
}
