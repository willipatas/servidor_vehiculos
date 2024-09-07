import { NextFunction, Request, Response } from "express";
import pool from "../database/db_connect";
import { QueryResult } from "pg";
import jwt from "jsonwebtoken"

require ('dotenv').config();

export const getVehiculos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM vehiculos');
        return res.status(200).json(response.rows)
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
};

export const createVehiculo = async (req: Request, res: Response): Promise<Response> => {
    const { marca, modelo, anio, color, tipo_motor, precio_alquiler_diario } = req.body;

    // Validar que los campos no estén vacíos o nulos
    if (marca && modelo && anio && color && tipo_motor && precio_alquiler_diario) {
        try {
            // Inserción de todos los valores correspondientes a las columnas
            await pool.query(
                'INSERT INTO vehiculos (marca, modelo, anio, color, tipo_motor, precio_alquiler_diario) VALUES ($1, $2, $3, $4, $5, $6)',
                [marca, modelo, anio, color, tipo_motor, precio_alquiler_diario]
            );
            return res.status(201).json({
                message: 'User created successfully',
                user: {
                    marca, 
                    modelo, 
                    anio, 
                    color, 
                    tipo_motor, 
                    precio_alquiler_diario
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
};

export const borrarCliente = async (req: Request, res: Response): Promise<Response> => {
    const id =parseInt(req.params.id);
        try {
            await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
            return res.status(200).json(`El cliente con el id ${id} fue borrado con éxito.`);
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
};

export const actualizarCliente = async (req: Request, res: Response): Promise<Response> => {
    const id =parseInt(req.params.id);
    const {nameUser, emailUser} = req.body;

    try {
        await pool.query('UPDATE clientes SET nombre_cliente = $1, correo_cliente = $2 WHERE id = $3',
            [nameUser, emailUser, id]
        );
        return res.json({
            message: `El cliente con el id ${id} fue actualizado con éxito.`,
            cliente: {
                id, 
                nameUser,
                emailUser
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};
