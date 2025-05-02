import { Context } from "grammy";
import { handlerProximosJogos } from "./proximosJogosHandler.js";
import { handlerResultadosEStats } from "./resultadosHandler.js";
import { handlerFuriaPlayers } from "./furiaPlayersHandler.js";
import { handlerNoticias } from "./noticiasHandler.js";
import { startCommand } from "../commands/startCommand.js";
import { userMessageMap } from "../utils/sessionStorage.js";

export async function handleCategory(ctx: Context) {
  await ctx.answerCallbackQuery();
  const category = ctx.callbackQuery?.data?.replace("cat:", "");

  if (!category) return ctx.reply("❌ Categoria inválida.");

  const userId = ctx.from?.id;

  switch (category) {
    case "Próximos jogos da FURIA": {
      const msg = await ctx.reply("⏳ Carregando os próximos jogos...");
      await handlerProximosJogos(ctx);
      if (userId) userMessageMap.set(userId, msg.message_id);
      break;
    }

    case "Resultados": {
      const msg = await ctx.reply("📊 Carregando resultados...");
      await handlerResultadosEStats(ctx);
      if (userId) userMessageMap.set(userId, msg.message_id);
      break;
    }

    case "Perfil dos jogadores": {
      const msg = await ctx.reply("🦁 Mostrando perfis dos jogadores...");
      await handlerFuriaPlayers(ctx);
      if (userId) userMessageMap.set(userId, msg.message_id);
      break;
    }

    case "Notícias": {
      const msg = await ctx.reply("📰 Aqui estão as últimas notícias...");
      await handlerNoticias(ctx);
      if (userId) userMessageMap.set(userId, msg.message_id);
      break;
    }

    default:
      return ctx.reply("🤔 Categoria não reconhecida.");
  }

  await startCommand(ctx);
}
