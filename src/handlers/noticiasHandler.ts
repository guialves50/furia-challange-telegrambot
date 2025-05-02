import { getTweetsFuria } from "../api/getTweetsFuria.js";
import { Context, Api } from "grammy";
import deleteMenuMessage from "../utils/deleteMessage.js";
import { deletePreviousBotMessage } from "../utils/deletePreviousBotMessage.js";
import { userMessageMap } from "../utils/sessionStorage.js";

type MyContext = Context & { api: Api };

export async function handlerNoticias(ctx: MyContext) {
  try {
    if (!ctx.chat || !ctx.from) return;

    await deleteMenuMessage(ctx);

    await deletePreviousBotMessage(ctx);

    await ctx.api.sendChatAction(ctx.chat.id, "typing");

    const tweets = await getTweetsFuria();

    if (tweets.length === 0) {
      const noTweetMsg = await ctx.reply("⚠️ *Nenhum tweet recente sobre a FURIA foi encontrado.*", {
        parse_mode: "Markdown",
      });

      userMessageMap.set(ctx.from.id, noTweetMsg.message_id);
      return;
    }

    const mensagens = tweets.map((tweet: any) => {
      const data = new Date(tweet.created_at).toLocaleString("pt-BR");
      const texto = escapeMarkdown(tweet.text);
      return `🟡 *${data}*\n${texto}\n[🔗 Ver no Twitter](https://twitter.com/i/web/status/${tweet.id})\n`;
    });

    const msg = await ctx.reply(
      `📰 *Últimos tweets sobre a FURIA:*\n\n${mensagens.join("\n")}`,
      { parse_mode: "Markdown" }
    );

    if (ctx.from?.id) {
      userMessageMap.set(ctx.from.id, msg.message_id);
    }
  } catch (error) {
    if(!ctx.from) return
    console.error("Erro no handler de tweets:", error);
    const msgNoticiaError = await ctx.reply("❌ *Erro ao buscar tweets da FURIA.*", { parse_mode: "Markdown" });
    return userMessageMap.set(ctx.from.id, msgNoticiaError.message_id);
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*[\]()~`>#+=|{}.!-])/g, "\\$1");
}
