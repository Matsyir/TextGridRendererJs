// Main script to configure the TextGridRenderer outside of its core implementation.

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

}
TextGridRenderer.setRows(24);
TextGridRenderer.setCols(48);

let game = new TextGridRenderer(update, true, "@");
const targetWords = ["HELLO", "SWAG", "WAHOO", "123456789", "JAVASCRIPT"];
function update() {
    // randomize the chars and their colors
    for (let x = 0; x < TextGridRenderer.COLS; x++) {
        for (let y = 0; y < TextGridRenderer.ROWS; y++) {
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
            game.setPoint(x, y, char, charColor, bgColor);
        }
    }

    let targIndex = -1;
    let foundWordIndex = -1;
    let gameStr = game.getFullString("");
    for (let i = 0; i < targetWords.length; i++) {
        targIndex = gameStr.indexOf(targetWords[i]);
        if (targIndex >= 0) {
            foundWordIndex = i;
            break;
        }
    }
    if (targIndex >= 0) {
        game.setAllPoints(null, "rgba(255, 255, 255, 0.2)", "#000000");
        for (let i = 0; i < targetWords[foundWordIndex].length; i++) {
            game.setPoint((targIndex + i) % TextGridRenderer.COLS,
                Math.floor((targIndex + i) / TextGridRenderer.COLS),
                null, "#FFFFFF", "#000000");
        }
        game.pause();
    }
}

game.init(function() {
    $("body").append("<br><input type='button' id='pause' value='Pause'>&nbsp;<input type='button' id='resume' value='Resume'>");

    $("#pause").click(function() { game.pause(); });
    $("#resume").click(function() { game.resume(); });
}.bind(this));
