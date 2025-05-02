import { getProximosJogos } from "../api/getProximosJogos.js";
import { Context, Api } from "grammy";
import "dotenv/config"
import deleteMenuMessage from "../utils/deleteMessage.js";
import { deletePreviousBotMessage } from "../utils/deletePreviousBotMessage.js";
import { userMessageMap } from "../utils/sessionStorage.js";

type MyContext = Context & { api: Api };

type Match = {
  begin_at: string;
  name: string;
  match_videos: { embed_url: string }[];
};

export async function handlerProximosJogos(ctx: MyContext) {
  if (!ctx.chat || !ctx.from) return;

  await deleteMenuMessage(ctx);

  await deletePreviousBotMessage(ctx);

  await ctx.api.sendChatAction(ctx.chat.id, "typing");
    
  const jogos = await getProximosJogos();

  if (!jogos || jogos.length === 0) {
    const noMatchMsg = await ctx.reply("🚫 Nenhum jogo futuro encontrado.");
    userMessageMap.set(ctx.from.id, noMatchMsg.message_id);
    return;
  }

  let mensagem = "🎮 *Próximos jogos da FURIA:*\n\n";
      
  (jogos as Match[]).forEach((jogo: Match) => {
    const data = new Date(jogo.begin_at);
    mensagem += `🕒 *${data.toLocaleString()}*\n`;
    mensagem += `🏆 *${jogo.name}*\n`;
    mensagem += `📅 *${jogo.match_videos?.[0]?.embed_url ?? 'Sem link para vídeo'}*\n\n`;
  });

  const msg = await ctx.reply(mensagem, { parse_mode: "Markdown" });

  if (ctx.from?.id) {
    userMessageMap.set(ctx.from.id, msg.message_id);
  }
}
