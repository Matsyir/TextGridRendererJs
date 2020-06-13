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

    static get REALTIME_DELAY() { return 0.2; } // used when realtime = true
    // in theory, true 'realtime' would be 0 delay between update executions, but
    // that crashes the page. 0.2ms is very small.
    static get UPDATE_DELAY() { return 10; } // only used if realtime = false

    // These rows and columns with the default settings have a ratio of ~16.5:9, as
    // close to 16:9 as possible. Not exactly possible since the characters have a
    // width height ratio of approx. 1:1.9458
    static get ROWS() { return 10; }
    static get COLS() { return 36; }

    static setUpdateDelay(newVal) {
        Object.defineProperty(TextGridRenderer, "UPDATE_DELAY", { value: newVal, writable: false });
    }
    static setRows(newVal) {
        Object.defineProperty(TextGridRenderer, "ROWS", { value: newVal, writable: false });
    }
    static setCols(newVal) {
        Object.defineProperty(TextGridRenderer, "COLS", { value: newVal, writable: false });
    }

    // Generate an array of TextGamePoints based on the static size.
    static generateArr(initChar=" ", initTextColor="#000000", initBgColor="#FFFFFF") {
        let arr = [];
        for (let y = 0; y < this.ROWS; y++) {
            arr[y] = [];
            for (let x = 0; x < this.COLS; x++) {
                arr[y][x] = new TextGridPoint(initChar, initTextColor, initBgColor);
            }
        }
        
        return arr;
    }

    // Passed in is: the main update function (the implementation logic)
    // 'realtime' bool: if true, the update function will be instantly called 0.2ms after
    // the implementation logic is done executing, rather than queuing it at a fixed interval.
    // Aside that, the init char, color and bgColor is sent (has default values)
    constructor(mainUpdate, realtime=true, initChar=" ", initCharColor="#000000", initBgColor="#FFFFFF") {
        this.realtime = realtime;
        this.mainUpdate = mainUpdate;
        this.points = TextGridRenderer.generateArr(initChar, initCharColor, initBgColor);
        this.updateTimeout = null;
        this.paused = null;
    }

    getPointContainer(x, y) {
        return $(`#y${y}x${x}`);
    }
    getPointChar(x, y) {
        return this.points[y][x].char;
    }
    getPointCharColor(x, y) {
        return this.points[y][x].charColor;
    }
    getPointBgColor(x, y) {
        return this.points[y][x].bgColor;
    }    

    setPoint(x, y, char=null, charColor=null, bgColor=null) {
        let pointContainer = this.getPointContainer(x, y);
        if (char != null) {
            this.points[y][x].char = char;
            pointContainer.text(char);
        }
        if (charColor != null) {
            this.points[y][x].charColor = charColor;
            pointContainer.css("color", charColor);
        }
        if (bgColor != null) {
            this.points[y][x].bgColor = bgColor;
            pointContainer.css("background", bgColor);
        }
    }

    setAllPoints(char=null, charColor=null, bgColor=null) {
        for (let y = 0; y < TextGridRenderer.ROWS; y++) {
            for (let x = 0; x < TextGridRenderer.COLS; x++) {
                this.setPoint(x, y, char, charColor, bgColor);
            }
        }
    }

    getFullString(newLine="\n") {
        return game.points.reduce((str, row) => {
            str += row.reduce((t, c) => {
                t += c.char;
                return t;
            }, "");
            return str + newLine;
        }, "");
    }

    pause() {
        this.paused = true;
        clearTimeout(this.updateTimeout);
    }

    resume() {
        this.paused = false;
        this.update();
    }

    // initialization: create div filled with spans for each point and start updating the grid.
    init(callback=null, appendedTo="body") {
        $(function(){
            let pointContainers = '<div id="textGridRendererJs" style="font-family: monospace; font-size: 24px; padding: 0px; width: fit-content;">';
            for (let y = 0; y < TextGridRenderer.ROWS; y++) {
                for (let x = 0; x < TextGridRenderer.COLS; x++) {
                    pointContainers = pointContainers.concat(`<span id="y${y}x${x}" style="color: ${this.points[y][x].charColor}; background: ${this.points[y][x].bgColor};">${this.points[y][x].char}</span>`);
                }
                pointContainers = pointContainers.concat("<br>");
            }

            pointContainers = pointContainers.concat("</div>");

            $(appendedTo).append(pointContainers);
            this.paused = false;

            if (callback != null) {
                callback();
            }
            this.update();
        }.bind(this));
    }
    
    update() {
        if (this.paused) {
            return;
        }

        // if !realtime, make sure update is called every UPDATE_DELAY, so queue the next
        // update for the future before the method executes. Ideally, update should be
        // faster than UPDATE_DELAY.
        if (!this.realtime) {
            this.updateTimeout = setTimeout(this.update.bind(this), TextGridRenderer.UPDATE_DELAY);
        }

        this.mainUpdate();

        // if realtime, recall update instantly after.
        if (this.realtime) {
            // it executes too fast and crashes the page if it is instantly
            // called after execution, so delay execution by 0.2ms.
            this.updateTimeout = setTimeout(this.update.bind(this), TextGridRenderer.REALTIME_DELAY);
        }
    }
}