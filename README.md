# TextGridRendererJs
Simple text grid renderer in js to constantly update a grid of characters, and their colors / background colors (if changed). Could be used for all kinds of applications, even as the core for something more complex, like a text based game or a terminal style program.

Initially just wanted to try some stuff with JavaScript string templates, with the idea of a text based game in mind - that turned out to be horribly inefficient (not the string templates themselves, but the way I was using them in this context). I decided to optimize it and make it work because it's a fun concept to play around with.

## Examples
RandomizerFinder (warning: realtime execution - very high CPU load): https://matsyir.github.io/TextGridRendererJs/randomizerFinder/  
Randomizer (warning: realtime execution - high CPU load): https://gfycat.com/jitterycheerycentipede ~ https://matsyir.github.io/TextGridRendererJs/randomizer/  
This one's kind of a stress test. It looks pretty cool.

Core renderer initialized: https://matsyir.github.io/TextGridRendererJs/  
Nothing special with this one, it's just the blank canvas of the core renderer without any implementation logic.

## Usage
When referring to `game`, I mean an instance of `TextGridRenderer`.
- The core renderer is in the root of the repo, under `textGridRenderer.js`, logic/initialization implemented in `main.js`, loaded by `index.html`. For example of an implementation, see the randomizer example: you do not need to edit `textGridRenderer.js`, only change the implementation logic in `game.update()` (and maybe `game.init()`) in `main.js`.
- The game is created and started by calling `game.init()`. The constructor prepares it, but does not actually create it.
- The size of the grid or update rate can be changed by calling the static setters `TextGridRenderer.changeConst_ROWS()` or manually changing the `TextGridRenderer.ROWS` and `TextGridRenderer.COLS` static constants in the core renderer.
- Write your update logic in the function passed to the renderer's constructor.
- Ideally, `TextGridRenderer.update()` should not take longer to execute than `TextGridRenderer.UPDATE_DELAY` (in ms).
- Do not set any of the main game properties unless you understand what exactly you're doing. For example, use `game.setPoint(r, c, char, charColor, bgColor)` instead of `game.points[r][c] = new TextGridPoint(char, charColor, bgColor)`, because, in this case, it would not update the actual html elements, only the data saved in the javascript array.

## How it works
`TextGridRenderer.init()` generates a `<div>` filled with `<span>`s with HTML id's to represent a 2D array of TextGridPoints (created in the constructor), which hold a character, its color and its background color. Those properties can be fetched from the 2D array without processing the html elements. The HTML id's format is: `r{rowIndex}c{colIndex}`.  
It currently uses jQuery for ease of implementation, but it's not a massive amount, it could easily be translated to pure js.
