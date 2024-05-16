import express, { NextFunction, Request, Response } from "express";
import ErrorMiddleware from "./middleware/error";
import cors from "cors";
import envConfig from "./config/envConfig";

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: envConfig.frontendDomain,
  })
);
app.use(express.json());

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Grocery shop apis" });
});

// unknown route
app.get("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  err.statusCode = 404;
  next(err);
});

// GLOBAL ERROR HANDLER
app.use(ErrorMiddleware);

export default app;
