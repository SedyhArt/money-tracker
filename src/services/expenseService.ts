import Expense from '../models/expense';

export const addExpense = async (userId: string, category: string, amount: number): Promise<void> => {
    const expense = new Expense({ userId, category, amount });
    await expense.save();
};

export const getExpenses = async (userId: string): Promise<Array<{ category: string; amount: number; date: Date }>> => {
    return await Expense.find({ userId }).sort({ date: -1 }).lean();
};
