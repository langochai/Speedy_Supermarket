import { Schema, model } from "mongoose";

interface IProduct {
    name: string;
    price: number;
    quantity: number;
    discount: number;
    image: string;
    category: object[];
    status: object[];
}

const productSchema = new Schema<IProduct>({
    name: String,
    price: Number,
    quantity: Number,
    discount: Number,
    image: String,
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    status: [{ type: Schema.Types.ObjectId, ref: 'Status' }],
});

export const Product = model<IProduct>('Product', productSchema);