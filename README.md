# TextGridRendererJs
Simple text grid renderer in js to constantly update a grid of characters, and their colors / background colors. Currently it is configured to just randomize some of the character's properties every update.

Initially just wanted to try some stuff with JavaScript string templates - that turned out to be horribly inefficient (not the string templates themselves, but the way I was using them in this context). I decided to optimize it and make it work because it's a fun concept to play around with.

## Examples
Randomizer: https://gfycat.com/jitterycheerycentipede : https://matsyir.github.io/TextGridRendererJs/randomizer/
Core renderer initialized: https://matsyir.github.io/TextGridRendererJs/

## Usage
- The size of the grid can be changed by changing the `TextGame.ROWS` and `TextGame.COLS` static constants.
- Most of the ongoing logic happens in `TextGame.update()`. So, call your game logic in there, regardless if you implement it directly there or use a separate class.
- Ideally, `TextGame.update()` should not take longer to execute than `TextGame.UPDATE_DELAY` (in ms).
- Do not set any of the main game properties unless you understand what exactly you're doing. For example, use `game.setPoint(r, c, char, charColor, bgColor)` instead of `game.points[r][c] = new TextGamePoint(char, charColor, bgColor)`.

## How it works
`TextGame.init()` generates a `<div>` filled with `<span>`s with HTML id's to represent a 2D array of TextGamePoints, which hold a character, its color and its background color. The HTML id's format is: `r{rowIndex}c{colIndex}`.
Those properties can be fetched from the 2D array without processing the html elements.
