
//globals
var grid;
var col;
var row;
var w = 20;
var totalMines = 40;
//global end

function setup() {
    createCanvas(401,401);
    col = floor(width/w);
    row = floor(height/w);
    grid = make2DArray(col,row);
    //Minefield Creation Loop
    for (var i=0; i<col; i++){
        for (var j=0; j<row;j++){
            grid[i][j] = new Cell(i,j, w);
        }
    }

    //Mine placement loop
    var placedMines = 0;
    while( placedMines !== totalMines){
        var i = floor(random(col));
        var j = floor(random(row));
        if(!grid[i][j].mine){
            grid[i][j].mine = true;
            placedMines++
        }
    }

    //Mine Neighbour Count loop
    for (var i=0; i<col; i++){
        for (var j=0; j<row;j++){
            grid[i][j].countNeighbors();
        }
    }
}


function mousePressed() {
    for (var i=0; i<col; i++){
        for (var j=0; j<row;j++){
            if (grid[i][j].contains(mouseX,mouseY)){
             grid[i][j].reveal();

             if(grid[i][j].mine){
                 gameOver();
             }

            }
        }
    }
}
    


function draw() {

  background(255);
    for (var i=0; i<col; i++){
        for (var j=0; j<row;j++){
            grid[i][j].show();
        }
    }

}

function make2DArray(col,row) {

    var array = new Array(col);
    for(var i = 0; i < array.length; i++){
        array[i] = new Array(row);
    }
    return array;

}

function gameOver(){
    for (var i=0; i<col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].revealed=true;
        }
    }
}