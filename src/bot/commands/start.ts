import { Message } from 'node-telegram-bot-api';
import {bot} from "../index";
import {findOrCreateUser} from "../../services/userService";

export const startCommand = async (msg: Message): Promise<void> => {
    await findOrCreateUser(msg.chat.id, msg.chat.username || "")
    console.log(msg.chat.id, "message")
    bot.sendMessage(msg.chat.id, "Добро пожаловать в трекер семейных расходов! Используйте /add [категория] [сумма] для добавления расходов.");
};
