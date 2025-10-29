const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const lights = document.querySelectorAll(".light");
const message = document.getElementById("message");

let canClick = false;
let startTime;
let timeoutId;

// Démarrer le jeu
startBtn.addEventListener("click", startTimer);
restartBtn.addEventListener("click", restartGame);
document.body.addEventListener("click", handleClick);

// Fonction pour démarrer le timer
function startTimer() {
    message.textContent = "";
    lights.forEach(l => l.classList.remove("on", "green"));
    startBtn.disabled = true;
    canClick = false;

    // Allume les feux rouges un par un
    lights.forEach((light, i) => {
        setTimeout(() => light.classList.add("on"), i * 300);
    });

    // Passage au vert après un délai aléatoire
    const randomDelay = 2000 + Math.random() * 2000; // 2 à 4 sec
    timeoutId = setTimeout(() => {
        lights.forEach(l => l.classList.remove("on"));
        lights.forEach(l => l.classList.add("green"));
        startTime = Date.now();
        canClick = true;
    }, lights.length * 300 + randomDelay);
}

// Fonction pour gérer le clic du joueur
function handleClick(e) {
    if (e.target === startBtn || e.target === restartBtn) return;

    if (!canClick && startBtn.disabled) {
        message.textContent = "Attention !! Faux départ !";
        resetGame();
    } else if (canClick) {
        const reaction = Date.now() - startTime;
        message.textContent = ` Votre temps de réaction : ${reaction} ms`;
        resetGame();
    }
}

// --------------------------Réinitialiser le jeu------------------------
function resetGame() {
    canClick = false;
    startBtn.disabled = false;
    lights.forEach(l => l.classList.remove("on", "green"));
    clearTimeout(timeoutId); // annule le timer
}

// -----------------------Bouton Recommencer-------------------
function restartGame() {
    resetGame();
    message.textContent = "";
}
