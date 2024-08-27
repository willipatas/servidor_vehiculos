import express from "express";
import pool from "./database/db_connect";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.get('/', async (req, res) =>{
    const query = 'SELECT * from nuevos_usuarios';
    const response = await pool.query(query);
    console.log(response);
    res.send('Hola mundo de los vehículos');
});

app.listen(port, () => {
    console.log(`Se ha iniciado en el puerto ${port}`)
});
