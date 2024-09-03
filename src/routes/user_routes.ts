import { Router } from "express";
import { createUser, generateToken, getUser } from "../controllers/usuarios_controller";

export const userRoutes = Router();
userRoutes.post('/api/login', generateToken);
userRoutes.post('/user/register', createUser);
userRoutes.get('/getUsers', getUser);