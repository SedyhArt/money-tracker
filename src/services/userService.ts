import User from '../models/user';

export const findOrCreateUser = async (chatId: number, name?: string): Promise<unknown> => {
    const existingUser = await User.findOne({ chatId });

    if (!existingUser) {
        const user = new User({ chatId, name });
        await user.save();
        return user._id;
    }
    return existingUser._id
};
