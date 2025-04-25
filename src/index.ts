import { Bot } from "grammy";
import dotenv from 'dotenv';
dotenv.config();

const bot = new Bot("7504950235:AAGFeEgUEk-tsuTwRnod5qViAztrkpkaaHQ");

bot.on("message", (ctx) => {
  console.log("Foi fião")
  ctx.reply("Got another message!");
})
bot.start();