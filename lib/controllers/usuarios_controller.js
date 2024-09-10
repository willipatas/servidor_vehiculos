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
exports.actualizarCliente = exports.borrarCliente = exports.createUser = exports.getClientesById = exports.getClientes = exports.getEmpleados = exports.authenticateToken = exports.generateToken = void 0;
const db_connect_1 = __importDefault(require("../database/db_connect"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const generateToken = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.empleado_id;
    const password = req.body.contrasena;
    const query = yield db_connect_1.default.query('SELECT * FROM users WHERE empleado_id = $1 AND contrasena = $2', [userName, password]);
    const user = query.rows[0];
    if (query.rowCount !== null && query.rowCount > 0) {
        const accessToken = jsonwebtoken_1.default.sign(user, `${process.env.CLAVE_JWT}`, { expiresIn: '1h' });
        return response.status(200).json({ accessToken });
    }
    else {
        return response.status(400).json('User Not found');
    }
});
exports.generateToken = generateToken;
const authenticateToken = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token no encontrado' });
    }
    jsonwebtoken_1.default.verify(token, `${process.env.CLAVE_JWT}`, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalido' });
        }
    });
    next();
};
exports.authenticateToken = authenticateToken;
const getEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM users ORDER BY id ASC');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getEmpleados = getEmpleados;
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM clientes ORDER BY id ASC');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getClientes = getClientes;
const getClientesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM clientes WHERE id = $1', [id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getClientesById = getClientesById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena } = req.body;
    // Validar que los campos no estén vacíos o nulos
    if (nombre_cliente && correo_cliente && telefono_cliente && direccion_cliente && ciudad_cliente && contrasena) {
        try {
            // Inserción de todos los valores correspondientes a las columnas
            yield db_connect_1.default.query('INSERT INTO clientes (nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena) VALUES ($1, $2, $3, $4, $5, $6)', [nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena]);
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
exports.createUser = createUser;
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
    const { nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena } = req.body;
    try {
        yield db_connect_1.default.query('UPDATE clientes SET nombre_cliente = $1, correo_cliente = $2, telefono_cliente = $3, direccion_cliente = $4, ciudad_cliente = $5, contrasena = $6 WHERE id = $7', [nombre_cliente, correo_cliente, telefono_cliente, direccion_cliente, ciudad_cliente, contrasena, id]);
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.actualizarCliente = actualizarCliente;
