import express, { Router } from "express";
import { errorHandler } from "./middleware/error";
import { userRoutes } from "./routes/user_routes";
import cors from "cors";


require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use(userRoutes);
app.use(express.json());

app.listen(port, () => {
    console.log(`Se ha iniciado en el puerto ${port}`)
});


