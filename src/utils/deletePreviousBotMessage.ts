import { Context } from "grammy";
import { userMessageMap } from "./sessionStorage.js";

export async function deletePreviousBotMessage(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  const messageId = userMessageMap.get(userId ?? 0);

  if (!userId || !messageId || !ctx.chat) {
    return;
  }

  try {
    await ctx.api.deleteMessage(ctx.chat.id, messageId);
    userMessageMap.delete(userId);
  } catch (error: any) {
    if (error.description?.includes("message to delete not found")) {
    }
  }
}
