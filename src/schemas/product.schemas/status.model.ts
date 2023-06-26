import { Schema, model } from "mongoose";

interface IStatus {
    name: string; // there are 2 types of status : discount and trending
}

const statusSchema = new Schema<IStatus>({
    name: String,
});

export const Status = model<IStatus>('Status', statusSchema);