import { Schema, model } from "mongoose";

interface ICategory {
    name: string;
}

const categorySchema = new Schema<ICategory>({
    name: String,
});

export const Category = model<ICategory>('Category', categorySchema);