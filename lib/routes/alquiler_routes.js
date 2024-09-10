"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alquilerRoutes = void 0;
const express_1 = require("express");
const alquileres_controller_1 = require("../controllers/alquileres_controller");
exports.alquilerRoutes = (0, express_1.Router)();
exports.alquilerRoutes.get('/alquileres', alquileres_controller_1.getAlquileres);
exports.alquilerRoutes.post('/Crear_alquiler', alquileres_controller_1.createAlquiler);
