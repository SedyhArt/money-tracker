import { Message } from 'node-telegram-bot-api';
import {bot} from "../index";
import {findOrCreateUser} from "../../services/userService";

export const startCommand = async (msg: Message): Promise<void> => {
    await findOrCreateUser(msg.chat.id, msg.chat.username || "")
    bot.sendMessage(msg.chat.id, "Добро пожаловать в трекер семейных расходов! \n" +
        " Используйте \n" +
        "/add [категория] [сумма] для добавления расходов. \n" +
        "/view для просмотра расходов за все время \n" +
        "/detailed для просмотра детальной информации по тратам за все время \n" +
        "/detailedWithId для просмотра детальной информации вместе с id траты \n" +
        "/delete [id траты] для ее удаления");
};
