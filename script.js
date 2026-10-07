const imagens = [
    { img: "img/BEATRICE.JPG" },
    { img: "img/echidna.png" },
    { img: "img/emilia.jpg" },
    { img: "img/esdeath.jpeg" },
    { img: "img/pm.jpg" },
    { img: "img/REINHARD.JPG" },
    { img: "img/ren.png" },
    { img: "img/suba.jpg" }
];

let cartas = [];
let cartasViradas = [];
let paresEncontrados = 0;
let tentativas = 0;
let bloqueado = false;

function embaralhar(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function criarTabuleiro() {
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = "";
    cartasViradas = [];
    paresEncontrados = 0;
    tentativas = 0;
    bloqueado = false;
    atualizarContador();

    cartas = embaralhar([...imagens, ...imagens]);

    cartas.forEach((carta, indice) => {
        const elemento = document.createElement('div');
        elemento.classList.add('carta');
        elemento.dataset.indice = indice;
        elemento.innerHTML = `
            <div class="face costas">❓</div>
            <div class="face frente"><img src="${carta.img}" alt="Imagem" loading="lazy"></div>
        `;
        elemento.addEventListener('click', () => virarCarta(indice, elemento));
        tabuleiro.appendChild(elemento);
    });
}

function virarCarta(indice, elemento) {
    if (bloqueado) return;
    if (elemento.classList.contains('virada')) return;
    if (cartasViradas.length >= 2) return;

    elemento.classList.add('virada');
    cartasViradas.push({ indice, elemento });

    if (cartasViradas.length === 2) {
        tentativas++;
        atualizarContador();
        verificarPar();
    }
}

function verificarPar() {
    bloqueado = true;
    const [carta1, carta2] = cartasViradas;
    const img1 = cartas[carta1.indice].img;
    const img2 = cartas[carta2.indice].img;

    if (img1 === img2) {
        paresEncontrados++;
        carta1.elemento.classList.add('par-encontrado');
        carta2.elemento.classList.add('par-encontrado');
        cartasViradas = [];
        bloqueado = false;
        atualizarContador();

        if (paresEncontrados === 8) {
            setTimeout(() => {
                alert(`🎉 Parabéns! Você encontrou todos os pares em ${tentativas} tentativas!`);
            }, 300);
        }
    } else {
        setTimeout(() => {
            carta1.elemento.classList.remove('virada');
            carta2.elemento.classList.remove('virada');
            cartasViradas = [];
            bloqueado = false;
        }, 1200);
    }
}

function atualizarContador() {
    document.getElementById('contador').textContent = tentativas;
    document.getElementById('pares').textContent = paresEncontrados;
}

function reiniciarJogo() {
    criarTabuleiro();
}

document.addEventListener('DOMContentLoaded', criarTabuleiro);
