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
exports.actualizarCliente = exports.borrarCliente = exports.createVehiculo = exports.getVehiculos = void 0;
const db_connect_1 = __importDefault(require("../database/db_connect"));
require('dotenv').config();
const getVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM vehiculos');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getVehiculos = getVehiculos;
const createVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca, modelo, anio, color, tipo_motor, precio_alquiler_diario } = req.body;
    // Validar que los campos no estén vacíos o nulos
    if (marca && modelo && anio && color && tipo_motor && precio_alquiler_diario) {
        try {
            // Inserción de todos los valores correspondientes a las columnas
            yield db_connect_1.default.query('INSERT INTO vehiculos (marca, modelo, anio, color, tipo_motor, precio_alquiler_diario) VALUES ($1, $2, $3, $4, $5, $6)', [marca, modelo, anio, color, tipo_motor, precio_alquiler_diario]);
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
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    else {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
});
exports.createVehiculo = createVehiculo;
const borrarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield db_connect_1.default.query('DELETE FROM clientes WHERE id = $1', [id]);
        return res.status(200).json(`El cliente con el id ${id} fue borrado con éxito.`);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.borrarCliente = borrarCliente;
const actualizarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nameUser, emailUser } = req.body;
    try {
        yield db_connect_1.default.query('UPDATE clientes SET nombre_cliente = $1, correo_cliente = $2 WHERE id = $3', [nameUser, emailUser, id]);
        return res.json({
            message: `El cliente con el id ${id} fue actualizado con éxito.`,
            cliente: {
                id,
                nameUser,
                emailUser
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.actualizarCliente = actualizarCliente;
