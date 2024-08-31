const UrlModel = require('../model/urls');

class UrlsService {
    static async setUrl(originalUrl) {
        if(!originalUrl) {
            return null;
        };

        const generatedUrl = Math.random().toString(36).substr(2, 6);

        const result =  await new UrlModel({originalUrl, generatedUrl});
        
        if(!result) {
            return result.status(500).json({message: 'Internal Server Error'});
        }
        return result.save();
    };

    static async getUrl(url) {
        if(!url) {
            return null;
        };

        const result = await UrlModel.findOne({generatedUrl: url});
        
        if(!result) {
            return null;
        }
        return result;
    };
}

module.exports = UrlsService;