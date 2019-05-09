// Basic text game rendering engine in js
"use strict";

// Point as represented in the text game. Holds a char, charColor, and bgColor
class TextGamePoint {
    constructor(char, charColor, bgColor) {
        this.char = char;
        this.charColor = charColor;
        this.bgColor = bgColor;
    }
}
// Main TextGame class to handle the game.
class TextGame {
    // Static constants related to the game. (Call without (): TextGame.ROWS)
    static get UPDATE_DELAY() { return 5; }
    static get ROWS() { return 8; }
    static get COLS() { return 24; }

    // Generate an array of TextGamePoints based on the static size.
    static generateArr(initChar=" ", initTextColor="#000000", initBgColor="#FFFFFF") {
        let arr = [];
        for (let r = 0; r < this.ROWS; r++) {
            arr[r] = [];
            for (let c = 0; c < this.COLS; c++) {
                arr[r][c] = new TextGamePoint(initChar, initTextColor, initBgColor);
            }
        }
        
        return arr;
    }

    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    constructor(initChar=" ", initCharColor="#000000", initBgColor="#FFFFFF") {
        this.points = TextGame.generateArr(initChar, initCharColor, initBgColor);
        this.updateTimeout = null;
    }

    getPointContainer(r, c) {
        return $(`#r${r}c${c}`);
    }
    getPointChar(r, c) {
        return this.points[r][c].char;
    }
    getPointCharColor(r, c) {
        return this.points[r][c].charColor;
    }
    getPointBgColor(r, c) {
        return this.points[r][c].bgColor;
    }    

    setPoint(row, col, char=null, charColor=null, bgColor=null) {
        let pointContainer = this.getPointContainer(row, col);
        if (char != null) {
            this.points[row][col].char = char;
            pointContainer.text(char);
        }
        if (charColor != null) {
            this.points[row][col].charColor = charColor;
            pointContainer.css("color", charColor);
        }
        if (bgColor != null) {
            this.points[row][col].bgColor = bgColor;
            pointContainer.css("background", bgColor);
        }
    }

    // initialization: create div filled with spans for each point.
    init() {
        let pointContainers = '<div id="game" style="font-family: monospace; font-size: 24px; padding: 0px">';
        for (let r = 0; r < TextGame.ROWS; r++) {
            for (let c = 0; c < TextGame.COLS; c++) {
                pointContainers = pointContainers.concat(`<span id="r${r}c${c}" style="color: ${this.points[r][c].charColor}; background: ${this.points[r][c].bgColor};">${this.points[r][c].char}</span>`);
            }
            pointContainers = pointContainers.concat("<br>");
        }

        pointContainers = pointContainers.concat("</div>");

        $("body").append(pointContainers);
    }

    update() {
        // make sure update is called every UPDATE_DELAY, so queue the method for the future
        // before the method executes. Ideally, update should be faster than UPDATE_DELAY.
        this.updateTimeout = setTimeout(this.update.bind(this), TextGame.UPDATE_DELAY);
        // randomize the chars and their colors
        for (let r = 0; r < TextGame.ROWS; r++) {
            for (let c = 0; c < TextGame.COLS; c++) {
                let char = null;
                let charColor = null;
                let bgColor = null;
                if (Math.random() < 0.1) { // only randomize some random chars not all of them
                    char = Math.random().toString(36).substring(2, 3).toUpperCase();
                }
                if (Math.random() < 0.1) { // only randomize some random colors not all of them
                    charColor = TextGame.getRandomColor();
                }
                if (Math.random() < 0.1) { // only randomize some random bgColors not all of them
                    bgColor = TextGame.getRandomColor();
                }
                this.setPoint(r, c, char, charColor, bgColor);
            }
        }
    }
}

let game = new TextGame("@", "#43EF00", "#000000");

$(function(){
    game.init();
    game.update();
});
