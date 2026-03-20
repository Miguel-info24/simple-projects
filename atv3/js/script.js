document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const tema = params.get("tema");


    const imagens = {
        carro: [
            "img-memory/carro/carro01.png",
            "img-memory/carro/carro02.png",
            "img-memory/carro/carro03.png",
            "img-memory/carro/carro04.png"
        ],
        jetski: [
            "img-memory/jetski/jet01.png",
            "img-memory/jetski/jet02.png",
            "img-memory/jetski/jet03.png",
            "img-memory/jetski/jet04.png"
        ],
        moto: [
            "img-memory/moto/moto01.png",
            "img-memory/moto/moto02.png",
            "img-memory/moto/moto03.png",
            "img-memory/moto/moto04.png"
        ]
    };

    let imagensEscolhidas = imagens[tema];

    let cartasArray = [...imagensEscolhidas, ...imagensEscolhidas];
    cartasArray.sort(() => Math.random() - 0.5);

    const container = document.getElementById("game-container");

    let primeiraCarta = null;
    let segundaCarta = null;
    let bloqueado = false;

    cartasArray.forEach(src => {

        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.imagem = src;

        const frente = document.createElement("div");
        frente.classList.add("face", "front");

        const img = document.createElement("img");
        img.src = src;
        frente.appendChild(img);

        const verso = document.createElement("div");
        verso.classList.add("face", "back");

        carta.appendChild(frente);
        carta.appendChild(verso);

        carta.addEventListener("click", () => {

            if (bloqueado) return;
            if (carta === primeiraCarta) return;

            carta.classList.add("flip");

            if (!primeiraCarta) {
                primeiraCarta = carta;
            } else {
                segundaCarta = carta;
                bloqueado = true;

                if (primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem) {
                    primeiraCarta = null;
                    segundaCarta = null;
                    bloqueado = false;
                } else {
                    setTimeout(() => {
                        primeiraCarta.classList.remove("flip");
                        segundaCarta.classList.remove("flip");

                        primeiraCarta = null;
                        segundaCarta = null;
                        bloqueado = false;
                    }, 1000);
                }
            }
        });

        container.appendChild(carta);
    });

});