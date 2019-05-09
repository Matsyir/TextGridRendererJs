// Main script to configure the TextGridRenderer outside of its core implementation.

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

Object.defineProperty(TextGridRenderer, "UPDATE_DELAY", { value: 20, writable: false });
Object.defineProperty(TextGridRenderer, "ROWS", { value: 24, writable: false });
Object.defineProperty(TextGridRenderer, "COLS", { value: 48, writable: false });

let game = new TextGridRenderer(update, "@");
const target = "SWAG";
function update() {
    // randomize the chars and their colors
    for (let r = 0; r < TextGridRenderer.ROWS; r++) {
        for (let c = 0; c < TextGridRenderer.COLS; c++) {
            let char = null;
            let charColor = null;
            let bgColor = null;
            if (Math.random() < 0.3) { // only randomize some random chars not all of them
                char = Math.random().toString(36).substring(2, 3).toUpperCase();
            }
            if (Math.random() < 0.3) { // only randomize some random colors not all of them
                charColor = getRandomColor();
            }
            if (Math.random() < 0.3) { // only randomize some random bgColors not all of them
                bgColor = getRandomColor();
            }
            game.setPoint(r, c, char, charColor, bgColor);
        }
    }

    let targIndex = game.getFullString("").indexOf(target);
    if (targIndex >= 0) {
        game.setAllPoints(null, "rgba(255, 255, 255, 0.2)", "#000000");
        for (let i = 0; i < target.length; i++) {
            game.setPoint(Math.floor((targIndex + i) / TextGridRenderer.COLS), (targIndex + i) % TextGridRenderer.COLS, null, "#FFFFFF", "#000000");
        }
        game.pause();
    }
}

game.init();
