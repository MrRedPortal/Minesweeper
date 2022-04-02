function Cell(i,j,w){
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;
    this.neighborCount=0;
    this.mine = false;

    this.revealed = false;

}

Cell.prototype.show = function(){
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w)

    if(this.revealed){
        if(this.mine){
            stroke(0);
            fill(100);
            ellipse(this.x+w*0.5, this.y+w*0.5, this.w*0.5);
        } else {
            fill(200);
            stroke(0);
            rect(this.x,this.y,this.w);
            if(this.neighborCount>0) {
                textAlign(CENTER);
                fill(0);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
            }
        }
    }
}

Cell.prototype.countNeighbors = function(){
    if(this.mine){
        this.neighborCount=-1;
        return;
    }
    var total=0;
    for (var xOff=-1; xOff<=1;xOff++){
        for(var yOff=-1; yOff<=1;yOff++){
            var i = this.i+xOff;
            var j = this.j+yOff;
            if(i>-1&&i<col&&j>-1&&j<row) {
                var neighbor = grid[i][j];
                if (neighbor.mine) {
                    total++;
                }
            }
        }
    }
    console.log(total);
    this.neighborCount=total;
}

Cell.prototype.contains = function (mouseX,mouseY) {
    return (mouseX>this.x && mouseX<this.x+this.w &&
        mouseY>this.y && mouseY<this.y+this.w);
}

Cell.prototype.reveal = function(){
    this.revealed = true;
    if(this.neighborCount == 0){
        this.floodFill();
    }
}


Cell.prototype.floodFill = function () {
    for (var xOff=-1; xOff<=1;xOff++){
        for(var yOff=-1; yOff<=1;yOff++){
            var i = this.i+xOff;
            var j = this.j+yOff;
            if(i>-1&&i<col&&j>-1&&j<row) {
                var neighbor = grid[i][j];
                if(!neighbor.mine && !neighbor.revealed){
                    neighbor.reveal();
                }
            }
        }
    }
}