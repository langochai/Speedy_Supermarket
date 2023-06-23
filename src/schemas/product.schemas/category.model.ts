import { Schema, model } from "mongoose";

interface ICategory {
    name: string; // there are 3 categories : clothes, food, household goods
}

const categorySchema = new Schema<ICategory>({
    name: String,
});

export const Category = model<ICategory>('Category', categorySchema);