import { Context } from "grammy";
import { userMessageMap } from "./sessionStorage.js";

export async function deletePreviousBotMessage(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  const messageId = userMessageMap.get(userId ?? 0);

  // Log de depuração
  console.log("Tentando deletar message_id:", messageId, "para o user:", userId, "no chat:", ctx.chat?.id);

  if (!userId || !messageId || !ctx.chat) {
    console.warn("Informações insuficientes para deletar a mensagem. Verifique se 'ctx.from' e 'ctx.chat' estão presentes.");
    console.log("ctx.from:", ctx.from);
    console.log("ctx.chat:", ctx.chat);
    return;
  }

  try {
    // Tentando deletar a mensagem
    await ctx.api.deleteMessage(ctx.chat.id, messageId);
    console.log(`Mensagem do bot deletada no chat ${ctx.chat.id}, userId: ${userId}, messageId: ${messageId}`);
    
    // Removendo o messageId após a exclusão
    userMessageMap.delete(userId);
  } catch (error: any) {
    if (error.description?.includes("message to delete not found")) {
      console.warn(`Mensagem não encontrada para o user ${userId}, chat ${ctx.chat.id}`);
    } else {
      console.error("Erro ao deletar a mensagem anterior:", error);
    }
  }
}
