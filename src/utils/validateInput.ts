export const validateExpenseInput = (category: string, amount: number): void => {
    if (!category || typeof category !== 'string') {
        throw new Error('Некорректная категория.');
    }
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error('Некорректная сумма.');
    }
};
