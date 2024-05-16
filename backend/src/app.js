"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = __importDefault(require("./middleware/error"));
const cors_1 = __importDefault(require("cors"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
const groceryItem_route_1 = __importDefault(require("./routes/groceryItem.route"));
const salesRecord_route_1 = __importDefault(require("./routes/salesRecord.route"));
const app = (0, express_1.default)();
// MIDDLEWARES
app.use((0, cors_1.default)({
    origin: envConfig_1.default.frontendDomain,
}));
app.use(express_1.default.json());
// ROUTES
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Grocery shop apis" });
});
app.use("/api/v1/grocery", groceryItem_route_1.default);
app.use("/api/v1/sales", salesRecord_route_1.default);
// unknown route
app.get("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found.`);
    err.statusCode = 404;
    next(err);
});
// GLOBAL ERROR HANDLER
app.use(error_1.default);
exports.default = app;
