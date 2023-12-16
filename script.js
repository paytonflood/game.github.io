// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the player object with initial position and dimensions
let player = { x: 50, y: 200, width: 50, height: 50 };

// Array to store obstacles
const obstacles = [];

// Score variable
let score = 0;

// Game loop function that continuously updates and renders the game
function gameLoop() {
    update(); // Update game logic
    render(); // Render the game
    requestAnimationFrame(gameLoop); // Call the next frame
}

// Event handlers for keyboard input
function handleKeyDown(event) {
    event.preventDefault();
    switch (event.key) {
            case 'w':
            player.y -= 50; // Adjust the upward speed as needed
            break;
        case 's':
            player.y += 50; // Adjust the downward speed as needed
            break;
    }
}

function handleKeyUp(event) {
    event.preventDefault();
    switch (event.key) {
        case 'w':
        case 's':
            // Reset the vertical speed when the key is released
            break;
    }
}

// Function to create a new obstacle and add it to the array
function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 20), // Adjust as needed
        width: 20,
        height: 20,
    };
    obstacles.push(obstacle);
}

// Function to update obstacle positions and check for collisions
function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 5; // Adjust the speed of obstacles as needed

        // Remove obstacles that are off the screen
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            i--;
            score++; // Increase the score when an obstacle is passed
        }
    }

    // Generate a new obstacle with a certain probability
    if (Math.random() < 0.02) {
        createObstacle();
    }
}

// Function to render obstacles on the canvas
function renderObstacles() {
    ctx.fillStyle = 'red';
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    }
}

// Update function that is called in the game loop
function update() {
    // Update player position based on input
    if (player.y > 0) {
        player.y += 2; // Adjust the player's upward speed as needed
    }

    updateObstacles(); // Update obstacle positions
    checkCollisions(); // Check for collisions
    // Implement other game logic here
}

// Function to update the score based on game progress
function updateScore() {
    // Update the score based on game progress
}

// Function to check for collisions between the player and obstacles
function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ) {
            // Collision detected: End the game or handle collisions
            console.log('Collision detected! Game Over');
            resetGame(); // Implement this function to reset the game
        }
    }
}

// Reset function to restart the game after a collision
function resetGame() {
    player.y = 200;
    obstacles.length = 0;
    score = 0;
}

// Function to render the game elements on the canvas
function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    renderObstacles();

    // Render score and other UI elements
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Event listeners for keyboard input
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Start the game loop
gameLoop();
