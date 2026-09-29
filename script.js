/**
 * Game Logic for "Game"
 * A reaction-speed based clicker game.
 */

document.addEventListener('DOMContentLoaded', () => {
    // State variables
    let score = 0;
    let timeLeft = 30;
    let gameInterval = null;
    let isGameRunning = false;

    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over-screen');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const finalScoreDisplay = document.getElementById('final-score');
    const gameField = document.getElementById('game-field');

    /**
     * Switches visibility between the three main screens
     * @param {HTMLElement} screenToShow
     */
    function showScreen(screenToShow) {
        [startScreen, gameScreen, gameOverScreen].forEach(screen => {
            screen.classList.remove('active');
        });
        screenToShow.classList.add('active');
    }

    /**
     * Initializes a new game session
     */
    function startGame() {
        score = 0;
        timeLeft = 30;
        isGameRunning = true;

        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;

        showScreen(gameScreen);
        spawnTarget();
        startTimer();
    }

    /**
     * Manages the countdown timer
     */
    function startTimer() {
        gameInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    /**
     * Handles the game over state
     */
    function endGame() {
        clearInterval(gameInterval);
        isGameRunning = false;

        // Remove any existing target
        gameField.innerHTML = '';

        finalScoreDisplay.textContent = score;
        showScreen(gameOverScreen);
    }

    /**
     * Creates a target element at a random position within the field
     */
    function spawnTarget() {
        // Clear previous targets
        gameField.innerHTML = '';

        if (!isGameRunning) return;

        const target = document.createElement('div');
        target.className = 'target';

        // Calculate random position
        // Subtract target size (60px) to ensure it stays within bounds
        const fieldWidth = gameField.clientWidth;
        const fieldHeight = gameField.clientHeight;

        const maxX = fieldWidth - 60;
        const maxY = fieldHeight - 60;

        const randomX = Math.max(0, Math.floor(Math.random() * maxX));
        const randomY = Math.max(0, Math.floor(Math.random() * maxY));

        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;

        // Target interaction
        const handleHit = (e) => {
            e.preventDefault(); // Prevent zooming/scrolling on mobile
            score++;
            scoreDisplay.textContent = score;
            spawnTarget();
        };

        target.addEventListener('mousedown', handleHit);
        target.addEventListener('touchstart', handleHit, { passive: false });

        gameField.appendChild(target);
    }

    // Event Listeners
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
