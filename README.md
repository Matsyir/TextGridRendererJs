# TextBasedGameJs
Simple text grid renderer in js to constantly update a grid of characters, and their colors / background colors. Currently it is configured to just randomize some of the character's properties every update.

Initially just wanted to try some stuff with JavaScript string templates - that turned out to be horribly inefficient (not the string templates themselves, but the way I was using them in this context). I decided to optimize it and make it work because it's a cool concept to play around with.


## Usage

- The size of the grid can be changed by changing the TextGame.ROWS and TextGame.COLS static constants.
- Ideally, update() should not take longer to execute than TextGame.UPDATE_DELAY (in ms).
- Most of the ongoing logic happens in TextGame.update(). So, call your game logic in there, regardless if you implement it directly there or use a separate class.
