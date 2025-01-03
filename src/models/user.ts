import { Schema, model, Document } from 'mongoose';

interface User extends Document {
    chatId: number;
    name?: string;
}

const userSchema = new Schema<User>({
    chatId: { type: Number, required: true, unique: true },
    name: { type: String },
});

export default model<User>('User', userSchema);
