import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import pinohttp from 'pino-http';
import { logger } from "./infrastructure/logger";
import './process';
import { errorHandler } from "./domain/exceptions/error-handler";
import helmet from "helmet";
import compression from "compression";
import { router } from "./presentation/routes";

dotenv.config();

const app = express();
app.use(helmet());
app.use(pinohttp({logger}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
 logger.error(error);
 errorHandler.handleError(error, response);
})

export { app };