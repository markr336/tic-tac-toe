// Factory function to create players
function createPlayer (name, marker, markerDOM) {
    // creating player object
    let player = {};
    // properties of a player
    player.name = name;
    player.marker = marker;
    player.markerDOM = markerDOM;
    return player
}

function Gameboard() {
    const board = [];

    const appendMarker = (index, selectedPlayerMarker) => {
        board[index] = selectedPlayerMarker
    }

    const getBoard = () => board


    return {appendMarker, getBoard}
}

function Gameflow() {
    const board = Gameboard();
    const player1 = createPlayer(document.getElementById("player1name").value, "X", "icons/alpha-x.svg")
    const player2 = createPlayer(document.getElementById("player2name").value, "O", "icons/alpha-o.svg")

    // switfchplayers works
    let selectedPlayer;
    const switchPlayer = () => {
        if (selectedPlayer == undefined || selectedPlayer == player2) {
            selectedPlayer = player1
            // console.log(selectedPlayer.name, "turn")
        }
        else if (selectedPlayer == player1) {
            selectedPlayer = player2
            // console.log(selectedPlayer.name, "turn")
        }
    }

    const activePlayer = () => selectedPlayer;
    
    switchPlayer() //Player 1 starts

    let winner
    const checkForWinner = () => {
        // console.log(board.getBoard())
        // 3 in a row
        if (board.getBoard()[0] == selectedPlayer.marker && board.getBoard()[1] == selectedPlayer.marker && board.getBoard()[2] == selectedPlayer.marker ||
            board.getBoard()[3] == selectedPlayer.marker && board.getBoard()[4] == selectedPlayer.marker && board.getBoard()[5] == selectedPlayer.marker ||
            board.getBoard()[6] == selectedPlayer.marker && board.getBoard()[7] == selectedPlayer.marker && board.getBoard()[8] == selectedPlayer.marker) 
            {
            winner = selectedPlayer.name
            // console.log(winner, "won")
        }
        // 3 in a column
        else if (board.getBoard()[0] == selectedPlayer.marker && board.getBoard()[3] == selectedPlayer.marker && board.getBoard()[6] == selectedPlayer.marker ||
        board.getBoard()[1] == selectedPlayer.marker && board.getBoard()[4] == selectedPlayer.marker && board.getBoard()[7] == selectedPlayer.marker ||
        board.getBoard()[2] == selectedPlayer.marker && board.getBoard()[5] == selectedPlayer.marker && board.getBoard()[8] == selectedPlayer.marker) 
            {
            winner = selectedPlayer.name
            // console.log(winner, "won")
        }
        // 3 diagonally
        else if (board.getBoard()[0] == selectedPlayer.marker && board.getBoard()[4] == selectedPlayer.marker && board.getBoard()[8] == selectedPlayer.marker ||
        board.getBoard()[2] == selectedPlayer.marker && board.getBoard()[4] == selectedPlayer.marker && board.getBoard()[6] == selectedPlayer.marker) 
        {
            winner = selectedPlayer.name
            // console.log(winner, "won")
        }
        else if (board.getBoard()[0] != undefined && board.getBoard()[1] != undefined && board.getBoard()[2] != undefined
                && board.getBoard()[3] != undefined && board.getBoard()[4] != undefined && board.getBoard()[5] != undefined
                && board.getBoard()[6] != undefined && board.getBoard()[7] != undefined && board.getBoard()[8] != undefined) 
            {
                console.log("It's a Tie")
                winner = "It's a Tie"
            }
        else {
            switchPlayer();
        }


    }

    const whoWon = () => winner

    let player1points = 0;
    let player2points = 0;

    const addpoints = () => {
        if (winner == player1.name) {
            player1points++
        }
        else if (winner == player2.name) {
            player2points++
        }
    }

    const getPlayer1score = () => player1points

    const getPlayer2score = () => player2points

    let whoWentFirst = player1

    const restart = () => {
        console.log("Restart function")
        for (let i = 0; i < 9; i++) {
            board.appendMarker(i, undefined)
        }
        winner = undefined;
        if (whoWentFirst == player1) {
            selectedPlayer = player2
            whoWentFirst = player2
        }
        else if (whoWentFirst == player2) {
            selectedPlayer = player1
            whoWentFirst = player1
        }
    }

    return {
        player1, 
        player2, 
        switchPlayer, 
        activePlayer, 
        appendMarker: board.appendMarker, 
        getBoard: board.getBoard, 
        checkForWinner,
        whoWon,
        addpoints,
        getPlayer1score,
        getPlayer2score,
        restart    
    }
}

