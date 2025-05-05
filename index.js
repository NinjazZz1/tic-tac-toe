function Player (name, marker) {
    this.name = name;
    this.marker = marker;

    this.sayName = function() {
        console.log(this.name, this.marker)
    };
}

const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const add = ((marker, position) => board[position] = marker);

    let clear = function() { 
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { add, board, clear };
})();

const GameController = (function () {
    // let currentPlayer;

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

    function setPlayer(player) {
        currentPlayer = player;
    }

    function swapPlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
        currentPlayer = player1;
        }     
    }

    function playRound(position) {
        const marker = currentPlayer.marker;
        if (Gameboard.board[position] === "") {
            Gameboard.add(marker, position);
            CheckWin();
            swapPlayer();
            console.log(Gameboard.board)
        } else {
            console.log("Cannot place here!");
        }
    }

    function CheckWin() {
        for (let i = 0; i < winCondition.length; i++) {
            let checker = 0;
            for (let j = 0; j < winCondition[i].length; j++) {
                const pos = winCondition[i][j];
                if (Gameboard.board[pos] === currentPlayer.marker) {
                    checker++;
                    console.log(checker);
                }
                if (checker === 3) {
                    console.log("You Win")
                    Gameboard.clear();
                }
            }
            checker = 0;
        }
    }
    return { setPlayer, playRound };
})();

// Gameboard.add("X", 0);

const player1 = new Player('You', 'X');
const player2 = new Player('Computer', 'O');

GameController.setPlayer(player1);

///////////////////////////////////////////////////////
