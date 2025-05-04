import { Context } from "grammy";
import { handlerProximosJogos } from "./nextGamesHandler.js";
import { handlerResultadosEStats } from "./resultsHandler.js";
import { handlerFuriaPlayers } from "./furiaPlayersHandler.js";
import { handlerNoticias } from "./newsHandler.js";
import { startCommand } from "../commands/startCommand.js";
import { userMessageMap } from "../utils/sessionStorage.js";
import { deletePreviousBotMessage } from "../utils/deletePreviousBotMessage.js";

export async function handleCategory(ctx: Context) {
  await ctx.answerCallbackQuery();
  const category = ctx.callbackQuery?.data?.replace("cat:", "");
  const userId = ctx.from?.id;

  if (!category) return ctx.reply("❌ Categoria inválida.");

  await deletePreviousBotMessage(ctx);

  const loadingMessage = await ctx.reply("⏳ Carregando...");

  let finalMsg;
  switch (category) {
    case "Próximos jogos da FURIA":
      finalMsg = await handlerProximosJogos(ctx);
      break;
    case "Resultados":
      finalMsg = await handlerResultadosEStats(ctx);
      break;
    case "Perfil dos jogadores":
      finalMsg = await handlerFuriaPlayers(ctx);
      break;
    case "Notícias":
      finalMsg = await handlerNoticias(ctx);
      break;
    default:
      return ctx.reply("🤔 Categoria não reconhecida.");
  }

  try {
    if(!ctx.chat) return
    await ctx.api.deleteMessage(ctx.chat.id, loadingMessage.message_id);
  } catch (_) {}

  if (userId && finalMsg?.message_id) {
    userMessageMap.set(userId, finalMsg.message_id);
  }

  await startCommand(ctx);
}