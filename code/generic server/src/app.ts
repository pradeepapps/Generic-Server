import { Config } from './server/config';
import Server from './server/server';
import logger from './diagnostic/logger';

Server.listen(Config.EXPRESS_SERVER.port, Config.EXPRESS_SERVER.ip,  () => {
    logger.info('EXRESS SERVER: ' + Config.EXPRESS_SERVER.ip + ':' +  Config.EXPRESS_SERVER.port);
});
