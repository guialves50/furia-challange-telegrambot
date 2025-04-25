import { MiddlewareFn } from "grammy";
export const logger: MiddlewareFn = async (ctx, next) => {
  console.log(`Mensagem de ${ctx.from?.username}: ${ctx.message?.text}`);
  await next();
};