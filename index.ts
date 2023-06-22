import { router as homeRouter } from './src/router/home.router';
import { router as loginRouter } from './src/router/login.router'
import bodyParser from "body-parser";
import express from "express";

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static("./public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(homeRouter)
app.use(loginRouter)

app.listen(PORT, "localhost", () => {
    console.log("Server is running on port" + PORT);  
});