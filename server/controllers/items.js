const itemsRouter = require('express').Router();
const axios = require('axios');
const config = require('../utils/config');
const helpers = require('../utils/helpers');

const SEARCH_RESULTS_LIMIT = 4;

const apiInstance = axios.create({
    baseURL: config.ML_API_URL,
});

itemsRouter.get('/', async(request, response, next) => {
    try {
        const query = request.query.q;
        const results = await apiInstance.get(`sites/MLA/search?q=${query}&limit=${SEARCH_RESULTS_LIMIT}`);
        const categories = results.data.filters.find(filter => filter.id === 'category');
        const formatedResponse = helpers.formatSearchQuery(results.data.results, categories);
        response.status(200).json(formatedResponse);
    } catch (err) {
        next(err);
    }

});

itemsRouter.get('/:id', async(request, response, next) => {
    const id = request.params.id;
    if(!helpers.isValidId(id)) {
        next({
            name: 'ValidationError',
            message: 'invalid id'
        });
    } else {
        try {
            const result = await apiInstance.get(`items/${id}`);
            const description =  await apiInstance.get(`items/${id}/description`);
            const formatedResponse = helpers.formatIdQuery(result.data, description.data);
            response.status(200).json(formatedResponse);
        } catch (err) {
            next(err);
        }
    }

});

module.exports = itemsRouter;