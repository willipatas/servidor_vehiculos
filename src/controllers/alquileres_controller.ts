import { Request, Response } from "express";
import pool from "../database/db_connect";
import { QueryResult } from "pg";

// Obtener todos los alquileres con información combinada
export const getAlquileres = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query(`
            SELECT 
                a.id AS id_alquiler, 
                c.nombre_cliente, 
                CONCAT(v.marca, ' ', v.modelo) AS vehiculo_alquilado, 
                u.empleado_id AS nombre_empleado, 
                a.fecha_inicio, 
                a.fecha_fin
            FROM 
                alquileres a
            JOIN 
                clientes c ON a.usuario_id = c.id
            JOIN 
                vehiculos v ON a.vehiculo_id = v.id
            JOIN 
                users u ON a.vendedor_id = u.id
            ORDER BY a.id ASC
        `);
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createAlquiler = async (req: Request, res: Response): Promise<Response> => {
    const { usuario_id, vehiculo_id, vendedor_id, fecha_inicio, fecha_fin } = req.body;

    if (usuario_id && vehiculo_id && vendedor_id && fecha_inicio && fecha_fin) {
        try {
            // Verificar si el cliente existe
            const clienteExists = await pool.query('SELECT * FROM clientes WHERE id = $1', [usuario_id]);
            if (clienteExists.rowCount === 0) {
                return res.status(400).json({ message: 'El cliente no existe.' });
            }

            // Verificar si el vehículo existe
            const vehiculoExists = await pool.query('SELECT * FROM vehiculos WHERE id = $1', [vehiculo_id]);
            if (vehiculoExists.rowCount === 0) {
                return res.status(400).json({ message: 'El vehículo no existe.' });
            }

            // Verificar si el vendedor existe
            const vendedorExists = await pool.query('SELECT * FROM users WHERE id = $1', [vendedor_id]);
            if (vendedorExists.rowCount === 0) {
                return res.status(400).json({ message: 'El vendedor no existe.' });
            }

            // Insertar el nuevo alquiler
            await pool.query(
                'INSERT INTO alquileres (usuario_id, vehiculo_id, vendedor_id, fecha_inicio, fecha_fin) VALUES ($1, $2, $3, $4, $5)',
                [usuario_id, vehiculo_id, vendedor_id, fecha_inicio, fecha_fin]
            );
            return res.status(201).json({
                message: 'Alquiler creado con éxito'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear el alquiler' });
        }
    } else {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
};
