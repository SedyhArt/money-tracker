import { Message } from 'node-telegram-bot-api';
import {getExpenses} from "../../services/expenseService";
import {bot} from "../index";
import {findOrCreateUser} from "../../services/userService";
import {ObjectId} from "mongoose";
export const viewDetailedExpensesCommand = async (msg: Message, showIds?: boolean): Promise<void> => {
    const chatId = msg.chat.id;

    try {
        const userId = await findOrCreateUser(chatId);
        // @ts-ignore
        const expenses = await getExpenses(userId.toString());

        if (expenses.length === 0) {
            bot.sendMessage(chatId, "Нет записей о расходах.");
        } else {
            const response = expenses
                .map(e => `${e.category.toUpperCase()}: ${e.amount} руб. (${new Date(e.date).toLocaleDateString()} ${showIds ? `| ID: ${(e._id as ObjectId).toString()}` : ""})`)
                .join('\n');
            bot.sendMessage(chatId, `Ваши расходы:\n${response}`);
        }
    } catch (error) {
        bot.sendMessage(chatId, `Ошибка при получении расходов: ${(error as Error).message}`);
    }
};