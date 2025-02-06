import express, { Express } from "express";
import cityController from "./controllers/cityController";
const cors = require("cors");

const port = 8080;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/city", cityController);

app.listen(port, () => console.log(`Listening on port ${port}`));
