import express, { Router } from "express";
import pool from "./database/db_connect";
import { getUser } from "./controllers/usuarios_controller";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const usuariosRoutes = Router();

usuariosRoutes.get('/nuevos_usuarios', getUser); 

app.use(usuariosRoutes);

app.listen(port, () => {
    console.log(`Se ha iniciado en el puerto ${port}`)
});
