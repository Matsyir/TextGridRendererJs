class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class TextGamePoint {
	constructor(pos, char, color) {
        this.char = char;
        this.color = color;
    }

    static generateArr(width, height, initChar=" ") {
        let arr = [];
        for (let i = 0; i < width; i++) {
            arr[i] = [];
            for (let j = 0; j < height; j++) {
                arr[i][j] = new TextGamePoint(new Point(i,j), initChar, "#000000");
            }
        }
        
        return arr;
    }
}

const UPDATE_DELAY = 5; // ms
const ROWS = 8;
const COLS = 24;

let game = {};
let canvas = {};
canvas.update = function() {
    let str = ""
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (c == 0 && r != 0) {
                str += "<br>"
            }
            str += `\$\{game.points[${r}][${c}].char\}`;
        }
    }
    delete this.str;
    this.str = eval('`' + str + '`');
}


function init() {
    let div = $('<div id="game">').css({"font-family": "monospace", "font-size": "24px", "padding": "0px"});
    $("body").append(div);

    game.points = TextGamePoint.generateArr(ROWS, COLS, "@");
    canvas.update();
}

function update() {
    // game update logic
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (Math.random() < 0.1) {
                game.points[r][c].char = Math.random().toString(36).substring(2, 3).toUpperCase();
            }
        }
    }

    canvas.update(game.points)
    setTimeout(update, UPDATE_DELAY)
    
    draw();
}

function draw() {
    // game draw logic

    $("#game").html(canvas.str)

    setTimeout(draw, UPDATE_DELAY)
}

$(function() {
    init();
    update();
});
