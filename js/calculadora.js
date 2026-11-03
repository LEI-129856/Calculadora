const ecra = document.getElementById('resultado');
let resultadoMostrado = false;

function adicionarParentese() {
  const texto = ecra.textContent;
  const abertos = texto.split('(').length - 1;
  const fechados = texto.split(')').length - 1;
  const ultimoFechaValor = /[0-9)]/.test(texto.slice(-1));

  if (abertos > fechados && ultimoFechaValor) adicionar(')');
  else if (ultimoFechaValor) adicionar('*(');
  else adicionar('(');
}

function adicionar(texto) {
  if (ecra.textContent === 'Erro') limpar();
  if (resultadoMostrado && /[\d.]/.test(texto)) limpar();
  resultadoMostrado = false;
  ecra.textContent += texto;
  ecra.scrollLeft = ecra.scrollWidth;
}

function limpar() {
  ecra.textContent = '';
  resultadoMostrado = false;
}

function apagar() {
  if (ecra.textContent === 'Erro') {
    limpar();
    return;
  }
  ecra.textContent = ecra.textContent.slice(0, -1);
  resultadoMostrado = false;
}

document.addEventListener('keydown', (event) => {
  const tecla = event.key;

  // Aceita números (0-9), operadores (+, -, *, /, ^), ponto e parênteses
  if (/[\d.+\-*/^()]/.test(tecla)) {
    adicionar(tecla);
  } 
  // Tecla Enter ou sinal de igual para calcular
  else if (tecla === 'Enter' || tecla === '=') {
    event.preventDefault(); // Evita ação padrão do navegador
    calcularResultado();
  } 
  // Tecla Backspace para apagar o último caráter
  else if (tecla === 'Backspace') {
    apagar();
  } 
  // Tecla Escape ou a letra "c" para limpar tudo
  else if (tecla === 'Escape' || tecla.toLowerCase() === 'c') {
    limpar();
  }
});

function calcularResultado() {
  try {
    const expressao = ecra.textContent
      .replace(/(?<![\d.])0+(?=\d)/g, '')
      .replaceAll('^', '**');
    const resultado = eval(expressao);
    if (!Number.isFinite(resultado)) throw new Error('Resultado inválido');
    ecra.textContent = Number(resultado.toFixed(10));
    resultadoMostrado = true;
  } catch (error) {
    ecra.textContent = 'Erro';
  }
}