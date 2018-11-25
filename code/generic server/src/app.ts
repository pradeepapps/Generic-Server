import Server from './server/server';
import * as CONFIG from './server/config.json';
import logger from './diagnostic/logger';

Server.listen(CONFIG.express_server.port, CONFIG.express_server.ip,  (data) => {
    logger.info('EXRESS SERVER: ' + CONFIG.express_server.ip + ':' +  CONFIG.express_server.port);
});
