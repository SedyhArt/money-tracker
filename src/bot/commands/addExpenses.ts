import { Message } from 'node-telegram-bot-api';
import {addExpense} from "../../services/expenseService";
import {bot} from "../index";
import {findOrCreateUser} from "../../services/userService";

export const addExpenseCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
    const chatId = msg.chat.id;
    if (!match) {
        bot.sendMessage(chatId, 'Некорректный формат команды. Используйте /add [категория] [сумма].');
        return;
    }

    const [category, amount] = match.slice(1);

    try {
        const userId = await findOrCreateUser(chatId)
        await addExpense(chatId.toString(), category, parseFloat(amount));
        bot.sendMessage(chatId, `Расход в категории "${category}" на сумму ${amount} добавлен!`);
    } catch (error) {
        bot.sendMessage(chatId, `Ошибка при добавлении расхода: ${(error as Error).message}`);
    }
};
