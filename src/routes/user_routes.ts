import { Router } from "express";
import { actualizarCliente, borrarCliente, createUser, generateToken, getClientes } from "../controllers/usuarios_controller";
import { authenticateToken } from "../middleware/authorization";

export const userRoutes = Router();
userRoutes.post('/api/login', generateToken);
userRoutes.post('/nuevo_usuario', createUser);
userRoutes.get('/clientes_registrados', getClientes);
userRoutes.delete('/borrarCliente/:id', authenticateToken, borrarCliente);
userRoutes.put('/actualizarCliente/:id', authenticateToken, actualizarCliente)

// Ruta para cerrar sesión (simplemente borra el token del cliente)
userRoutes.post('/logout', (req, res) => {
    // En una implementación real, podrías invalidar el token de alguna forma, si fuera necesario
    res.status(200).json({ message: 'Sesión cerrada' });
});