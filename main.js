// Main script to configure the TextGridRenderer outside of its core implementation.
let game = new TextGridRenderer(update, true, "@");
function update() {
    
}

game.init(function(){
    $("body").append("<br><input type='button' id='pause' value='Pause'>&nbsp;<input type='button' id='resume' value='Resume'>");

    $("#pause").click(function() { game.pause(); });
    $("#resume").click(function() { game.resume(); });
}.bind(this));