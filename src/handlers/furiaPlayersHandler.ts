import { getFuriaPlayers } from "../api/getFuriaPlayers.js";
import { Context, Api } from "grammy";
import "dotenv/config";
import deleteMenuMessage from "../utils/deleteMessage.js";
import { deletePreviousBotMessage } from "../utils/deletePreviousBotMessage.js";
import { Message } from "grammy/types";

type MyContext = Context & { api: Api };

export async function handlerFuriaPlayers(ctx: MyContext): Promise<Message.TextMessage> {
  if (!ctx.chat) {
    return await ctx.reply("❌ Erro ao carregar o chat.");
  }

  await deleteMenuMessage(ctx);
  await deletePreviousBotMessage(ctx);

  await ctx.api.sendChatAction(ctx.chat.id, "typing");

  const players = await getFuriaPlayers();
  if (!players || players.length === 0) {
    return ctx.reply("🚫 Nenhuma informação de jogadores foi encontrada.");
  }

  let mensagem = "🦁 *Line-up atual da FURIA (CS2):*\n\n";
  players.forEach((player: any) => {
    mensagem += `🎮 *${player.first_name && player.last_name ? player.first_name + " " + player.last_name : "Nome desconhecido"}*\n`;
    mensagem += `🧠 Nick: _${player.name || "N/A"}_\n`;
    mensagem += `🌎 Nacionalidade: ${player.nationality || "N/A"}\n\n`;
  });

  const msg = await ctx.reply(mensagem, { parse_mode: "Markdown" });
  return msg
}