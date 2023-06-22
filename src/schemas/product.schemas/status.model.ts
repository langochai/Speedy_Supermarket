import { Schema, model } from "mongoose";

interface IStatus {
    name: string;
}

const statusSchema = new Schema<IStatus>({
    name: String,
});

export const Status = model<IStatus>('Category', statusSchema);