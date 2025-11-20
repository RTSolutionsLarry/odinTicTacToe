const gameboard = ( function () {
    const gameBoardContainer = document.getElementsByClassName('gameBoardContainer')[0];

    const createBoard = (size) => {
        let gridSize = '';
        for (let i = 0; i < size; i++) {
            gridSize = gridSize + ' 1fr';
        } 

        gameBoardContainer.style.gridTemplateColumns = gridSize; 
        
        let gameSquareNumber = 1;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const gameSquare = document.createElement('div');
                gameSquare.classList.add('gameSquare');
                gameSquare.classList.add(gameSquareNumber);
                gameSquare.addEventListener('click', () => playIcon(gameSquare));
                gameBoardContainer.appendChild(gameSquare);
                gameSquareNumber++;                
            }
        }
    }

    const playIcon = (gameSquare) => {
        if (game.getPlayerList().length == 0) {
            alert('Press Start Game to add players');
            return;
        }
        
        if (gameSquare.children.length > 0) {
            return;
        }

        const squareClasses = gameSquare.className.split(' ');     
        const squareNumber = squareClasses[1];
        
        const activePlayer = game.getActivePlayer();
        
        activePlayer.addPlayerMoves(squareNumber);
        const checkPlayerMoves = activePlayer.getPlayerMoves();

        const icon = document.createElement('p');
        icon.classList.add('icon');
        icon.innerText = activePlayer.icon;
        gameSquare.appendChild(icon);

        
        game.checkForWin(checkPlayerMoves,activePlayer);

        if (game.checkForWin(checkPlayerMoves,activePlayer)) {
            alert(`${player.name} wins`);
            game.resetMoves();
            gameboard.clearIcons();
            return;            
        }

        game.changeActivePlayer();
    }

    const clearIcons = () => {
        const icons = document.getElementsByClassName('icon');
        while (icons.length > 0) {
            icons[0].parentNode.removeChild(icons[0]);
        }
    }

    const displayPlayers = (playerList) => {
        let i = 0;
        for (player of playerList) {
            const playerTitle = document.createElement('h3');
            playerTitle.classList.add('playerName');
            playerTitle.textContent = player.name;

            const playerScore = document.createElement('p');
            playerScore.classList.add('playerScore');
            playerScore.classList.add(player.name);
            playerScore.textContent = player.getPlayerScore();

            const playerIcon = document.createElement('p');
            playerIcon.classList.add('icon');
            playerIcon.classList.add('iconInformation');
            playerIcon.innerText = player.icon;

            if (i == 0) {
                const leftPlayerInformation = document.getElementsByClassName('leftPlayerInformation')[0];
                leftPlayerInformation.appendChild(playerIcon);                
                leftPlayerInformation.appendChild(playerTitle);
                leftPlayerInformation.appendChild(playerScore);

            } else {
                const rightPlayerInformation = document.getElementsByClassName('rightPlayerInformation')[0];
                rightPlayerInformation.appendChild(playerIcon);
                rightPlayerInformation.appendChild(playerTitle);
                rightPlayerInformation.appendChild(playerScore);
            }
            i++;
        }
    }

    return {createBoard , displayPlayers , playIcon, clearIcons};
})();

const game = (() => {
    let win = false;
    const playerList = [];    
    let activePlayer;

    const isWon = () => win;
    const getPlayerList = () => playerList;
    const getActivePlayer = () => activePlayer;
    const setActivePlayer = (player) => {
        activePlayer = player;
    }
    const checkForWin = (stringArrayOfMoves,player) => {
        const arrayOfMoves = stringArrayOfMoves.map(Number);
        
        const winConditionOne = [1,2,3];
        const winConditionTwo = [4,5,6];
        const winConditionThree = [7,8,9];
        const winConditionFour = [1,4,7];
        const winConditionFive = [2,5,8];
        const winConditionSix = [3,6,9];
        const winConditionSeven = [1,5,9];
        const winConditionEight = [3,5,7];

        if (
            winConditionOne.every(value => arrayOfMoves.includes(value)) ||
            winConditionTwo.every(value => arrayOfMoves.includes(value)) ||
            winConditionThree.every(value => arrayOfMoves.includes(value)) ||
            winConditionFour.every(value => arrayOfMoves.includes(value)) ||
            winConditionFive.every(value => arrayOfMoves.includes(value)) ||
            winConditionSix.every(value => arrayOfMoves.includes(value)) ||
            winConditionSeven.every(value => arrayOfMoves.includes(value)) ||
            winConditionEight.every(value => arrayOfMoves.includes(value))
        ) {
            win = true;
            console.log(`${player.name} wins`);
            player.addPlayerScore();
            const playerNewScore = player.getPlayerScore();            
            const score = document.getElementsByClassName(`playerScore ${player.name}`)[0];
            score.innerText = player.getPlayerScore();
            return true;
        } else {
            console.log('No winner yet?!');
            return false;
        }
    }

    const resetMoves = () => {
        const playersToReset = game.getPlayerList();
        for (player of playersToReset) {
            player.resetMoveAllMoves();
        }
    }

    const addPlayerToGame = (player) => {
        playerList.push(player);
    }

    const randomizeActivePlayer = () => {
        const randomIndex = Math.floor(Math.random() * playerList.length);
        const randomPlayer = playerList[randomIndex];
        randomPlayer.setMyTurn(true);
        setActivePlayer(randomPlayer);
    }
    
    const changeActivePlayer = () => {
        
        if (playerList[0].getMyTurn()) {
            playerList[0].changeTurn();
            playerList[1].changeTurn();
            setActivePlayer(playerList[1]);
        } else {
            playerList[0].changeTurn();
            playerList[1].changeTurn();
            setActivePlayer(playerList[0]);
        }
    }

    const setPlayers = () => {
        const playerOneName = prompt('Player 1 Name: ');
        const playerTwoName = prompt('Player 2 Name: ');
        const playerOne = createPlayer(playerOneName, 'X');
        const playerTwo = createPlayer(playerTwoName, 'O');
        addPlayerToGame(playerOne);
        addPlayerToGame(playerTwo);
    }

    const startGame = () => {
        gameboard.createBoard(3);
        const startGameButton = document.getElementsByClassName('startGameButton')[0];
        const resetGameButton = document.getElementsByClassName('resetGameButton')[0];
        startGameButton.addEventListener('click',()=>{
            game.setPlayers();
            const players = game.getPlayerList();
            gameboard.displayPlayers(players);
            game.randomizeActivePlayer();
            startGameButton.classList.add('hidden');
            resetGameButton.classList.remove('hidden');
        })
    }

    return {isWon , getPlayerList, getActivePlayer, checkForWin, addPlayerToGame, randomizeActivePlayer, changeActivePlayer, setPlayers, startGame , resetMoves};
})();

const createPlayer = (name,icon) => {
    let playerMoves = [];
    let myTurn = false;
    let playerScore = 0;

    const resetMoveAllMoves = () => {
        playerMoves = [];
    }

    const getPlayerScore = () => playerScore;
    const addPlayerScore = () => playerScore++;

    const getPlayerMoves = () => playerMoves;
    const addPlayerMoves = (gridNumber) => playerMoves.push(gridNumber);
    const getMyTurn = () => myTurn;
    const setMyTurn = (turn) => {
        myTurn = turn;
    }
    const changeTurn = () => {
        if (myTurn) {
            myTurn = false;
        } else {
            myTurn = true;
        }
    }
    return {name,icon,getPlayerScore, addPlayerScore, getPlayerMoves,addPlayerMoves,getMyTurn,setMyTurn,changeTurn , resetMoveAllMoves};
}

game.startGame();

