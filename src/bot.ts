import { Bot } from "grammy";
import dotenv from 'dotenv';
import { startCommand } from "./commands/startCommand.js";
import { logger } from "./middlewares/logger.js";
import { registerCallbackHandlers } from "./handlers/callback.js";
import { registerBotCommands } from "./commands/register_commands/registerCommands.js";
dotenv.config();

export const bot = new Bot(process.env.TOKEN!);

//register commands
registerBotCommands(bot)

//middlewares
bot.use(logger)

//commands
bot.command("start", startCommand)

//handlers
registerCallbackHandlers(bot);

//start bot
bot.start();