import { Context } from "grammy";
import { buildCategoryMenu } from "../menus/mainMenu.js";

export function startCommand(ctx: Context) {
  const message = `
👋 *Bem\\-vindo\\(a\\) a Fúria\\!*

Aqui você pode encontrar:
\\- 🗓️ Próximos jogos da FURIA
\\- 📊 Resultados & estatísticas
\\- 🦁 Perfil dos jogadores
\\- 📰 Notícias
\\- 📢 Alertas e notificações

Escolha uma categoria abaixo para começar:
`
  ctx.reply(message.trim(), {
    parse_mode: "MarkdownV2",
    reply_markup: buildCategoryMenu()
  });
}