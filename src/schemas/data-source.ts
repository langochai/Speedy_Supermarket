import mongoose from "mongoose";
export class Database {
    static async connectDB() {
        const DB_URL = process.env.DB || "mongodb+srv://Viet:123456!@cluster0.cznxnof.mongodb.net/SuperMarket";
        return await mongoose.connect(DB_URL);
    }
}