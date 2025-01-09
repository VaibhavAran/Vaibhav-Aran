// Meditation Timer
let meditationTimer;
let isMeditationActive = false;
let initialDuration = 0;

document.getElementById('meditation-start').addEventListener('click', startMeditationTimer);
document.getElementById('meditation-pause').addEventListener('click', pauseMeditation);
document.getElementById('meditation-reset').addEventListener('click', resetMeditation);

function startMeditationTimer() {
    const duration = document.getElementById('meditation-duration').value * 60;
    if (!duration) {
        alert('Please set a duration.');
        return;
    }
    initialDuration = duration;
    isMeditationActive = true;
    document.getElementById('meditation-message').textContent = '';
    updateTimerDisplay(duration);
    meditationTimer = setInterval(() => {
        if (!isMeditationActive) return;
        if (initialDuration > 0) {
            initialDuration--;
            updateTimerDisplay(initialDuration);
        } else {
            clearInterval(meditationTimer);
            document.getElementById('meditation-message').textContent = "Meditation time is over.";
        }
    }, 1000);
}

function pauseMeditation() {
    isMeditationActive = false;
}

function resetMeditation() {
    clearInterval(meditationTimer);
    initialDuration = 0;
    isMeditationActive = false;
    updateTimerDisplay(0);
    document.getElementById('meditation-message').textContent = '';
}

function updateTimerDisplay(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    document.getElementById('meditation-timer-display').textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// To-Do List
document.getElementById('add-todo').addEventListener('click', addTodo);

function addTodo() {
    const input = document.getElementById('todo-input');
    if (input.value.trim() === "") return;
    
    const todoList = document.getElementById('todo-items');
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `<span>${input.value}</span><input type="checkbox">`;
    todoList.appendChild(todoItem);
    input.value = '';
}

// Goals
document.getElementById('add-goal').addEventListener('click', addGoal);

function addGoal() {
    const goalInput = document.getElementById('goal-input').value.trim();
    if (goalInput) {
        const goalList = document.getElementById('goal-list');
        const newGoal = document.createElement('div');
        newGoal.classList.add('goal-item');
        newGoal.innerHTML = `<span>${goalInput}</span><input type="checkbox" onclick="toggleGoalCompletion(this)">`;
        goalList.appendChild(newGoal);
        document.getElementById('goal-input').value = '';
    }
}

function toggleGoalCompletion(checkbox) {
    const goalItem = checkbox.parentElement;
    const goalText = goalItem.querySelector('span');
    if (checkbox.checked) {
        goalText.style.textDecoration = 'line-through';
        goalText.style.color = '#bbb';
    } else {
        goalText.style.textDecoration = 'none';
        goalText.style.color = '#333';
    }
}

// Gratitude Journal
document.getElementById('save-gratitude').addEventListener('click', saveGratitude);

function saveGratitude() {
    const input = document.getElementById('gratitude-input').value.trim();
    if (!input) return;
    
    const display = document.getElementById('gratitude-display');
    const newEntry = document.createElement('div');
    newEntry.classList.add('gratitude-entry');
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    newEntry.textContent = `${formattedDate} - ${input}`;
    display.appendChild(newEntry);
    document.getElementById('gratitude-input').value = '';
}

// Mini Challenges
document.getElementById('add-mini-challenge').addEventListener('click', addMiniChallenge);

function addMiniChallenge() {
    const input = document.getElementById('mini-challenge-input').value.trim();
    if (input) {
        const miniList = document.getElementById('mini-challenges-list');
        const newChallenge = document.createElement('div');
        newChallenge.classList.add('mini-challenge-item');
        newChallenge.innerHTML = `<span>${input}</span><button onclick="completeMiniChallenge(this)">Complete</button>`;
        miniList.appendChild(newChallenge);
        document.getElementById('mini-challenge-input').value = '';
    }
}

function completeMiniChallenge(button) {
    const challengeItem = button.parentElement;
    challengeItem.innerHTML = `<span>${challengeItem.querySelector('span').textContent} - Completed</span>`;
    challengeItem.classList.add('completed-challenge');
}
