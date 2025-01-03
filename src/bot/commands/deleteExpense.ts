import {bot} from "../index";
import {Message} from "node-telegram-bot-api";
import Expense from "../../models/expense";
import {findOrCreateUser} from "../../services/userService";

export const deleteExpenseCommand = async (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id;
    const expenseId = match?.[1]?.trim();

    if (!expenseId) {
        bot.sendMessage(chatId, 'Пожалуйста, укажите ID записи для удаления.');
        return;
    }

    try {
        const userId = await findOrCreateUser(chatId);
        const result = await Expense.findOneAndDelete({ _id: expenseId, userId: userId });

        if (!result) {
            bot.sendMessage(chatId, 'Запись с указанным ID не найдена.');
            return;
        }

        bot.sendMessage(chatId, `Запись с ID ${expenseId} успешно удалена.`);
    } catch (error) {
        console.error('Ошибка при удалении записи:', error);
        bot.sendMessage(chatId, 'Произошла ошибка при удалении записи. Проверьте правильность ID.');
    }
}