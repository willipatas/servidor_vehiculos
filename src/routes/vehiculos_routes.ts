import { Router } from "express";
import { createVehiculo, getVehiculos } from "../controllers/vehiculos_controller";

export const vehiculosRoutes = Router();

//Rutas de vehiculos
vehiculosRoutes.get('/vehiculos_registrados', getVehiculos);
vehiculosRoutes.post('/nuevo_vehiculo', createVehiculo);

// Ruta para cerrar sesión (simplemente borra el token del cliente)
vehiculosRoutes.post('/logout', (req, res) => {
    
    res.status(200).json({ message: 'Sesión cerrada' });
});