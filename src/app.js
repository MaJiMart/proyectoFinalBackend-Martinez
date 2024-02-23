import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';
import { initPassport } from './config/passport.config.js';
import { __dirname, COOKIE_SECRET, Exception } from './utilities.js';
import { addLogger, logger } from './config/logger.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
/* Views */
import indexRouter from './routers/views/indexRouter.js';
import registerRouter from './routers/views/registerRouter.js';
/* Apis */
import authApiRouter from './routers/api/authApiRouter.js';
import usersApiRouter from './routers/api/usersApiRouter.js';
import productsApiRouter from './routers/api/productsApiRouter.js';
import cartsApiRouter from './routers/api/cartsApiRouter.js';
import notificationsApiRouter from './routers/api/notificationsApiRouter.js';
import recoveryPassApiRouter from './routers/api/recoveryPassApiRouter.js';
/* Mock */
import mockprodApiRouter from './mock/mockprodApiRouter.js';
/* Logger Test*/
import loggersApiRouter from './routers/api/loggersApiRouter.js';

const app = express();

/* const corsOpts = {
  origin: 'http://localhost:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
} */

/* app.use(cors(corsOpts)); */
app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser(COOKIE_SECRET));

initPassport();
app.use(passport.initialize());

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Ecommerce API',
      description: 'Ecommerce Project API Documentation. IMPORTANT Most of these routes require authorization and authentication via token to be used',
    },
  },
  apis: [path.join(__dirname, '.', 'docs', '**', '*.yaml')],
};

const specs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', indexRouter, registerRouter, mockprodApiRouter, loggersApiRouter);
app.use('/api', productsApiRouter, cartsApiRouter, authApiRouter, usersApiRouter, notificationsApiRouter, recoveryPassApiRouter);

app.use((error, req, res, next) => {
  if (error instanceof Exception) {
    res.status(error.status).json({ status: 'error', message: error.message });
  } else {
    const message = `Ups! An unknown error occurred: ${error.message}, sorry`;
    logger.error(message);
    res.status(500).json({ status: 'error', message });
  }
});

export default app;
