"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios_controller");
exports.userRoutes = (0, express_1.Router)();
//Rutas de clientes
exports.userRoutes.post('/api/login', usuarios_controller_1.generateToken);
exports.userRoutes.post('/nuevo_usuario', usuarios_controller_1.createUser);
exports.userRoutes.get('/clientes_registrados', usuarios_controller_1.getClientes);
exports.userRoutes.get('/clientes_registrados/:id', usuarios_controller_1.getClientesById);
exports.userRoutes.delete('/borrarCliente/:id', usuarios_controller_1.borrarCliente);
exports.userRoutes.put('/actualizarCliente/:id', usuarios_controller_1.actualizarCliente);
exports.userRoutes.get('/empleados', usuarios_controller_1.getEmpleados);
// Ruta para cerrar sesión (simplemente borra el token del cliente)
exports.userRoutes.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Sesión cerrada' });
});
