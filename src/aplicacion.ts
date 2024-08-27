import express from "express";

const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send('Hola mundo de los vehículos');
});

app.listen(port, () => {
    console.log(`Se ha iniciado en el puerto ${port}`)
});
