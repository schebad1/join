function getSummaryContent(toDoTasks, doneTasks, urgentTasks, numberOfallTasks, ipTasks, afTasks) {
    return `
    <div class="new">
        <div class="join-title">
            <span class="join-title-span">JOIN 360</span>
            <div class="seperator"></div>
            <span class="subheadline-span">Key Metrics at a Glance</span>
        </div>
        <div class="main-summary-section">
            <div class="complete-quarter-section">
                <div onclick="summaryToBoard()" class="to-do-and-done-section">
                    <div onclick="changeWindowToBoardSection()" class="to-do-quarter">
                        <div class="circle-dark-blue"><img src="./assets/img/pencil.svg" alt=""></div>
                        <div class="to-do-quarter-details">
                            <span class="number">${toDoTasks.length}</span>
                            <span class="quarter-description">To-do</span>
                        </div>
                    </div>
                    <div onclick="changeWindowToBoardSection()" class="to-do-quarter">
                        <div class="circle-dark-blue"><img src="./assets/img/Vector (1).svg" alt=""></div>
                        <div class="to-do-quarter-details">
                            <span class="number">${doneTasks.length}</span>
                            <span class="quarter-description">Done</span>
                        </div>
                    </div>
                </div>
                <div onclick="changeWindowToBoardSection()" class="urgent-deadline-section-container">
                    <div class="urgent-deadline-secction">
                        <div class="urgent-deadline-quarter">
                            <div class="circle-red"><img src="./assets/img/arrowUp.svg" alt=""></div>
                            <div class="to-do-quarter-details">
                                <span class="number">${urgentTasks.length}</span>
                                <span class="quarter-description">Urgent</span>
                            </div>
                        </div>
                        <div class="seperator-grey"></div>
                        <div class="date-section">
                            <span class="date-span">October 16, 2022</span>
                            <span class="date-message-span">Upcoming Deadline</span>
                        </div>
                    </div>
                </div>
                <div class="task-feedback-section">
                    <div onclick="changeWindowToBoardSection()" class="tasks-board-container-section">
                        <div class="tasks-board-container">
                            <div class="number-and-description">
                                <span class="number">${numberOfallTasks}</span>
                                <span class="task-section-span">Tasks in Board</span>
                            </div>
                        </div>
                    </div>
                    <div onclick="changeWindowToBoardSection()" class="tasks-progress-container-section">
                        <div class="task-progress-container">
                            <span class="number">${ipTasks.length}</span>
                            <span class="task-section-span">Tasks in Progress</span>
                        </div>
                    </div> 
                    <div onclick="changeWindowToBoardSection()" class="feedback-section-container">
                        <div class="feedback-section">
                            <span class="number">${afTasks.length}</span>
                            <span class="task-section-span">Awaiting Feedback</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="greetingMessageSection" class="greeting-meesage-section">
                <div id="greetingSpot" class="greeting-spot">
                </div>
            </div>
        </div>
    </div>
    <div id="rotateWarning" class="rotate-overlay hide">
    <div class="rotate-message">
      <h2>Bitte drehe dein Gerät</h2>
      <p>Um unsere Seite optimal zu nutzen, verwende bitte das Hochformat.</p>
    </div>
    </div>`;
}
