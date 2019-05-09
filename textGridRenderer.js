// Basic text grid renderer in js. Generates spans to represent a 2D array of characters.
// The point properties (char, color, bgColor) can be fetched from the 2D array without
// processing the html value.
"use strict";

// Point as represented in the text game. Holds a char, charColor, and bgColor
class TextGridPoint {
    constructor(char, charColor, bgColor) {
        this.char = char;
        this.charColor = charColor;
        this.bgColor = bgColor;
    }
}
// Main TextGridRenderer class to handle the game.
class TextGridRenderer {
    // Static constants related to the game. (Call without (): TextGridRenderer.ROWS)
    static get UPDATE_DELAY() { return 10; }
    static get ROWS() { return 8; }
    static get COLS() { return 24; }

    // Generate an array of TextGamePoints based on the static size.
    static generateArr(initChar=" ", initTextColor="#000000", initBgColor="#FFFFFF") {
        let arr = [];
        for (let r = 0; r < this.ROWS; r++) {
            arr[r] = [];
            for (let c = 0; c < this.COLS; c++) {
                arr[r][c] = new TextGridPoint(initChar, initTextColor, initBgColor);
            }
        }
        
        return arr;
    }

    constructor(mainUpdate, initChar=" ", initCharColor="#000000", initBgColor="#FFFFFF") {
        this.mainUpdate = mainUpdate;
        this.points = TextGridRenderer.generateArr(initChar, initCharColor, initBgColor);
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

    setAllPoints(char=null, charColor=null, bgColor=null) {
        for (let r = 0; r < TextGridRenderer.ROWS; r++) {
            for (let c = 0; c < TextGridRenderer.COLS; c++) {
                this.setPoint(r, c, char, charColor, bgColor);
            }
        }
    }

    getFullString(newLine="\n") {
        let str = "";
        for (let r = 0; r < TextGridRenderer.ROWS; r++) {
            str = str.concat(this.points[r].map(p => p.char).join(""), newLine);
        }
        return str;
    }

    // initialization: create div filled with spans for each point and start updating the game.
    init(callback=null) {
        $(function(){
            let pointContainers = '<div id="game" style="font-family: monospace; font-size: 24px; padding: 0px">';
            for (let r = 0; r < TextGridRenderer.ROWS; r++) {
                for (let c = 0; c < TextGridRenderer.COLS; c++) {
                    pointContainers = pointContainers.concat(`<span id="r${r}c${c}" style="color: ${this.points[r][c].charColor}; background: ${this.points[r][c].bgColor};">${this.points[r][c].char}</span>`);
                }
                pointContainers = pointContainers.concat("<br>");
            }

            pointContainers = pointContainers.concat("</div>");

            $("body").append(pointContainers);

            if (callback != null) {
                callback();
            }
            this.update();
        }.bind(this));
    }

    // make sure update is called every UPDATE_DELAY, so queue the next update for the
    // future before the method executes. Ideally, update should be faster than UPDATE_DELAY.
    // Another way to design this would be to have it refresh as fast as possible,
    // instead of a fixed rate, by simply calling update after mainUpdate.
    update() {
        this.updateTimeout = setTimeout(this.update.bind(this), TextGridRenderer.UPDATE_DELAY);

        this.mainUpdate();
    }

    pause() {
        clearTimeout(this.updateTimeout);
    }

    resume() {
        this.update();
    }
}
