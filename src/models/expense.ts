import { Schema, model, Document } from 'mongoose';

interface Expense extends Document {
    userId: Record<string, any>;
    category: string;
    amount: number;
    date: Date;
}

const expenseSchema = new Schema<Expense>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

export default model<Expense>('Expense', expenseSchema);
