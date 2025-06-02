import request from 'supertest';
import app from '../app.js';

describe('Testes de cobertura para app.js', () => {
  test('GET /ping deve retornar pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'pong' });
  });

  test('GET /api (rota via rotas index.js) deve responder', async () => {
    const res = await request(app).get('/api'); // ou algum endpoint definido em rotas/index.js
    expect(res.statusCode).not.toBe(404); // apenas garantir que foi chamada
  });
   test('GET /api deve retornar rota raiz funcionando', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'rota raiz funcionando' });
  });
});
