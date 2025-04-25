import { Bot } from "grammy";

export async function registerBotCommands(bot: Bot) {
  await bot.api.setMyCommands([
    { command: "start", description: "Inicia o bot" },
    { command: "help", description: "Mostra ajuda" },
  ]);
}