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

export const getEmpleados = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users ORDER BY id ASC');
        return res.status(200).json(response.rows)
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
};

export const getClientes = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM clientes ORDER BY id ASC');
        return res.status(200).json(response.rows)
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
};

export const getClientesById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        const response: QueryResult = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        return res.json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena } = req.body;

    // Validar que los campos no estén vacíos o nulos
    if (nombre_cliente && correo_cliente && telefono_cliente && direccion_cliente && ciudad_cliente && contrasena) {
        try {
            // Inserción de todos los valores correspondientes a las columnas
            await pool.query(
                'INSERT INTO clientes (nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena) VALUES ($1, $2, $3, $4, $5, $6)',
                [nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena]
            );
            return res.status(201).json({
                message: 'User created successfully',
                user: {
                    nombre_cliente, 
                    correo_cliente, 
                    telefono_cliente, 
                    direccion_cliente, 
                    ciudad_cliente
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
    const {nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena} = req.body;

    try {
        await pool.query('UPDATE clientes SET nombre_cliente = $1, correo_cliente = $2, telefono_cliente = $3, direccion_cliente = $4, ciudad_cliente = $5, contrasena = $6 WHERE id = $7',
            [nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena, id]
        );
        return res.json({
            message: `El cliente con el id ${id} fue actualizado con éxito.`,
            cliente: {
                id,
                nombre_cliente, 
                correo_cliente, 
                telefono_cliente, 
                direccion_cliente, 
                ciudad_cliente, 
                contrasena
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};
