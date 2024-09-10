"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = require("./middleware/error");
const user_routes_1 = require("./routes/user_routes");
const vehiculos_routes_1 = require("./routes/vehiculos_routes");
const alquiler_routes_1 = require("./routes/alquiler_routes");
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(error_1.errorHandler);
app.use(user_routes_1.userRoutes);
app.use(vehiculos_routes_1.vehiculosRoutes);
app.use(alquiler_routes_1.alquilerRoutes);
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`Se ha iniciado en el puerto ${port}`);
});
