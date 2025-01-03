import { Message } from 'node-telegram-bot-api';
import {getExpenses} from "../../services/expenseService";
import {bot} from "../index";
import {findOrCreateUser} from "../../services/userService";
export const viewExpensesCommand = async (msg: Message): Promise<void> => {
    const chatId = msg.chat.id;

    try {
        const userId = await findOrCreateUser(chatId);
        // @ts-ignore
        const expenses = await getExpenses(userId.toString());
        if (expenses.length === 0) {
            bot.sendMessage(chatId, "Нет записей о расходах.");
        } else {
            const totalExpenses = expenses.reduce((total, expense) => {
                return total + expense.amount
            }, 0)

            const expensesByCategory = expenses.reduce((acc, expense) => {
                if (acc[expense.category]) {
                    acc[expense.category] += expense.amount;
                } else {
                    acc[expense.category] = expense.amount;
                }
                return acc;
            }, {} as { [key: string]: number });

            const response = Object.entries(expensesByCategory)
                .map(([category, totalAmount]) => `${category.toUpperCase()}: ${totalAmount}.`)
            response.push(`\n Всего: ${totalExpenses}`)

            bot.sendMessage(chatId, `Ваши расходы:\n${response.join("\n")}`);
        }
    } catch (error) {
        bot.sendMessage(chatId, `Ошибка при получении расходов: ${(error as Error).message}`);
    }
};
