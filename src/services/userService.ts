import User from '../models/user';

export const findOrCreateUser = async (chatId: number, name?: string): Promise<void> => {
    const existingUser = await User.findOne({ chatId });
    if (!existingUser) {
        const user = new User({ chatId, name });
        console.log(user, "user")
        await user.save();
    }
};
