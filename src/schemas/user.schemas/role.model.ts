import { Schema, model } from "mongoose";

interface IRole {
    name: string;
}

const roleSchema = new Schema<IRole>({
    name: String,
});

export const Role = model<IRole>('Role', roleSchema);