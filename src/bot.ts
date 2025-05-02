import { Bot } from "grammy";
import dotenv from 'dotenv';
import { startCommand } from "./commands/startCommand.js";
import { registerBotCommands } from "./commands/register_commands/registerCommands.js";
import { handleCategory } from "./handlers/categoryHandler.js";
dotenv.config();

export const bot = new Bot(process.env.TOKEN!);

//register commands
registerBotCommands(bot)

//middlewares

//commands
bot.command("start", startCommand)

//handlers
bot.callbackQuery(/^cat:.+$/, handleCategory);

//start bot
bot.start();