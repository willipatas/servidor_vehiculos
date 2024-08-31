import express, { Router } from "express";
import pool from "./database/db_connect";
import { getUser } from "./controllers/usuarios_controller";
import { generateToken } from "./controllers/usuarios_controller";
import { errorHandler } from "./middleware/error";


require('dotenv').config();

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(errorHandler);

const usuariosRoutes = Router();
const userRouters = Router();

usuariosRoutes.get('/usuarios', getUser); 
userRouters.post('/api/login', generateToken);

app.use(usuariosRoutes);
app.use(userRouters);
app.use(express.json());

app.listen(port, () => {
    console.log(`Se ha iniciado en el puerto ${port}`)
});
function cors(): any {
    throw new Error("Function not implemented.");
}

