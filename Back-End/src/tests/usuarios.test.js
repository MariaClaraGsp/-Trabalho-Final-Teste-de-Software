import request from 'supertest';
import express from 'express';
import router from '../routes/cadastro.js'; // Adicione .js no final
import * as db from '../db.js'; // use * as para mockar corretamente

jest.mock('../db.js'); // mocka o módulo ESM

const app = express();
app.use(express.json());
app.use(router);

describe('POST /usuarios', () => {
  let executeMock;

  beforeEach(() => {
    executeMock = jest.fn();
    db.getConnection.mockReturnValue({ execute: executeMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('400 quando faltar algum campo', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João', email: '' }); // senha ausente

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ mensagem: "Todos os campos são obrigatórios." });
  });

  test('500 quando não conectar ao banco', async () => {
    db.getConnection.mockReturnValue(null);

    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João', email: 'joao@email.com', senha: '123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ mensagem: "Erro ao conectar ao banco de dados." });
  });

  test('500 quando erro na query', async () => {
    executeMock.mockImplementation((query, params, callback) => {
      callback(new Error('Erro simulado'), null);
    });

    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João', email: 'joao@email.com', senha: '123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ mensagem: "Erro ao salvar o usuário." });
  });

  test('500 quando insertId não estiver presente', async () => {
    executeMock.mockImplementation((query, params, callback) => {
      callback(null, {});
    });

    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João', email: 'joao@email.com', senha: '123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ mensagem: "Falha ao obter ID do usuário inserido." });
  });

  test('201 quando usuário for salvo com sucesso', async () => {
    executeMock.mockImplementation((query, params, callback) => {
      callback(null, { insertId: 99 });
    });

    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João', email: 'joao@email.com', senha: '123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      mensagem: "Usuário salvo com sucesso!",
      id: 99
    });
  });

  test('500 quando ocorre exceção no try', async () => {
    db.getConnection.mockImplementation(() => {
      throw new Error('Exceção simulada');
    });

    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'João', email: 'joao@email.com', senha: '123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ mensagem: "Erro interno do servidor." });
  });
});
