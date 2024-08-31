import { Request, Response } from "express";
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

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Error interno en el servidor')
    }
};

