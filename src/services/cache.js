const { client } = require('../core/db');

class CachesService {
    static async setInCache(key, value) {
        if (!key || !value) {
            return null;
        };

        try {
            return await client.set(key, value);
        } catch (error) {
            console.error(error);
            throw new Error;
        };
    }
    static async getFromCache(key) {
        try {
            if(!key) {
                return null
            } else {
                return await client.get(key);
            };
        } catch (error) {
            console.log(error);
            throw new Error;
        };
    };
};

module.exports = CachesService;