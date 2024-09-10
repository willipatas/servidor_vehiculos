import { Router } from "express";
import { actualizarCliente, borrarCliente, createUser, generateToken, getClientes, getClientesById, getEmpleados } from "../controllers/usuarios_controller";


export const userRoutes = Router();

//Rutas de clientes
userRoutes.post('/api/login', generateToken);
userRoutes.post('/nuevo_usuario', createUser);
userRoutes.get('/clientes_registrados', getClientes);
userRoutes.get('/clientes_registrados/:id', getClientesById);
userRoutes.delete('/borrarCliente/:id', borrarCliente);
userRoutes.put('/actualizarCliente/:id', actualizarCliente) 
userRoutes.get('/empleados', getEmpleados);

// Ruta para cerrar sesión (simplemente borra el token del cliente)
userRoutes.post('/logout', (req, res) => {
    
    res.status(200).json({ message: 'Sesión cerrada' });
});