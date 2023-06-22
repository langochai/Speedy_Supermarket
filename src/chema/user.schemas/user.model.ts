import { Schema, model } from 'mongoose';

interface IUser {
    username: string;
    password: string;
    cart: object[];
    role: object;
}

const userSchema = new Schema<IUser>({
    username: String,
    password: String,
    cart: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    role: { type: Schema.Types.ObjectId, ref: 'Cart' },
});

export const User = model<IUser>("User", userSchema);