function screenController() {
    const game = Gameflow()
    const dialog = document.querySelector("dialog");
    dialog.close();
    const displayPlayerTurn = document.querySelector(".whos-turn")
    const player1score = document.getElementById("player1Score")
    const player2score = document.getElementById("player2Score")
    player1score.textContent = game.player1.name + "'s score: " + game.getPlayer1score()
    player2score.textContent = game.player2.name + "'s score: " + game.getPlayer2score()
    displayPlayerTurn.textContent = "It's " + game.player1.name + "'s turn"

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
        let selectedPlayer = game.activePlayer(); 
        // console.log(e.target.id, "was clicked")

        const marker = document.createElement("img");
        const cellToBeMarked = document.getElementById(e.target.id)
        marker.setAttribute("src", selectedPlayer.markerDOM);
        cellToBeMarked.appendChild(marker);

        let index =  Number(e.target.id[4]);
        game.appendMarker(index, selectedPlayer.marker);
        // console.log(game.getBoard());

        // game.switchPlayer(); may no need this

        // next is to checkforWInner
        game.checkForWinner(selectedPlayer.marker)

        // console.log(game.whoWon())
        if (game.whoWon() != undefined && game.whoWon() != "It's a Tie") {
            console.log(game.whoWon())
            displayPlayerTurn.textContent = game.whoWon() + " won"
            game.addpoints();
            console.log(game.getPlayer1score())
            player1score.textContent = game.player1.name + "'s score: " + game.getPlayer1score()
            player2score.textContent = game.player2.name + "'s score: " + game.getPlayer2score()
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
                    if (game.getBoard()[i] != undefined) {
                        removeMarkerDOM.removeChild(image)
                    }
                }
                console.log("Game Reset")
                game.restart()
                console.log(game.getBoard())
                console.log(game.whoWon())
                console.log(game.activePlayer())
                displayPlayerTurn.textContent = "It's " + game.activePlayer().name + "'s turn"
                activateBoard();
                // remove resetButton
                const removeResetButton = document.getElementById("resetGame")
                area.removeChild(removeResetButton);
            }
            reset.addEventListener("click", resetGame)
            
        }
        else if (game.whoWon() == "It's a Tie") {
            console.log(game.whoWon())
            displayPlayerTurn.textContent = game.whoWon()
            console.log(game.getPlayer1score())
            player1score.textContent = game.player1.name + "'s score: " + game.getPlayer1score()
            player2score.textContent = game.player2.name + "'s score: " + game.getPlayer2score()
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
                    if (game.getBoard()[i] != undefined) {
                        removeMarkerDOM.removeChild(image)
                    }
                }
                console.log("Game Reset")
                game.restart()
                console.log(game.getBoard())
                console.log(game.whoWon())
                console.log(game.activePlayer())
                displayPlayerTurn.textContent = "It's " + game.activePlayer().name + "'s turn"
                activateBoard();
                // remove resetButton
                const removeResetButton = document.getElementById("resetGame")
                    area.removeChild(removeResetButton);
            }
            reset.addEventListener("click", resetGame)
        }
        else {
            console.log(game.whoWon())
            let nextPlayer = game.activePlayer();
            let nextPlayerName = nextPlayer.name;
            displayPlayerTurn.textContent = "It's " + nextPlayerName + "'s turn"
        }
    }



}

const startButton = document.getElementById("startGame");
startButton.addEventListener("click", Gameflow);
startButton.addEventListener("click", screenController);

