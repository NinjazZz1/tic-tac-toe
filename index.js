const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

startButton.addEventListener("click", () => {
    Game.start();
})
restartButton.addEventListener("click", () => {
    Game.restart();
})

///////////////////////////////////////////////////////

const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", "",]

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class=cell id="square-${index}">${square}</div>`
        })
        document.querySelector(".cell-container").innerHTML = boardHTML;
        const cells = document.querySelectorAll(".cell");
        cells.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        })
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard,
    }

})();

const createPlayer = (name, marker) => {
    return {
        name,
        marker
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer("Jack", "X"),
            createPlayer("CPU", "O")
        ]

        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const handleClick = (event) => {
        if (gameOver) {
            return;
        }

        let index = parseInt(event.target.id.split("-")[1]);

        if (Gameboard.getGameboard()[index] !== "")
            return;

        Gameboard.update(index, players[currentPlayerIndex].marker);

        if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].marker)) {
            gameOver = true;
            console.log(players[currentPlayerIndex].name + " Won")
        } else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            console.log("Tie!");
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.render();
        gameOver = false;
    }

    return {
        start,
        handleClick, 
        restart,
    }
})();

function checkForWin(board) {
    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell != "");
}
