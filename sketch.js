let florEmoji = "🌸"; // Emoji de flor
let fazendeiro;
let flores = [];
let qualidadeDoAr = 0; // Começa com o ar muito poluído (0)
let totalFlores = 0;
let jogoEncerrado = false;
let venceu = false; // Variável para controlar se venceu o jogo
let tempoUltimoClique = 0; // Tempo do último clique do mouse

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(32);
  fazendeiro = new Fazendeiro(width / 2, height - 40);
}

function draw() {
  if (jogoEncerrado) {
    return; // Se o jogo foi encerrado, não faz mais nada
  }

  // Checar o tempo entre cliques
  let tempoAtual = millis(); // Tempo em milissegundos desde que o programa iniciou
  if (tempoAtual - tempoUltimoClique > 1000 && totalFlores > 0) {
    // Se o tempo entre cliques for maior que 1 segundo, o jogo termina
    jogoEncerrado = true;
    mostrarMensagemFinal("⏳ Você demorou demais para plantar uma flor!");
  }

  // O fundo começa em cinza e vai para verde à medida que a qualidade do ar melhora
  let corFundo = lerpColor(color(150, 150, 150), color(0, 200, 0), map(qualidadeDoAr, 0, 100, 0, 1));
  background(corFundo);

  mostrarInformacoes();

  // A qualidade do ar melhora mais lentamente conforme as flores são plantadas
  qualidadeDoAr += 0.005; // A poluição cresce mais lentamente
  qualidadeDoAr += totalFlores * 0.01; // A cada flor plantada, a qualidade do ar melhora um pouco

  // Limitar a qualidade do ar entre 0 e 100
  qualidadeDoAr = constrain(qualidadeDoAr, 0, 100);

  fazendeiro.mostrar();

  // Plantar flores continuamente ao clicar
  if (mouseIsPressed) {
    flores.push(new Flor(mouseX, mouseY));
    totalFlores++;
    tempoUltimoClique = tempoAtual; // Atualiza o tempo do último clique
  }

  flores.forEach((flor) => flor.mostrar());

  verificarEstadoDoJogo();
}

// Exibe qualidade do ar e flores plantadas
function mostrarInformacoes() {
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("🌫️ Qualidade do Ar: " + qualidadeDoAr.toFixed(1), 10, 20);
  text("🌸 Flores Plantadas: " + totalFlores, 10, 40);
}

// Verifica vitória ou derrota
function verificarEstadoDoJogo() {
  if (qualidadeDoAr <= 0) {
    jogoEncerrado = true;
    mostrarMensagemFinal("💀 O ar está poluído demais!");
  } else if (qualidadeDoAr >= 80 && !venceu) {
    venceu = true;  // Garante que a mensagem só apareça uma vez
    jogoEncerrado = true; // O jogo acaba quando a vitória é alcançada
    mostrarMensagemFinal("🎉 Parabéns! Você limpou o ar!");
  }
}

// Exibe mensagem de fim de jogo
function mostrarMensagemFinal(msg) {
  noLoop(); // Interrompe o jogo
  fill("white");
  textSize(32);
  textAlign(CENTER, CENTER);
  text(msg, width / 2, height / 2); // Exibe a mensagem no centro da tela
}

// Classe do fazendeiro
class Fazendeiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  mostrar() {
    textSize(32);
    text(florEmoji, this.x, this.y); // Fazendeiro usando o emoji de flor
  }
}

// Classe da flor
class Flor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  mostrar() {
    // Flor simples representada por um círculo
    fill("pink");
    ellipse(this.x, this.y, 20, 20);
    stroke("green");
    line(this.x, this.y + 10, this.x, this.y + 20); // Caules
  }
}
