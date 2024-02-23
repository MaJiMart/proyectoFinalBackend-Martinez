import config from './config/config.js';
import app from './app.js';
import { initdb } from './db/mongodb.js';
import { logger } from './config/logger.js';

await initdb();
  
  const PORT = config.port;
  const ENV = config.env;
  
  app.listen(PORT, () => {
    logger.http(`Server running on http://localhost:${PORT} in ${ENV} mode`);
  })