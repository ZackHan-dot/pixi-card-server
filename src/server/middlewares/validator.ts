import * as Joi from "joi";
import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { FieldValidationError } from "../../errors";

export interface SchemaMap {
  params?: { [key: string]: Joi.SchemaLike };

  request?: {
    body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema;
    headers?: { [key: string]: Joi.SchemaLike };
  };

  response?: {
    body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema;
    headers?: { [key: string]: Joi.SchemaLike };
  };
}

export function validate(schema: SchemaMap): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const validationSchemas = {
      params: schema.params,
      body: schema.request?.body,
      headers: schema.request?.headers
    };

    const validationResults = {};

    for (const key in validationSchemas) {
      if (validationSchemas[key]) {
        const result = Joi.object(validationSchemas[key]).validate(
          ctx.request[key],
          {
            allowUnknown: true,
            abortEarly: false
          }
        );
        if (result.error) {
          throw new FieldValidationError(
            result.error.message,
            result.error.details.map(f => ({
              message: f.message,
              path: f.path as string[],
              type: f.type
            })),
            result.error
          );
        }
        validationResults[key] = result.value;
      }
    }

    ctx.request = { ...ctx.request, ...validationResults };

    await next();
  };
}
