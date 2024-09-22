class Player {

    // Player Constructor
    constructor(name, marker, markerDOM) {
        this.name = name;
        this.marker = marker;
        this.markerDOM = markerDOM
    }

    playerDetails() {
        console.log("Player is " + this.name + " with marker " + this.marker)
    }

}

// Create players
// const player1 = new Player("Tony", "X");
// const player2 = new Player("Renata", "O");
// Prevent objects getting changed
// Object.freeze(player1);
// Object.freeze(player2);

class Gameboard {
    #board = []

    getBoard() {
        console.log(this.#board)
        return this.#board
    }

    playRound(index, selectedPlayerMarker) {
        this.#board[index] = selectedPlayerMarker
    }

}

let player1
let player2


class Gameflow extends Gameboard {

    player1 = new Player (document.getElementById("player1name").value, "X", "icons/alpha-x.svg")
    player2 = new Player (document.getElementById("player2name").value, "O", "icons/alpha-o.svg")    
    

    // Private Variables
    #board = super.getBoard()
    #selectedPlayer = player1
    #whoWentFirst = player1
    #winner
    #player1points = 0
    #player2points = 0
     
    
    playRound(index) {
        super.playRound(index, this.#selectedPlayer.marker)
        super.getBoard()
        // console.log(this.#board)
        this.checkForWinner()
    }

    checkForWinner() {
        if (this.#board[0] == this.#selectedPlayer.marker && this.#board[1] == this.#selectedPlayer.marker&& this.#board[2] == this.#selectedPlayer.marker||
        this.#board[3] == this.#selectedPlayer.marker&& this.#board[4] == this.#selectedPlayer.marker&& this.#board[5] == this.#selectedPlayer.marker||
        this.#board[6] == this.#selectedPlayer.marker&& this.#board[7] == this.#selectedPlayer.marker&& this.#board[8] == this.#selectedPlayer.marker) 
        {
            this.#winner = this.#selectedPlayer.name
            console.log(this.#selectedPlayer.name + " won 3 in a row")
            this.addPoints()
        }
        // 3 in a column
        else if (this.#board[0] == this.#selectedPlayer.marker&& this.#board[3] == this.#selectedPlayer.marker&& this.#board[6] == this.#selectedPlayer.marker||
        this.#board[1] == this.#selectedPlayer.marker&& this.#board[4] == this.#selectedPlayer.marker&& this.#board[7] == this.#selectedPlayer.marker||
        this.#board[2] == this.#selectedPlayer.marker&& this.#board[5] == this.#selectedPlayer.marker&& this.#board[8] == this.#selectedPlayer.marker) 
        {
            this.#winner = this.#selectedPlayer.name
            console.log(this.#selectedPlayer.name + " won 3 in a column")
            this.addPoints()
        }
        // 3 diagonally
        else if (this.#board[0] == this.#selectedPlayer.marker&& this.#board[4] == this.#selectedPlayer.marker&& this.#board[8] == this.#selectedPlayer.marker||
        this.#board[2] == this.#selectedPlayer.marker&& this.#board[4] == this.#selectedPlayer.marker&& this.#board[6] == this.#selectedPlayer.marker) 
        {
            this.#winner = this.#selectedPlayer.name
            console.log(this.#selectedPlayer.name + " won diagonally")
            this.addPoints()
        }
        else if (this.#board[0] != undefined && this.#board[1] != undefined && this.#board[2] != undefined
                && this.#board[3] != undefined && this.#board[4] != undefined && this.#board[5] != undefined
                && this.#board[6] != undefined && this.#board[7] != undefined && this.#board[8] != undefined) 
            {
                console.log("It's a Tie")
                this.#winner = "It's a Tie"
            }

        else {
            this.switchPlayer()
        }
        console.log(this.#board)
    }

    switchPlayer() {
        if (this.#selectedPlayer == player2) {
            this.#selectedPlayer = player1
            console.log(this.#selectedPlayer.name, "turn")
        }
        else if (this.#selectedPlayer == player1) {
            this.#selectedPlayer = player2
            console.log(this.#selectedPlayer.name, "turn")
        }
    }

    addPoints() {
        if (this.#winner == player1.name) {
            this.#player1points++
            console.log("Player 1 score: " + this.#player1points)
        }
        else if (this.#winner == player2.name) {
            this.#player2points++
            console.log("Player 2 score: " + this.#player2points)
        }
        // this.restartGame()
    }

    restartGame() {
        for (let i = 0; i < 9; i++) {
            super.playRound(i, undefined)
        }

        this.#winner = undefined;


        if (this.#whoWentFirst == player1) {
            this.#selectedPlayer = player2
            this.#whoWentFirst = player2
        }
        else if (this.#whoWentFirst == player2) {
            this.#selectedPlayer = player1
            this.#whoWentFirst = player1
        }

        console.log(player1.name + " is on " + this.#player1points + " and " + player2.name + " is on " + this.#player2points)
    }

    getPlayer1points() {
        console.log(this.#player1points)
        return this.#player1points
    }

    getPlayer2points() {
        console.log(this.#player2points)
        return this.#player2points
    }

    getSelectedPlayer() {
        return this.#selectedPlayer
    }

    getWinner() {
        return this.#winner
    }

    getBoard() {
        return this.#board
    }

}

// const startGame = new Gameflow()
// // Player 1 wins 3 in a row
// startGame.playRound(0)
// startGame.playRound(3)
// startGame.playRound(1)
// startGame.playRound(4)
// startGame.playRound(2)

function screenController() {
    
    // Create players first
    player1 = new Player (document.getElementById("player1name").value, "X", "icons/alpha-x.svg")
    player2 = new Player (document.getElementById("player2name").value, "O", "icons/alpha-o.svg")
    console.log(player1)
    console.log(player2)

    // Initiates game     
    const startGame = new Gameflow()
    const dialog = document.querySelector("dialog");
    dialog.close();

    const displayPlayerTurn = document.querySelector(".whos-turn")
    const player1score = document.getElementById("player1Score")
    const player2score = document.getElementById("player2Score")

    player1score.textContent = player1.name + "'s score: " + startGame.getPlayer1points()
    player2score.textContent = player2.name + "'s score: " + startGame.getPlayer2points()
    displayPlayerTurn.textContent = "It's " + player1.name + "'s turn"

    function activateBoard() {
        const once = {
            once: true,
        };
        for (let i = 0; i < 9; i++) {
            const cellToBeMarked = document.getElementById("cell"+i)
            cellToBeMarked.addEventListener("click", placeMarkers, once);
        }
    }
    activateBoard();

    function deactivateBoard() {
        for (let i = 0; i < 9; i++) {
            const cellsToStop = document.getElementById("cell"+i)
            cellsToStop.removeEventListener("click", placeMarkers);
        }
    }

    function placeMarkers(e) {
        let selectedPlayer = startGame.getSelectedPlayer();
        console.log(selectedPlayer) 
        // console.log(e.target.id, "was clicked")

        const marker = document.createElement("img");
        const cellToBeMarked = document.getElementById(e.target.id)
        marker.setAttribute("src", selectedPlayer.markerDOM);
        cellToBeMarked.appendChild(marker);

        let index =  Number(e.target.id[4]);
        startGame.playRound(index)

        let winner = startGame.getWinner()
        console.log(winner)


        // console.log(game.whoWon())
        if (startGame.getWinner() != undefined && startGame.getWinner() != "It's a Tie") {
            console.log(startGame.getWinner())
            displayPlayerTurn.textContent = startGame.getWinner() + " won"
            player1score.textContent = player1.name + "'s score: " + startGame.getPlayer1points()
            player2score.textContent = player2.name + "'s score: " + startGame.getPlayer2points()
            deactivateBoard();
            // Create reset button
            const area = document.querySelector(".container")
            const resetButton = document.createElement("button");
            resetButton.textContent = "Reset Game";
            resetButton.setAttribute("id", "resetGame");
            area.appendChild(resetButton)
            
            // adde event lisinter
            const reset = document.getElementById("resetGame")
            function resetGame() {
                // Clears DOM Markers
                for (let i = 0; i < 9 ; i++) {
                    const removeMarkerDOM = document.getElementById("cell"+i);
                    const image = document.querySelector("img")
                    if (startGame.getBoard()[i] != undefined) {
                        removeMarkerDOM.removeChild(image)
                    }
                }
                startGame.restartGame()
                displayPlayerTurn.textContent = "It's " + startGame.getSelectedPlayer().name + "'s turn"
                activateBoard();
                // remove resetButton
                const removeResetButton = document.getElementById("resetGame")
                area.removeChild(removeResetButton);
            }
            reset.addEventListener("click", resetGame)
            
        }
        else if (startGame.getWinner() == "It's a Tie") {
            displayPlayerTurn.textContent = startGame.getWinner()
            player1score.textContent = player1.name + "'s score: " + startGame.getPlayer1points()
            player2score.textContent = player2.name + "'s score: " + startGame.getPlayer2points()
            deactivateBoard();
            const area = document.querySelector(".container")
            const resetButton = document.createElement("button");
            resetButton.textContent = "Reset Game";
            resetButton.setAttribute("id", "resetGame");
            area.appendChild(resetButton)

            // adde event lisinter
            const reset = document.getElementById("resetGame")
            function resetGame() {
                // Clears DOM Markers
                for (let i = 0; i < 9 ; i++) {
                    const removeMarkerDOM = document.getElementById("cell"+i);
                    const image = document.querySelector("img")
                    if (startGame.getBoard()[i] != undefined) {
                        removeMarkerDOM.removeChild(image)
                    }
                }
                startGame.restartGame()
                displayPlayerTurn.textContent = "It's " + startGame.getSelectedPlayer().name + "'s turn"
                activateBoard();
                // remove resetButton
                const removeResetButton = document.getElementById("resetGame")
                area.removeChild(removeResetButton);
            }
            reset.addEventListener("click", resetGame)
        }
        else {
            let nextPlayer = startGame.getSelectedPlayer()
            let nextPlayerName = nextPlayer.name;
            displayPlayerTurn.textContent = "It's " + nextPlayerName + "'s turn"
        }
            
    }


}

const startButton = document.getElementById("startGame");
startButton.addEventListener("click", screenController);
