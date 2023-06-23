import { Schema, model } from "mongoose";

interface IRole {
    name: string; //there are 5 levels of role: normalUser, vip1, vip2, vip3, admin
}

const roleSchema = new Schema<IRole>({
    name: String, // normalUser, vip1, vip2, vip3, admin
});

export const Role = model<IRole>('Role', roleSchema);