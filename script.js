let deadlines = [];

function generateId(){
    return "DL" + Date.now() + "_" + Math.random().toString(36).slice(2);
}

function initApp(){
    loadData();

    // Seed only if storage is empty
    if (deadlines.length === 0) {
        deadlines.push(makeDeadline({
            title: "Placement related Courses",
            description: "Happys days await",
            dueDate: new Date(2026, 4, 31).getTime()
        }));

        deadlines.push(makeDeadline({
            title: "CAT-2 Web Tech Notes",
            description: "ES6 and CRUD",
            dueDate: new Date(2026, 3, 15).getTime()
        }));

        saveData();
    }

    recomputeStatuses();
    renderApp();
}

function makeDeadline(data){
    const now = Date.now();
    const due = Number(data.dueDate);
    return {
        id: generateId(),
        title: data.title,
        description: data.description,
        createdAt: now,
        dueDate: due,
        status: now < due ? "Active" : "Failed",
        completedAt: null,
        completed: false,
        daysRemaining: calculateDaysRemaining(due)
    };
}

function renderApp() {
    const list = document.getElementById("deadlinesList");
    list.replaceChildren();

    for (let d of deadlines) {
        const card = document.createElement("div");
        card.className = "deadline";

        const title = document.createElement("h3");
        title.textContent = d.title;

        const status = document.createElement("div");
        status.className = "status";
        status.textContent = `${d.status} • ${d.daysRemaining} days`;

        const boxes = document.createElement("div");
        boxes.className = "days-boxes";

        const totalDays = Math.max(0, d.daysRemaining);
        const days = totalDays % 30;
        const months = Math.floor(totalDays / 30);

        for (let i = 0; i < months; i++) {
            const box = document.createElement("div");
            box.className = "day-box month";
            boxes.appendChild(box);
        }

        for (let i = 0; i < days; i++) {
            const box = document.createElement("div");
            box.className = "day-box day";
            boxes.appendChild(box);
        }

        const actions = document.createElement("div");
        actions.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.onclick = () => markCompleted(d.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteDeadline(d.id);

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(title);
        card.appendChild(status);
        card.appendChild(boxes);
        card.appendChild(actions);

        list.appendChild(card);
    }
}

function loadData(){
    deadlines = JSON.parse(localStorage.getItem("deadlines")) || [];

    for (let d of deadlines) {
        d.dueDate = Number(d.dueDate);
        d.createdAt = Number(d.createdAt);
        if (d.completed === undefined) d.completed = false;
    }
}

function saveData(){
    localStorage.setItem("deadlines", JSON.stringify(deadlines));
}

function addDeadline(data){
    deadlines.push(makeDeadline(data));
    saveData();
    recomputeStatuses();
    renderApp();
}

function recomputeStatuses(){
    const now = Date.now();
    for (let d of deadlines) {
        d.daysRemaining = calculateDaysRemaining(d.dueDate);
        if (!d.completed) {
            d.status = now < d.dueDate ? "Active" : "Failed";
        }
    }
    saveData();
}

function deleteDeadline(id){
    deadlines = deadlines.filter(d => d.id !== id);
    saveData();
    renderApp();
}

function markCompleted(id){
    for (let d of deadlines) {
        if (d.id === id) {
            d.completed = true;
            d.completedAt = Date.now();
            d.status = "Completed";
        }
    }
    saveData();
    renderApp();
}

function calculateDaysRemaining(dueDate){
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.ceil((dueDate - Date.now()) / msInDay);
}
