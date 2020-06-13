// Main script to configure the TextGridRenderer outside of its core implementation.

// get random int in range, both inclusive.
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMatrixLine(c) {
    let existingX = matrixLines.map((m) => m.x);
    let potentialX = [...Array(TextGridRenderer.COLS).keys()].filter(x => !existingX.includes(x));

    let x = potentialX[rand(0, potentialX.length - 1)];

    let length = rand(4, TextGridRenderer.ROWS);
    
    let points = [{x: x, y: 0}];
    
    return {
        // x and y are the root position of the line
        x: x, // x will not change.
        y: 0, // y will be going up each update (down, visually).
        delay: rand(1, 8), // basically the opposite of speed, higher means it will wait longer before moving
        wait: 0, // amount of ticks waited without movement
        length: length, // length goes downward on the y axis (up, visually)
        points: points,
        removedPoints: [],


        willMove: function() { return this.wait >= this.delay; },
        move: function() { // returns true if still exists, false if off-screen to be destroyed
            if (this.willMove()) {
                this.y++;
                this.wait = 0;
                if (this.points.length >= 1 && (this.points.length >= this.length || this.y >= TextGridRenderer.ROWS)) {
                    this.removedPoints.push(this.points[this.points.length - 1]);
                }
                this.points = [];
                for (let i = 0; i < this.length; i++) {
                    let y = this.y - i;
                    if (y >= 0 && y < TextGridRenderer.ROWS) {
                        this.points.push({x: this.x, y: y});
                    }
                }

                if (this.points.length < 1) {
                    return false;
                }
            }
            else {
                this.wait++;
            }

            return true;
        },
    }
}

// TextGridRenderer.setRows(24);
// TextGridRenderer.setCols(92);
TextGridRenderer.setUpdateDelay(10);
let game = new TextGridRenderer(update, true, "#", "rgba(255, 255, 255, 0.2)", "#000000");

let matrixLines = [];
let maxMatrixLines = Math.floor(TextGridRenderer.COLS * 0.7);


function update() {
    function resetPoint(x, y) {
        game.setPoint(x, y, Math.random().toString(36).substring(2, 3).toUpperCase(), "rgba(255, 255, 255, 0.2)", "#000000")
    }

    // randomize the chars
    for (let x = 0; x < TextGridRenderer.COLS; x++) {
        for (let y = 0; y < TextGridRenderer.ROWS; y++) {
            if (Math.random() < 0.333) { // only randomize some chars not all of them
                char = Math.random().toString(36).substring(2, 3).toUpperCase();
                game.setPoint(x, y, char);
            }
        }
    }

    // move first so new lines won't be moved
    for (let i = 0; i < matrixLines.length; i++) {
        let stillVisible = matrixLines[i].move();
        
        if (!stillVisible) {
            matrixLines[i].removedPoints.forEach(p => resetPoint(p.x, p.y));
            matrixLines[i] = null;
        }
    }

    // remove any falsy values (null, undefined) created by removing lines.
    matrixLines = matrixLines.filter((e) => e);

    // if there are less than 5 lines, 1/5 to make a new one every tick
    // if there is >= 5 lines, 1/10 to make a new one each tick
    if (matrixLines.length <= maxMatrixLines && matrixLines.length < 5 && rand(1, 5) == 1) {
        matrixLines.push(createMatrixLine());
    }
    else if (matrixLines.length <= maxMatrixLines && rand(1, 10) == 1) {
        matrixLines.push(createMatrixLine());
    }

    // paint current state of matrix line points
    matrixLines.forEach(m => {
        m.points.forEach(p => game.setPoint(p.x, p.y, null, "#04d900", "#014500"));
        m.removedPoints.forEach(p => resetPoint(p.x, p.y));
    });
}

game.init(function(){
    $("body").append("<br><input type='button' id='pause' value='Pause'>&nbsp;<input type='button' id='resume' value='Resume'>");

    $("#pause").click(function() { game.pause(); });
    $("#resume").click(function() { game.resume(); });
}.bind(this));