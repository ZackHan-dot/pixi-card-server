import { Context } from "koa";
import { Task } from "../../entities";
import { AuthUser } from "../../lib/authentication";
import { TaskManager } from "../../managers";
import { TaskModel } from "./model";

interface TaskDto {
  name: string;
  description: string;
  done: boolean;
}

export class TaskController {
  private manager: TaskManager;

  constructor(manager: TaskManager) {
    this.manager = manager;
  }

  public async get(ctx: Context) {
    const authUser: AuthUser = ctx.state.user;
    const task = await this.manager.find(authUser.id, ctx.params.id);

    ctx.body = new TaskModel(task);
    ctx.status = 200;
  }

  public async getAll(ctx: Context) {
    const authUser: AuthUser = ctx.state.user;
    const limit = isNaN(+ctx.query.limit)
      ? 10
      : parseInt(String(ctx.query.limit), 10);
    const offset = isNaN(+ctx.query.offset)
      ? 0
      : parseInt(String(ctx.query.offset), 10);
    const tasks = await this.manager.findUserTasks(authUser.id, limit, offset);

    ctx.body = tasks.map((t: Task) => new TaskModel(t));
    ctx.status = 200;
  }

  public async create(ctx: Context) {
    const authUser: AuthUser = ctx.state.user;
    const task: Task = ctx.request.body as Task;

    task.userId = authUser.id;
    task.done = false;

    const newTask = await this.manager.create(task);

    ctx.body = new TaskModel(newTask);
    ctx.status = 201;
    ctx.set("location", `/api/v1/tasks/${newTask.id}`);
  }

  public async update(ctx: Context) {
    const taskDto: TaskDto = ctx.request.body as TaskDto;
    const authUser: AuthUser = ctx.state.user;
    const task = await this.manager.find(authUser.id, ctx.params.id);

    task.name = taskDto.name;
    task.description = taskDto.description;
    task.done = taskDto.done;

    const updatedTask = await this.manager.update(task);

    ctx.body = new TaskModel(updatedTask);
    ctx.status = 200;
  }

  public async delete(ctx: Context) {
    const authUser: AuthUser = ctx.state.user;
    const id: number = ctx.params.id;

    await this.manager.delete(authUser.id, id);

    ctx.status = 204;
  }
}
