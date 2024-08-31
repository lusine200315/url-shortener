const express = require('express');
const UrlsService = require('../services/urls');
const CachesService = require('../services/cache');
const body_parser = require('body-parser');

const urlsRouter = express.Router();

urlsRouter.use(body_parser.json());

urlsRouter.post('/', async(req, res) => {
    try {
        const url = req?.body?.url;

        if(!url?.trim()) {
            return res.status(401).json({message: 'URL required'});
        };

        let result = await CachesService.getFromCache(url);

        if(result) {
            return res.json({message: "url already exist"});
        };
        
        result = await UrlsService.getUrl(result);

        if(result) {
            return res.json({message: "url already exist"});
        };
        
        result = await UrlsService.setUrl(url);
        await CachesService.setInCache(url, JSON.stringify({
            originalUrl: result.originalUrl,
            generatedUrl: result.generatedUrl
        }));
        res.status(201).json({"shortedUrl": result.generatedUrl});

    } catch(error) {
        console.error(error);
        throw new Error(error);
    };
});

urlsRouter.get('/:url', async(req, res) => {
    try {
        const url = req?.params?.url;

        if(!url) {
            return res.status(404).json({message: "Shorten url is required"});
        };
        
        let result = await CachesService.getFromCache(url);

        if(result) {
            return res.redirect(result);
        };

        result = await UrlsService.getUrl(url);

        if(result) {
            const originalUrl = result?.originalUrl;
            await CachesService.setInCache(url, originalUrl);
            return res.redirect(originalUrl);
        } else {
            res.status(404).json({message: "Url not found"});
        };

    } catch(error) {
        console.error(error);
        throw new Error(error);
    }
});

module.exports = urlsRouter;