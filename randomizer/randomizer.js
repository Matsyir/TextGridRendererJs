// Main script to configure the TextGridRenderer outside of its core implementation.

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let game = new TextGridRenderer(update, true, "@");
function update() {
    // randomize the chars and their colors
    for (let y = 0; y < TextGridRenderer.ROWS; y++) {
        for (let x = 0; x < TextGridRenderer.COLS; x++) {
            let char = null;
            let charColor = null;
            let bgColor = null;
            if (Math.random() < 0.333) { // only randomize some random chars not all of them
                char = Math.random().toString(36).substring(2, 3).toUpperCase();
            }
            if (Math.random() < 0.333) { // only randomize some random colors not all of them
                charColor = getRandomColor();
            }
            if (Math.random() < 0.333) { // only randomize some random bgColors not all of them
                bgColor = getRandomColor();
            }
            game.setPoint(x, y, char, charColor, bgColor);
        }
    }
}

game.init(function(){
    $("body").append("<br><input type='button' id='pause' value='Pause'>&nbsp;<input type='button' id='resume' value='Resume'>");

    $("#pause").click(function() { game.pause(); });
    $("#resume").click(function() { game.resume(); });
}.bind(this));