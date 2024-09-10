"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlquiler = exports.getAlquileres = void 0;
const db_connect_1 = __importDefault(require("../database/db_connect"));
// Obtener todos los alquileres con información combinada
const getAlquileres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query(`
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAlquileres = getAlquileres;
const createAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, vehiculo_id, vendedor_id, fecha_inicio, fecha_fin } = req.body;
    if (usuario_id && vehiculo_id && vendedor_id && fecha_inicio && fecha_fin) {
        try {
            // Verificar si el cliente existe
            const clienteExists = yield db_connect_1.default.query('SELECT * FROM clientes WHERE id = $1', [usuario_id]);
            if (clienteExists.rowCount === 0) {
                return res.status(400).json({ message: 'El cliente no existe.' });
            }
            // Verificar si el vehículo existe
            const vehiculoExists = yield db_connect_1.default.query('SELECT * FROM vehiculos WHERE id = $1', [vehiculo_id]);
            if (vehiculoExists.rowCount === 0) {
                return res.status(400).json({ message: 'El vehículo no existe.' });
            }
            // Verificar si el vendedor existe
            const vendedorExists = yield db_connect_1.default.query('SELECT * FROM users WHERE id = $1', [vendedor_id]);
            if (vendedorExists.rowCount === 0) {
                return res.status(400).json({ message: 'El vendedor no existe.' });
            }
            // Insertar el nuevo alquiler
            yield db_connect_1.default.query('INSERT INTO alquileres (usuario_id, vehiculo_id, vendedor_id, fecha_inicio, fecha_fin) VALUES ($1, $2, $3, $4, $5)', [usuario_id, vehiculo_id, vendedor_id, fecha_inicio, fecha_fin]);
            return res.status(201).json({
                message: 'Alquiler creado con éxito'
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear el alquiler' });
        }
    }
    else {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
});
exports.createAlquiler = createAlquiler;
