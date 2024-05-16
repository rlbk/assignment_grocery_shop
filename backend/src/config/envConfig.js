"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _config = {
    port: process.env.PORT,
    databaseUrl: process.env.MONGO_URI,
    frontendDomain: process.env.FRONTEND_DOMAIN,
};
exports.default = Object.freeze(_config);
