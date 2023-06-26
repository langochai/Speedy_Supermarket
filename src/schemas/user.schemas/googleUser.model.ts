import { Schema, model } from 'mongoose';

interface IGoogleUser {
    google: { id: { type: string } },
    username: string;
    password: string;
    cart: object[];
    role: string;
}

const googleUserSchema = new Schema<IGoogleUser>({
    google: { id: { type: String, } },
    username: String,
    password: String,
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    role: String,
});

export const googleUser = model<IGoogleUser>("googleUser", googleUserSchema);