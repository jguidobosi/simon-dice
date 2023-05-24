$startButton = document.querySelector("#start-button");
$gameBoard = document.querySelector("#game-board");
$finalAlert = document.querySelector("#final");
let $systemSequence = [];
let $userSequence = [];

function startGame() {

    $userSequence = [];
    $systemSequence = [];
    $finalAlert.classList.add("hidden");

    systemTurn();
}
function systemTurn() {

    document.querySelector("#turno").textContent = "Turno de la computadora.";
    
    $systemSequence.push(generateRandomBox());
    
    lockGameBoard();

    for (let i = 0; i < $systemSequence.length; i++) {

        if (i === ($systemSequence.length - 1)) {

            setTimeout(lightOnBox, (i + 1) * 1000, $systemSequence[i]);
            setTimeout(playerTurn, (i + 1) * 1000 + 1000);

        } else if (i < $systemSequence.length) {

            setTimeout(lightOnBox, (i + 1) * 1000, $systemSequence[i]);

        }
    }
}
function playerTurn() {
    
    document.querySelector("#turno").textContent = "Tu turno!";
    $userSequence = [];

    unlockGameBoard();

}
function compareSequences() {

    if ($systemSequence.length === $userSequence.length && $userSequence[$userSequence.length - 1] === $systemSequence[$userSequence.length - 1]) {

        systemTurn();

    }
    if ($userSequence[$userSequence.length - 1] !== $systemSequence[$userSequence.length - 1]) {

        endGame();

    }

}
function lightOnBox($box) {

    $box.style.opacity = "100";

    setTimeout(function () {
        $box.style.opacity = "50%"
    }, 500);

}
function generateRandomBox() {

    let index = Math.floor(Math.random() * 4);

    return document.querySelectorAll(".box")[index];

}
function lockGameBoard() {

    $gameBoard.onclick = function () {
    }
}
function unlockGameBoard() {

    $gameBoard.onclick = function (event) {

        $userSequence.push(event.target);
        lightOnBox(event.target);
        compareSequences();

    }

}
function endGame(){

    document.querySelectorAll(".box").forEach(function($box) {
        lightOnBox($box);          
    });

    $finalAlert.innerText = (`Tu puntaje es de ${$systemSequence.length - 1} puntos`);
    document.querySelector("#turno").textContent = "Perdiste.";
    $startButton.textContent = "Jugar de nuevo";

    $finalAlert.classList.remove("hidden");    

    lockGameBoard();

}

$startButton.onclick = startGame;
