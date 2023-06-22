import bodyParser from "body-parser";
import express from "express";
import {Database} from "./src/schemas/data-source";
import {Router} from "./src/router/Router"

const app = express();
const PORT = 8080;
Database.connectDB()
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
Router(app);
app.listen(PORT, "localhost", () => {
    console.log("Server is running on port" + PORT);  
});