const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

describe('Buscando productos a partir de una string', () => {
    test('los resultados son devueltos como json', async () => {
        await api
            .get('/api/items?q=celular')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('hay un máximo de 4 resultados', async () => {
        const response = await api.get('/api/items?q=celular');
        expect(response.body.items.length).toBe(4);
    });

    test('la response debe contar con 3 properties: author, categories, items', async () => {
        const response = await api.get('/api/items?q=celular');

        expect(response.body.author).toBeDefined();
        expect(response.body.categories).toBeDefined();
        expect(response.body.items).toBeDefined();
    });
});

describe('Buscando productos por id', () => {
    test('los resultados son devueltos como json', async () => {
        await api
            .get('/api/items/MLA628763326')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('la response debe contar con 2 properties: author, item', async () => {
        const response = await api.get('/api/items/MLA628763326');

        expect(response.body.author).toBeDefined();
        expect(response.body.item).toBeDefined();
    });
});