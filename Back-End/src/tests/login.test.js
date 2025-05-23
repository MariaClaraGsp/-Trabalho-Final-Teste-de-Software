const request = require('supertest');
const express = require('express');
const { router } = require('../routes/login');
const db = require('../db');

jest.mock('../db');

const app = express();
app.use(express.json());
app.use(router);

describe('POST /login', () => {
  let executeMock;

  beforeEach(() => {
    executeMock = jest.fn();
    db.getConnection.mockReturnValue({ execute: executeMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar 400 se email ou senha não forem fornecidos', async () => {
    const res = await request(app).post('/login').send({ email: '', senha: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ mensagem: "E-mail e senha são obrigatórios." });
  });

  it('Deve retornar 500 se ocorrer erro no banco de dados', async () => {
    executeMock.mockImplementation((query, params, callback) => {
      callback(new Error('Erro simulado'), null, null);
    });

    const res = await request(app)
      .post('/login')
      .send({ email: 'teste@email.com', senha: '1234' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ mensagem: "Erro ao verificar login." });
  });

  it('Deve retornar 401 se email ou senha inválidos (resultado vazio)', async () => {
    executeMock.mockImplementation((query, params, callback) => {
      callback(null, [], null);
    });

    const res = await request(app)
      .post('/login')
      .send({ email: 'teste@email.com', senha: '1234' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ sucesso: false, mensagem: "E-mail ou senha inválidos." });
  });

  it('Deve retornar 200 e dados do usuário se login for bem-sucedido', async () => {
    const fakeUser = { id: 1, nome: 'Usuário Teste', email: 'teste@email.com' };

    executeMock.mockImplementation((query, params, callback) => {
      callback(null, [fakeUser], null);
    });

    const res = await request(app)
      .post('/login')
      .send({ email: 'teste@email.com', senha: '1234' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      sucesso: true,
      mensagem: "Login bem-sucedido",
      usuario: fakeUser
    });
  });
});
