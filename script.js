function Gameboard (){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];

        for(let j = 0; j < columns; j++){
             board[i].push("-");
        }
    }
 
    console.log(board)
    const getBoard = () => board;
    return{getBoard};
}

function Players(playerOneName = "Player 1", playeTwoName = "Player 2"){
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

    return{switchPlayerTurn};
}

function Game(){
    const board = Gameboard();

    const playRound = () =>{

    }
}

Gameboard();
