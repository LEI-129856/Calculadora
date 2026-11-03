const prompt = require('prompt-sync')();

function verifyInput(num1, num2, operador) {
  if (isNaN(num1) || isNaN(num2)) throw new Error('Por favor, insira números válidos.');
  if (!['+', '-', '*', '/'].includes(operador)) throw new Error('Operador não válido. Por favor, use +, -, * ou /.');
  if (operador === '/' && num2 === 0) throw new Error('Erro: Divisão por zero');
  return true;
}

function calcular(num1, num2, operador) {
  switch (operador) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
  }
}

function main() {
  const num1 = parseFloat(prompt('Digite o primeiro número:'));
  const num2 = parseFloat(prompt('Digite o segundo número:'));
  const operador = prompt('Digite o operador (+, -, *, /):');
  try {
    verifyInput(num1, num2, operador);
    const resultado = calcular(num1, num2, operador);
    console.log(`Resultado: ${resultado}`);
  } catch (error) {
    console.error(error.message);
  }
} 