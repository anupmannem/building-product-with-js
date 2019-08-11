/**
 * if async(req, res) does not await or 
 * not return, then it will silently die
 * without any log. Which will be hard 
 * to trace. This helper function useful
 * to catch the error
 */

import {logger} from './logger';

export const asyncRequest = (handler) => (req, res) => {
    handler(req, res).catch(e => logger.error('error during request: ', e));
}
