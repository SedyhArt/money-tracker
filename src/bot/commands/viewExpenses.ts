import { Message } from 'node-telegram-bot-api';
import {getExpenses} from "../../services/expenseService";
import {bot} from "../index";
export const viewExpensesCommand = async (msg: Message): Promise<void> => {
    const chatId = msg.chat.id;

    try {
        const expenses = await getExpenses(chatId.toString());
        if (expenses.length === 0) {
            bot.sendMessage(chatId, "Нет записей о расходах.");
        } else {
            const response = expenses
                .map(e => `${e.category}: ${e.amount} руб. (${new Date(e.date).toLocaleDateString()})`)
                .join('\n');
            bot.sendMessage(chatId, `Ваши расходы:\n${response}`);
        }
    } catch (error) {
        bot.sendMessage(chatId, `Ошибка при получении расходов: ${(error as Error).message}`);
    }
};
