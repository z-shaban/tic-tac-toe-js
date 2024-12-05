

function Gameboard (){
    const rows = 3;
    const columns = 3;
    const board = [];
    

    for(let i = 0; i < rows; i++){
        board[i] = [];

        for(let j = 0; j < columns; j++){
             board[i].push(Cell());
        }
    };

    const selectCell = (row, column, playerSymbol) => {
        if (board[row][column].getValue() === "-"){
            board[row][column].addSymbol(playerSymbol)
        } else{
            console.log("Already chosen");
            return;
        }
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        return boardWithValues;
    }
 
    
    const getBoard = () => board;
    return{getBoard, printBoard, selectCell};
}

function Cell (){
    let value = "-";

    const getValue = () => value;
    const addSymbol = (playerSymbol) => {
        value = playerSymbol;
    };

    return{
        getValue,
        addSymbol
    }
};

function Players(playerOneName = "Player 1", playerTwoName = "Player 2"){
    const players= [
        {
            name : playerOneName,
            symbol : "X"
        },
        {
            
            name : playerTwoName,
            symbol : "O"
            
        }

    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    return{switchPlayerTurn, getActivePlayer};
}

function Game(){
    const board = Gameboard();
    const players = Players();
    

    const playRound = (row, column,) =>{
        board.selectCell(row,column, players.getActivePlayer().symbol);
        winRound();
        players.switchPlayerTurn();
        board.printBoard();
        
    }

    const winRound = () =>{ 
         const myBoard = board.printBoard();
         const myPlayer = players.getActivePlayer();
         console.log(myBoard); 
         const winMessage = document.querySelector(".winMessage");
         winMessage.textContent = ""

         //check for horizontal win
         for (let i = 0; i < myBoard.length; i++){
            for (let j = 0; j < myBoard[i].length; j++){
                if(myPlayer.symbol === myBoard[i][j] && myBoard[i][j] === myBoard[i][j+1] && myBoard[i][j+1] === myBoard[i][j+2]){
                    winMessage.textContent = `${myPlayer.name} wins!!!...` 
                } 
            }
        }
        //check for vertical win
        for (let i = 0; i < myBoard.length-2; i++){
            for (let j = 0; j < myBoard[i].length; j++){
                if(myPlayer.symbol === myBoard[i][j] && myBoard[i][j] == myBoard[i+1][j] && myBoard[i+1][j] == myBoard[i+2][j]){
                    winMessage.textContent = `${myPlayer.name} wins!!!...` 
                }
            }
        }

        //check for diagonal win
        if(myPlayer.symbol === myBoard[0][0] && myBoard[0][0] == myBoard[1][1] && myBoard[1][1] == myBoard[2][2]||
            myPlayer.symbol === myBoard[0][2] && myBoard[0][2] == myBoard[1][1] && myBoard[1][1] == myBoard[2][0]){
                winMessage.textContent = `${myPlayer.name} wins!!!...` 
        }
            
    }

    return{
        playRound,
        getBoard : board.getBoard,
        getActivePlayer : players.getActivePlayer
    }
}

function screenController (){
    const game = Game();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () =>{
        boardDiv.textContent ="";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        board.forEach((row, rowIndex) =>{
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            row.forEach((cell,columnIndex) =>{
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = cell.getValue();

                cellButton.dataset.row = rowIndex; 
                cellButton.dataset.column = columnIndex; 

                rowDiv.appendChild(cellButton);
                

            })
            boardDiv.appendChild(rowDiv);
        })
    }

    function clickHandler(e){
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if(!selectedColumn && selectedRow) return;
        game.playRound(selectedRow, selectedColumn)
        updateScreen();
        
    }

    boardDiv.addEventListener("click", clickHandler);

    updateScreen();
}

screenController();



