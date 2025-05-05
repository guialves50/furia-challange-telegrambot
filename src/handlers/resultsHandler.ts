import { getUltimosJogos } from "../api/getResults.js";
import { Context, Api } from "grammy";
import "dotenv/config";
import deleteMenuMessage from "../utils/deleteMessage.js";
import { deletePreviousBotMessage } from "../utils/deletePreviousBotMessage.js";
import { Message } from "grammy/types";
import { getStatisticsMock } from "../api/getStatisticsMock.js";

type MyContext = Context & { api: Api };

export async function handlerResultadosEStats(ctx: MyContext): Promise<Message.TextMessage> {
  if (!ctx.chat) {
    return await ctx.reply("❌ Erro ao carregar o chat.");
  }

  await deleteMenuMessage(ctx);
  await deletePreviousBotMessage(ctx);

  await ctx.api.sendChatAction(ctx.chat.id, "typing");

  const jogos = await getUltimosJogos();
  if (!jogos) {
    return ctx.reply("🚫 Nenhum jogo futuro encontrado.");
  }

  let mensagem = "🎮 *Últimos jogos da FURIA:*\n\n";
  for (const jogo of jogos) {
    const matchId = jogo.games?.[0]?.match_id;
  
    mensagem += `*${jogo.name}*\n`;
    mensagem += `🏆 *${jogo.league.name + " " + jogo.serie.name || "Campeonato desconhecido"}*\n`;
    mensagem += `📅 *${new Date(jogo.begin_at).toLocaleDateString('pt-BR')}*\n`;
    mensagem += `🏆 *Ganhador: ${jogo.winner.name}*\n`;
    mensagem += `🔚 *${jogo.opponents?.find((t: any) => t.opponent.id === 124530)?.opponent.acronym ?? 'FUR'} ${jogo.results?.find((r: any) => r.team_id === 124530)?.score ?? 0} x ${jogo.results?.find((r: any) => r.team_id !== 124530)?.score ?? 0} ${jogo.opponents?.find((t: any) => t.opponent.id !== 124530)?.opponent.acronym ?? 'ADV'}*\n`;
  
    if (matchId) {
      const stats = await getStatisticsMock(matchId, 124530);
      if (stats) {
        mensagem += `\n📊 *Estatísticas da FURIA:*\n`;
        mensagem += `• 🔫 *Kills/jogo:* ${stats.stats.per_game_averages.kills} | *Deaths/jogo:* ${stats.stats.per_game_averages.deaths}\n`;
        mensagem += `• 🎯 *Headshots/jogo:* ${stats.stats.per_game_averages.headshots} | *por round:* ${stats.stats.per_round_averages.headshots}\n`;
        mensagem += `• 🔪 *Clutches vencidos/jogo:* ${stats.stats.per_game_averages.clutches_won}\n`;
        mensagem += `• 💣 *Plants:* ${stats.stats.per_game_averages.plants} | *Defuses:* ${stats.stats.per_game_averages.defuses}\n`;
        mensagem += `• 📈 *Dano/round:* ${stats.stats.per_round_averages.damage} | *Utilitário:* ${stats.stats.per_round_averages.utility_damage}\n`;
        mensagem += `• ✨ *Flash assists:* ${stats.stats.totals.total_flash_assists} | *Trocas:* ${stats.stats.totals.total_trade_kills}\n`;
        mensagem += `• 🕹️ *Win rate:* CT: ${stats.stats.tactical.ct_win_rate} | TR: ${stats.stats.tactical.t_win_rate}\n\n`;
    
        mensagem += `🏅 *Destaques do jogo:*\n`;
        for (const player of stats.stats.top_players) {
          mensagem += `• *${player.name}*: ${player.kills} kills | ${player.headshots} HS | Rating: ${player.rating} | Clutches: ${player.clutch_wins}\n`;
        }
      }
    }
  
    mensagem += `--------------------------------------------\n\n`;
  }
  

  const msg = await ctx.reply(mensagem, { parse_mode: "Markdown" });
  return msg
}