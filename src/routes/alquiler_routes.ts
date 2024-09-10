import { Router } from "express";
import { createAlquiler, getAlquileres } from "../controllers/alquileres_controller";


export const alquilerRoutes = Router();

alquilerRoutes.get('/alquileres', getAlquileres);
alquilerRoutes.post('/Crear_alquiler', createAlquiler);

