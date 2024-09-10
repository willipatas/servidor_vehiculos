"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiculosRoutes = void 0;
const express_1 = require("express");
const vehiculos_controller_1 = require("../controllers/vehiculos_controller");
exports.vehiculosRoutes = (0, express_1.Router)();
//Rutas de vehiculos
exports.vehiculosRoutes.get('/vehiculos_registrados', vehiculos_controller_1.getVehiculos);
exports.vehiculosRoutes.post('/nuevo_vehiculo', vehiculos_controller_1.createVehiculo);
// Ruta para cerrar sesión (simplemente borra el token del cliente)
exports.vehiculosRoutes.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Sesión cerrada' });
});
