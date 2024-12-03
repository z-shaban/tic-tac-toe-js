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
        console.log(boardWithValues);
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

        players.switchPlayerTurn();
        board.printBoard();
    }

    const winRound = () =>{

    }

    return{playRound}
}

const game = Game();
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0,2)
game.playRound(2,2)
