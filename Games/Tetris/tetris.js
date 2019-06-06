//CREATED WITH HELP OF TUTORIAL: https://www.codeexplained.org/2018/08/create-tetris-game-using-javascript.html 

const canvas = document.getElementById("tetrisBoard");
const ctx = canvas.getContext("2d");
//const scoreElement = document.getElementById("score");

//Constants row and column for the board
const row = 20;
const col = 10;
const SQ = 20;
const vacant = "WHITE"; //Vacant squares will be white
const ScoreNum = document.getElementById("score")
let score = 0;


//draw function for individual squares on board
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

//board array
let board = [ ];

//Loops to create rows and columns to create board for game
//Creation of rows
for (r = 0; r< row; r++){  
    board[r] = [ ];
    //Creation of columns
    for (c = 0; c < col; c++){ 
        board[r][c] = vacant;
    }
}

//Function for drawing the actual game board.
function drawBoard(){
    for (r = 0; r< row; r++){
        for (c = 0; c < col; c++){
            //Drawing squares using the row and column number
            drawSquare(c,r,board[r][c]);
        }
    }
}
//drawBoard() function is called to actually draw the board.
drawBoard();

//Declare constant for the blocks and what colors they will be 
const TetrisBlocks = [
    [Z,"blue"],
    [J,"red"],
    [S,"green"],
    [J, "yellow"],
    [T, "orange"],
    [O, "purple"],
    [I, "pink"]
];

//Function to get one of the blocks at random
function random(){
    let random = Math.floor(Math.random() * TetrisBlocks.length)
    return new Piece(TetrisBlocks[random][0],TetrisBlocks[random][1]); //returns object with random's block type and color
}

//Initiating instance of the block
let block = random();

//Constructor function defined for the blocks, has the block, color, rotation(number in block's array), and which rotation is active. 
//Function also has x and y coordinates of the block
function Piece(block,color){
    this.block = block;
    this.color = color;
    this.rotation = 0;
    this.activeBlock = this.block[this.rotation];
    this.x = 0;
    this.y = -1;
    }

//Code for drawing the specific piece on the board
Piece.prototype.draw = function(){
    //Uses for loops to loop through the rows and columns, not using the length of the specific rotation in piece array
    for (r = 0; r < this.activeBlock.length; r++){
        for (c = 0; c < this.activeBlock.length; c++){
            //if true (meaning it's occupied), specific square will be drawn using block's information
            if (this.activeBlock[r][c]){
                drawSquare(this.x + c, this.y + r, this.color);
            }
        }
    }
}

//Function to undraw the pieces when automatically moving down
Piece.prototype.unDraw = function(){
    //Uses for loops to loop through the rows and columns, not using the length of the specific rotation in piece array
    for (r = 0; r < this.activeBlock.length; r++){
        for (c = 0; c < this.activeBlock.length; c++){
            //if true (meaning it's occupied), specific square will be drawn using block's information
            if (this.activeBlock[r][c]){
                drawSquare(this.x + c, this.y + r, vacant);
            }
        }
    }
}

//The next two functions allow the piece to move down automatically

//Function to move the piece down
Piece.prototype.moveDown = function(){
    //If no collision detected, block moves down
    if (!this.collision(0,1,this.activeBlock)){
         //unDraws the piece before moving it down the board
        this.unDraw()
        //y value of piece is increased
        this.y++;
        //Piece redrawn
        this.draw();
    }
    else{
        //if collision is detected, piece is locked in place and a new block appears at the top
        this.lock();
        block = random();
    }
   
}

//Function to move the piece to the right
Piece.prototype.moveRight = function(){
    //If no collision detected, block moves right
    if (!this.collision(1,0,this.activeBlock)){
        //unDraws the piece before moving it right the board
        this.unDraw()
        //x value of piece is increased
        this.x++;
        //Piece redrawn
        this.draw();
    }
    
}

//Function to move piece to the left
Piece.prototype.moveLeft = function(){
    //If no collision detected, block moves left
    if (!this.collision(-1,0,this.activeBlock)){
        //unDraws the piece before moving it left the board
        this.unDraw()
        //x value of piece is decreased
        this.x--;
        //Piece redrawn
        this.draw();
    }
}

