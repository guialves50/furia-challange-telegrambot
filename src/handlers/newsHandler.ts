import { getTweetsFuria } from "../api/getTweetsFuria.js";
import { Context, Api } from "grammy";
import deleteMenuMessage from "../utils/deleteMessage.js";
import { deletePreviousBotMessage } from "../utils/deletePreviousBotMessage.js";
import { userMessageMap } from "../utils/sessionStorage.js";
import { Message } from "grammy/types";

type MyContext = Context & { api: Api };

type Tweet = {
  id: string;
  text: string;
  created_at: string;
};

export async function handlerNoticias(ctx: MyContext): Promise<Message.TextMessage> {
  try {
    if (!ctx.chat) {
      return await ctx.reply("❌ Erro ao carregar o chat.");
    }

    await deleteMenuMessage(ctx);
    await deletePreviousBotMessage(ctx);

    await ctx.api.sendChatAction(ctx.chat.id, "typing");
    
    const tweets: Tweet[] = await getTweetsFuria();
    const uniqueTweets = Array.from(
      new Map(tweets.map(t => [t.text, t as Tweet])).values()
    );
    if (tweets.length === 0) {
      if(!ctx.from?.id) 
      await ctx.reply("⚠️ *Nenhum tweet recente sobre a FURIA foi encontrado.*", {
        parse_mode: "Markdown",
      });
    }

    const mensagens = uniqueTweets.map((tweet: any) => {
      const data = new Date(tweet.created_at).toLocaleString("pt-BR");
      const texto = escapeMarkdown(tweet.text);
      return `🗓 *${data}*\n\n📢 ${texto}\n\n🔗 [Ver no Twitter](https://twitter.com/i/web/status/${tweet.id})\n${"━".repeat(25)}`;
    });

    const msg = await ctx.reply(`📰 *Últimos tweets sobre a FURIA:*\n\n${mensagens.join("\n")}`, { parse_mode: "Markdown" });
    return msg

  } catch (error) {
    if (!ctx.from) {
      console.error("Erro no handler de tweets:", error);
      return await ctx.reply("❌ *Erro ao buscar tweets da FURIA.*", { parse_mode: "Markdown" });
    }
  
    const msgNoticiaError = await ctx.reply("❌ *Erro ao buscar tweets da FURIA.*", { parse_mode: "Markdown" });
    userMessageMap.set(ctx.from.id, msgNoticiaError.message_id);
    return msgNoticiaError;
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*[\]()~`>#+=|{}.!-])/g, "\\$1");
}