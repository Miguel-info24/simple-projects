const display = document.getElementById("modo-display");

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        display.textContent = card.dataset.modo;
    });

    card.addEventListener("mouseleave", () => {
        display.textContent = "";
    });

});



 