//Function to rotate the piece
Piece.prototype.rotate = function(){
    //sets the next rotation for the block
    let nextRotation = this.block[(this.rotation + 1) % this.activeBlock.length];
    //If collision is false, block is rotated
    if (!this.collision(0,0,nextRotation)){
        //unDraws the piece before moving it left the board
        this.unDraw()
        //rotation is changed to the next index in array. % included to ensure that rotation number does not go above length of array
        this.rotation = (this.rotation + 1) % this.activeBlock.length;
        //Current rotation is updated 
        this.activeBlock = this.block[this.rotation];
        //Piece redrawn
        this.draw();
    }
}


Piece.prototype.lock = function(){
    //Loops through all the squares of the block
    for (r = 0; r < this.activeBlock.length; r++){
        for (c = 0; c < this.activeBlock.length; c++){
            //if false (meaning it's vacant), it will be skipped
            if (!this.activeBlock[r][c]){
                continue;
            }
            //If statement is true (meaning the block is outside the boundary at the top of the board), gaame ends
            if (this.y + r < 0){
                alert("Game Over.")
                //Game over set to true to be used in drop function
                gameOver = true;
                break;
            }
            //Locks the piece by setting those square to be the block's color
            board[this.y + r][this.x + c] = this.color
        }
    }
    //Loop to determine if the row is full, and row is removed when piece is locked and they are full
    for(r=0; r<row; r++){
        //rowFull will always be set to true each loop so if statements can process properly
        let rowFull = true;
        for(c=0; c<col; c++){
            //This will be true if the square is occupied
            rowFull = rowFull && (board[r][c] != vacant);
        }
        //if rowFull is true, row at that y will equal the row above it
        if (rowFull){
            for(y=r; y>1; y--){
                for(c=0; c<col; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            for(c=0; c<col; c++){
                board[0][c] = vacant;
            }
            //if row is full, score increased by 1
            score += 1;
        }
    }
    //Board is drawn
    drawBoard();

    //ScoreNum set to score so it will increase on the screen when score in script is incremented 
    ScoreNum.innerHTML = score;
}

//Function to detect if pieces "collide" with anything
Piece.prototype.collision = function(x,y,piece){
    //Loop to check for collisions - returns true if collision is detected
    for (r = 0; r < piece.length; r++){
        for (c = 0; c < piece.length; c++){          
            //If space is vacant, continue
            if (!piece[r][c]){
                continue;
            }
            //new coordinates of the piece after it was moved
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            //if statement to check if block crossed board boundaries
            if (newX < 0 || newX >= col || newY >= row){
                return true;
            }
            //Continue if new y-coordinate is negative - avoids crashing
            else if (newY <= 0){
                continue;
            }
            //if statement to check if there is a piece already there
            else if (board[newY][newX] != vacant){
                return true;
            }
        }
    }
    return false;
}

//Listens for an event to happen, specifically when user pushes a keyboard key down
document.addEventListener("keydown",controls);

//Function to decide what to do if arrow keys are pushed. DropStart updated to ensure block doesn't move down when being controlled 
function controls(event){
    if (event.keyCode == 37){
        block.moveLeft();
    }
    else if (event.keyCode == 38){
        block.rotate();
    }
    else if (event.keyCode == 39){
        block.moveRight();
    }
    else if (event.keyCode == 40){
        block.moveDown();       
    }
}

//Gets when the block starts dropping, used further down to control how fast block drops
let dropStart = Date.now();
//Game over set to false to continue game 
let gameOver = false;
//Function to allow the piece to move down automatically, includes method to control how fast block drops
function drop(){
    //current time
    let now = Date.now();
    //differece in time between when block started dropping and current time
    let timeChange = now - dropStart;
    //if statement - says that if difference in time is greater than 1s, call move.Down and get new dropStart time
    if (timeChange > 1000){
        //previous function is called which increments y and redraws piece
        block.moveDown();
        //dropStart is reset
        dropStart = Date.now();
    }
    //if gameOver is false, game will continue 
    if (!gameOver){
        //requestAnimationFrame() allows for smoother execution, uses drop
        requestAnimationFrame(drop);
    }
}

drop();