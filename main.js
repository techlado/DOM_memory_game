const tilesContainer = document.querySelector(".tiles"); //Document Object Model
const colors = ["lightsteelblue", "darkgoldenrod", "khaki", "grey", "olivedrab", "steelblue", "darkslategray", "mediumaquamarine" ];
const colorsPicklist = [...colors, ...colors]; // spread operator: allows us to display each color twice
const tileCount = colorsPicklist.length;

///// Game State
let revealedCount = 0;
let activeTile = null; // the tile the user has initially clicked on, to be matched
let awaitingEndOfMove = false;

///// Build the tile
function buildTile(color) {
  const element = document.createElement("div"); // We are using the DOM to create new div/tiles
  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false"); // The tile is currently not revealed

  // User clicks
  element.addEventListener("click", () => { 
    const revealed = element.getAttribute("data-revealed");
    
    if (awaitingEndOfMove // Prevents User from revealing additional tiles while wrong tiles are converted back to black color
      || revealed === "true" // Prevents an already revealed tile from being used in the next move
      || element === activeTile) { //Prevents a double-click on the same tile from acting as a valid move
      return; 
    }
    // Otherwise, reveal the color
    element.style.backgroundColor = color; // applying inline CSS

    // Selecting the Primary match tile
    if (!activeTile) {
      activeTile = element; // activeTile is the Primary tile (the tile to match to)
      return; // the end of the primary tile move
    }

    ///// Match Logic
    const colorToMatch = activeTile.getAttribute("data-color");
    
    if (colorToMatch === color) { // If colors match,
      activeTile.setAttribute("data-revealed", "true"); // Both the active tile and 
      element.setAttribute("data-revealed", "true"); // the Primary tile are revealed.

      awaitingEndOfMove = false; // Clear the game state
      activeTile = null;
      revealedCount += 2; // and add two to the count.

      if (revealedCount === tileCount) { // If all tiles are revealed, alert the User
        alert("You Win! The DOM is an object that represents the HTML page seen in the web browser. JavaScript can access the DOM dynamically (after the HTML loads) to change the content, structure, and style of the webpage.");
        alert("These individual game tiles don't actually exist inside of the HTML document--they were born and live their lives inside of the JavaScript file! Neat!");
        alert("Thanks for playing, and learning about DOM! Refresh to play again.");
      }

      return;
    }

    // Match attempt
    awaitingEndOfMove = true; // Prevent additional tiles from being clicked on
    setTimeout(() => {
      element.style.backgroundColor = null; // Clear both the primary tile and the selected match tile
      activeTile.style.backgroundColor = null;

      awaitingEndOfMove = false; // Reset the tiles so User may try again
      activeTile = null;

    }, 1000); //after 1 second, hide the incorrectly matched tiles

  })
  
  return element;
}

// Rendering the Tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length); // Select a random index of the colorsPicklist array
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color);

  colorsPicklist.splice(randomIndex, 1);

  tilesContainer.appendChild(tile); // Dynamically add tiles to the HTML
  
}

