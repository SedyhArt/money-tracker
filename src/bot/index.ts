import { startCommand } from './commands/start';
import { viewExpensesCommand } from './commands/viewExpenses';
import {addExpenseCommand} from "./commands/addExpenses";
import TelegramBot from "node-telegram-bot-api";
import {viewDetailedExpensesCommand} from "./commands/viewDetailedExpenses";
import {deleteExpenseCommand} from "./commands/deleteExpense";
const botToken = process.env.BOT_TOKEN || '';

export const bot = new TelegramBot(botToken, { polling: true });

bot.on('message', (message) => {
    console.log('Received message:', message.text);
});

bot.onText(/\/start/, startCommand);
bot.onText(/\/add (\S+) (\d+)/, addExpenseCommand);
bot.onText(/\/view/, viewExpensesCommand);
bot.onText(/\/detailed /, (msg) => viewDetailedExpensesCommand(msg));
bot.onText(/\/detailedWithId/, (msg) => viewDetailedExpensesCommand(msg, true));
bot.onText(/\/delete (.+)/, deleteExpenseCommand);

