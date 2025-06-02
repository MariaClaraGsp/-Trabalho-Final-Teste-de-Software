const request = require('supertest');
const app = require('../app'); // Corrigido aqui
const { connectToDatabase, closeDatabaseConnection } = require('../db');

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

describe('Teste da rota /ping', () => {
  it('Deve responder com status 200 e mensagem pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('pong');
  });
});

test('1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});
