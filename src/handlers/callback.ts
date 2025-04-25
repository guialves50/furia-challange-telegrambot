import { Bot } from "grammy";
import { Context } from "grammy";

export function registerCallbackHandlers(bot: Bot<Context>) {
  bot.callbackQuery(/cat:.+/, async (ctx) => {
    const categoria = ctx.callbackQuery.data?.split(":")[1];
    await ctx.answerCallbackQuery();
    await ctx.reply(`Você escolheu a categoria: ${categoria}`);
  });
}
