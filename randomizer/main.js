// Main script to configure the TextGridRenderer outside of its core implementation.

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let game = new TextGridRenderer(update, "@");
function update() {
    // randomize the chars and their colors
    for (let r = 0; r < TextGridRenderer.ROWS; r++) {
        for (let c = 0; c < TextGridRenderer.COLS; c++) {
            let char = null;
            let charColor = null;
            let bgColor = null;
            if (Math.random() < 0.1) { // only randomize some random chars not all of them
                char = Math.random().toString(36).substring(2, 3).toUpperCase();
            }
            if (Math.random() < 0.1) { // only randomize some random colors not all of them
                charColor = getRandomColor();
            }
            if (Math.random() < 0.1) { // only randomize some random bgColors not all of them
                bgColor = getRandomColor();
            }
            game.setPoint(r, c, char, charColor, bgColor);
        }
    }
}

$(function(){
    game.init();
});