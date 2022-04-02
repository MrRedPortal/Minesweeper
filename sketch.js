
//globals
var grid;
var col = 20;
var row = 20;
//global end

function setup() {
    createCanvas(400,400);
    grid = make2DArray(col,row);
    for (var i=0; i<col; i++){
        for (var j=0; j<row;j++){
            grid[i][j] = new cell();
        }
    }

}

function draw() {

  background(0);
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

}