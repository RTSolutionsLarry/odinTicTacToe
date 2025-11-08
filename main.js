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
                gameSquareNumber++;
                gameSquare.addEventListener('click', (player)=> {

                })
                gameBoardContainer.appendChild(gameSquare);
            }
        }
    }
    return {createBoard};
})();

const game = (() => {
    let win = false;

    const checkForWin = (arrayOfMoves) => {
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
        }
        return win;
    }
    
})();

console.log(game.checkForWin([1,2,3]));


const createPlayer = (name,icon) => {
    const playerMoves = [];

    const getPlayerMoves = () => playerMoves;
    const addPlayerMoves = (gridNumber) => playerMoves.push(gridNumber);

    return {name,icon,getPlayerMoves,addPlayerMoves};
}

gameboard.createBoard(3);