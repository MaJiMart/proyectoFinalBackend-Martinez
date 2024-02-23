import config from '../config/config.js';
import mongoose from "mongoose";
import { logger } from '../config/logger.js';


export const URI = config.mongodbUri;

export const initdb = async () => {
    try {
        await mongoose.connect(URI);
        logger.info('Database connected 🗄️');
    } catch (error) {
        logger.error('Database error connection', error.message);
    }
};