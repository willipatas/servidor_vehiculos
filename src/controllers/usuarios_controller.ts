import { Request, Response } from "express";
import pool from "../database/db_connect";
import { QueryResult } from "pg";

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM nuevos_usuarios;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Error interno en el servidor')
    }
};