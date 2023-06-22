import { Schema, model } from "mongoose";

interface ICart {
    detail: object[];
    purchased: boolean;
}

const detailSchema = new Schema({
    productName: String,
    productQuantity: Number,
});

const cartSchema = new Schema({
    detail: [detailSchema],
    purchased: {
        type: "boolean",
        default: false,
    }
});

export const Cart = model<ICart>('Cart', cartSchema);