import logger from '../diagnostic/logger';

class Utility {

    public sendResponse(res, status, data) {

        logger.debug('In sendResponse...');

        res.status(status).send(data);
    }
}

export default new Utility();
