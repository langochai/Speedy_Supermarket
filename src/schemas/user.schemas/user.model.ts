import { Schema, model } from 'mongoose';

interface IUser {
    google: { id: { type: string } },
    username: string;
    password: string;
    cart: object[];
    role: string;
}

const userSchema = new Schema<IUser>({
    google: { id: { type: String, } },
    username: String,
    password: String,
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    role: String, //there are 5 levels of role: normalUser, vip1, vip2, vip3, admin
});

export const User = model<IUser>("User", userSchema);