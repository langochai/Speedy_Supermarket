import bodyParser from "body-parser";
import express from "express";
import { Database } from "./src/schemas/data-source";
import { Router } from "./src/router/Router";
import path from "path";
import passport from './src/middlewares/auth.middleware';
import session from 'express-session';
const app = express();
import {PORT} from "./config";
Database.connectDB()
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

app.use(express.static("./public/index"))
app.use(express.static("./public/login"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.authenticate('session'));
Router(app);

app.listen(PORT, "localhost", () => {
    console.log("Server is running on port " + PORT);
});