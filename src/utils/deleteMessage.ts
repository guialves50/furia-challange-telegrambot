import { Context } from "grammy";

export default async function deleteMenuMessage(ctx: Context) {
  if (ctx.chat && ctx.callbackQuery?.message) {
    try {
      await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);
    } catch (err) {
      console.error("Erro ao deletar a mensagem do menu:", err);
    }
  }
}
