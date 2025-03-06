let currentUser;

/**
 * Initializes the summary page by loading user data, 
 * setting the current user, and rendering the page.
 */
async function initSummaryPage() {
    await loadUserData();
    setCurrentUser();
    renderPage();
    showGreetingOnce(); // Decide whether to show greeting overlay or not
}

/**
 * Loads user data (e.g., from a database or API).
 */
async function loadUserData() {
    await getUsersData(); // This function is assumed to exist elsewhere
}

/**
 * Reads the user ID from localStorage and sets `currentUser`.
 */
function setCurrentUser() {
    let currentUserId = localStorage.getItem('currentUserId');
    if (!users || !users.users) {
        console.error("User data is not loaded.");
        return;
    }
    currentUser = users.users[currentUserId] || {};
}

/**
 * Renders the main page by rendering a desktop template,
 * summary content, and greeting message.
 */
function renderPage() {
    renderDesktopTemplate();
    renderSummaryContent();
    greetingMessage();
}

/**
 * Renders the desktop template into the element with the ID 'templateSection'.
 */
function renderDesktopTemplate() {
    let content = document.getElementById('templateSection');
    content.innerHTML = getDesktopTemplate(currentUser);
}

/**
 * Ensures `currentUser` and `currentUser.tasks` exist.
 * If not, they will be initialized as empty objects.
 */
function checkAndInitializeUserTasks() {
    if (!currentUser || !currentUser.tasks) {
        console.warn("No tasks found or current user is not defined.");
        currentUser = currentUser || {};
        currentUser.tasks = currentUser.tasks || {};
    }
}

/**
 * Returns the current user's tasks as an array.
 */
function getCurrentUserTasksAsArray() {
    return Object.values(currentUser.tasks);
}

/**
 * Filters tasks by a given status (e.g., "toDo", "done").
 */
function filterTasksByStatus(tasks, status) {
    return tasks.filter(task => task.currentStatus === status);
}

/**
 * Filters tasks by a given priority (e.g., "Urgent").
 */
function filterTasksByPrio(tasks, prio) {
    return tasks.filter(task => task.prio === prio);
}

/**
 * Renders the summary content (task overviews) into 'newContentSection'.
 */
function renderSummaryContent() {
    checkAndInitializeUserTasks();
    const tasks = getCurrentUserTasksAsArray();
    const toDoTasks = filterTasksByStatus(tasks, "toDo");
    const ipTasks = filterTasksByStatus(tasks, "inProgress");
    const afTasks = filterTasksByStatus(tasks, "awaitFeedback");
    const doneTasks = filterTasksByStatus(tasks, "done");
    const urgentTasks = filterTasksByPrio(tasks, "Urgent");
    const allTasksCount = tasks.length;

    document.getElementById('newContentSection').innerHTML = getSummaryContent(
        toDoTasks,
        doneTasks,
        urgentTasks,
        allTasksCount,
        ipTasks,
        afTasks
    );
}

/**
 * Displays a time-based greeting with the user's name.
 */
function greetingMessage() {
    let greetingSection = document.getElementById('greetingSpot');
    const currentHour = new Date().getHours();
    const greeting = getTimeBasedGreeting(currentHour);
    const userName = currentUser && currentUser.firstName 
        ? `${currentUser.firstName} ${currentUser.lastName}` 
        : "Guest";

    greetingSection.innerHTML = `
        <span class="greeting-time">${greeting},</span>
        <span class="greeting-name">${userName}</span>
    `;
}

/**
 * Returns a greeting string based on the current hour.
 */
function getTimeBasedGreeting(hour) {
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

/**
 * Redirects to 'board.html'.
 */
function changeWindowToBoardSection() {
    window.location.href = "board.html";
}


/**
 * Decides whether to show the greeting overlay or not.
 * If 'wasGreeted' in localStorage is 'true', hide the overlay.
 * Otherwise, show it and set the flag.
 */
function showGreetingOnce() {
    const wasGreeted = localStorage.getItem('wasGreeted');

    if (wasGreeted === 'true') {
        // User was already greeted => hide overlay
        hideGreetingOverlay();
    } else {
        // User not greeted yet => show overlay and set flag
        showGreetingOverlay();
        localStorage.setItem('wasGreeted', 'true');
    }
}

/**
 * Shows the greeting overlay (e.g., by setting display: flex/ block).
 * Make sure the element with ID 'greetingMessageSection' exists in HTML.
 */
function showGreetingOverlay() {
    let greetingOverlay = document.getElementById('greetingMessageSection');
    if (greetingOverlay) {
        greetingOverlay.style.display = 'flex'; // or 'block'
    }
}

/**
 * Hides the greeting overlay (e.g., by setting display: none).
 */
function hideGreetingOverlay() {
    let greetingOverlay = document.getElementById('greetingMessageSection');
    if (greetingOverlay) {
        greetingOverlay.style.display = 'none';
    }
}
