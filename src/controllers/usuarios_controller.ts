import { NextFunction, Request, Response } from "express";
import pool from "../database/db_connect";
import { QueryResult } from "pg";
import jwt from "jsonwebtoken"

require ('dotenv').config();

export const generateToken = async (req: Request, response:Response): Promise<Response> => {
    const userName = req.body.empleado_id;
    const password = req.body.contrasena;
    const query = await pool.query('SELECT * FROM users WHERE empleado_id = $1 AND contrasena = $2', [userName, password]);
    const user = query.rows[0];
    if (query.rowCount !== null  && query.rowCount > 0){
        const accessToken = jwt.sign(user, `${process.env.CLAVE_JWT}`, {expiresIn: '1h'});
        return response.status(200).json({accessToken});
    } else {
        return response.status(400).json('User Not found');
    }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: 'Token no encontrado'})
    }
    jwt.verify(token, `${process.env.CLAVE_JWT}`, (err, user) => {
        if(err){
            return res.status(403).json({error: 'Token invalido' });  
        }
    });
    next();
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Error interno en el servidor')
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const {nombre_cliente, correo_cliente, contrasena} = req.body;
    if (nombre_cliente !== null && correo_cliente !== null && contrasena !== null){
        try {
            await pool.query('INSERT INTO clientes (nombre_cliente, correo_cliente, contrasena) values ($1, $2, $3)',
                [nombre_cliente, correo_cliente, contrasena]
            );
            return res.status(201).json({
                message: 'User created successfully',
                category: {
                    nombre_cliente,
                    contrasena,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else {
        return res.status(500).json('Internal Server Error');
    }
};
