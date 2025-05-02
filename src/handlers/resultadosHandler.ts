import { getUltimosJogos } from "../api/getUltimosJogos.js";
import { Context, Api } from "grammy";
import "dotenv/config";
import deleteMenuMessage from "../utils/deleteMessage.js";
import { deletePreviousBotMessage } from "../utils/deletePreviousBotMessage.js";
import { userMessageMap } from "../utils/sessionStorage.js";

type MyContext = Context & { api: Api };

export async function handlerResultadosEStats(ctx: MyContext) {
  if (!ctx.chat || !ctx.from) return;

  await deleteMenuMessage(ctx);

  await deletePreviousBotMessage(ctx);

  await ctx.api.sendChatAction(ctx.chat.id, "typing");

  const jogos = await getUltimosJogos();

  if (!jogos) {
    return ctx.reply("🚫 Nenhum jogo futuro encontrado.");
  }

  let mensagem = "🎮 *Últimos jogos da FURIA:*\n\n";

  (jogos as any[]).forEach((jogo: any) => {
    mensagem += `🆚 *${jogo.opponents?.find((op: any) => op.opponent.name !== 'FURIA')?.opponent.name ?? "Adversário desconhecido"}*\n`;
    mensagem += `🏆 *${jogo.league.name + " " + jogo.serie.name || "Campeonato desconhecido"}*\n`;
    mensagem += `📅 *${new Date(jogo.begin_at).toLocaleDateString('pt-BR')}*\n`;
    mensagem += `🔚 *${jogo.opponents?.find((t: any) => t.opponent.id === 124530)?.opponent.acronym ?? 'FUR'} ${jogo.results?.find((r: any) => r.team_id === 124530)?.score ?? 0} x ${jogo.results?.find((r: any) => r.team_id !== 124530)?.score ?? 0} ${jogo.opponents?.find((t: any) => t.opponent.id !== 124530)?.opponent.acronym ?? 'ADV'}*\n`;
  
    mensagem += `-------------------------\n\n`;
  });

  const msg = await ctx.reply(mensagem, { parse_mode: "Markdown" });
  if (ctx.from?.id) {
    userMessageMap.set(ctx.from.id, msg.message_id);
  }
}
