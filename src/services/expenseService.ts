import Expense from '../models/expense';
import {ObjectId} from "mongoose";

export const addExpense = async (userId: string, category: string, amount: number): Promise<void> => {
    const expense = new Expense({ userId, category, amount });
    await expense.save();
};

export const getExpenses = async (userId: string): Promise<Array<{
    category: string; amount: number; date: Date, _id: unknown }>> => {
    return await Expense.find({ userId }).sort({ date: -1 }).lean();
};
