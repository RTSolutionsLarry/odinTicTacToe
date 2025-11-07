const gameboard = ( function () {
    const gameBoardContainer = document.getElementsByClassName('gameBoardContainer')[0];

    const createBoard = (size) => {
        let gridSize = '';
        for (let i = 0; i < size; i++) {
            gridSize = gridSize + ' 1fr';
            console.log(gridSize);
        }
        

        gameBoardContainer.style.gridTemplateColumns = gridSize; 

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const gameSquare = document.createElement('div');
                gameSquare.classList.add('gameSquare');
                gameBoardContainer.appendChild(gameSquare);
            }

        }
    }
    return {createBoard};
})();

gameboard.createBoard(3);

const game = (() => {

})();

const createPlayer = (name) => {
    return {name};
}