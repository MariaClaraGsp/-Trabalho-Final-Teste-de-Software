import { fazerLogin } from "./login";

global.fetch = jest.fn();

describe("fazerLogin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar sucesso quando o login for válido", async () => {
    const mockResponse = {
      sucesso: true,
      usuario: { nome: "João" }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await fazerLogin("joao@email.com", "123456");

    expect(fetch).toHaveBeenCalledWith("http://192.168.1.10:3000/api/login", expect.any(Object));
    expect(result.status).toBe(true);
    expect(result.data).toEqual(mockResponse);
  });

  it("deve retornar erro quando o login falhar", async () => {
    const mockResponse = {
      sucesso: false,
      mensagem: "Credenciais inválidas"
    };

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockResponse
    });

    const result = await fazerLogin("email@invalido.com", "errado");

    expect(result.status).toBe(false);
    expect(result.data).toEqual(mockResponse);
  });

  it("deve lançar erro quando o servidor estiver indisponível", async () => {
    fetch.mockRejectedValueOnce(new Error("Falha na conexão"));

    await expect(fazerLogin("teste@email.com", "123456")).rejects.toThrow("Falha na conexão");
  });
});
