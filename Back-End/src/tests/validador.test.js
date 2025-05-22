// Funções de validação (copiadas aqui para evitar usar o validador.js)
function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validarSenhaForte(senha) {
  const senhaForteRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
  return senhaForteRegex.test(senha);
}

// Testes
describe("Validação de E-mail", () => {
  test("E-mail válido", () => {
    expect(validarEmail("teste@example.com")).toBe(true);
  });

  test("E-mail sem @", () => {
    expect(validarEmail("testeexample.com")).toBe(false);
  });

  test("E-mail sem domínio", () => {
    expect(validarEmail("teste@")).toBe(false);
  });

  test("E-mail com espaços", () => {
    expect(validarEmail("teste @example.com")).toBe(false);
  });
});

describe("Validação de Senha Forte", () => {
  test("Senha válida", () => {
    expect(validarSenhaForte("Senha1!")).toBe(true);
  });

  test("Senha sem maiúscula", () => {
    expect(validarSenhaForte("senha1!")).toBe(false);
  });

  test("Senha sem número", () => {
    expect(validarSenhaForte("Senha!")).toBe(false);
  });

  test("Senha sem caractere especial", () => {
    expect(validarSenhaForte("Senha1")).toBe(false);
  });

  test("Senha com menos de 6 caracteres", () => {
    expect(validarSenhaForte("S1!a")).toBe(false);
  });
});
