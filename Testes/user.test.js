const request = require('supertest');
const app = require('../server'); // ajuste o caminho conforme sua estrutura

describe('Teste da rota /ping', () => {
  it('Deve responder com status 200 e mensagem pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('pong');
  });
});

//supertest

test('1 + 1 = 2', () => {

expect(1 + 1).toBe(2);

});
//teste unitario