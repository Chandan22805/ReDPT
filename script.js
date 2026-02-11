 let deadlines =[];

function initApp(){
    loadData();
    recomputeStatuses();
    renderApp();
};

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

    // 1 month = 30 days
    const days = totalDays % 30;
    const months = Math.floor(totalDays / 30);

    // Red boxes for months
    for (let i = 0; i < months; i++) {
        const box = document.createElement("div");
        box.className = "day-box month";
        boxes.appendChild(box);
    }

    // Green boxes for remaining days
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

    // Normalize types
    for (let d of deadlines) {
        d.dueDate = Number(d.dueDate);   // ensure it's a number
        d.createdAt = Number(d.createdAt);

        if (d.completed === undefined) {
            d.completed = false;
        }
    }

    console.log("Loaded & normalized:", deadlines);
}


function saveData(){
    localStorage.setItem("deadlines", JSON.stringify(deadlines));
};

function generateId(){
    return "DL"+Date.now();
}

function promptAdd() {
  const title = prompt("Title?");
  if (!title) return;

  const description = prompt("Description?") || "";

  const dueDateStr = prompt("Due date? (YYYY-MM-DD)");
  if (!dueDateStr) return;

  // Convert date string to timestamp
  const due = new Date(dueDateStr).getTime();

  if (isNaN(due)) {
    alert("Invalid date format. Use YYYY-MM-DD");
    return;
  }

  addDeadline({
    title: title,
    description: description,
    dueDate: due
  });
}


function addDeadline(data){
    const now = Date.now();
    const due = Number(data.dueDate);
    const newDeadline = {
        id             : generateId(),
        title          : data.title,
        description    : data.description,
        createdAt      : now,
        dueDate        : due,
        status         : now < due ? 'Active' : 'Failed',
        completedAt    : null,
        completed      : false,
        daysRemaining  : calculateDaysRemaining(due)
    }
    deadlines.push(newDeadline);
    saveData();
    renderApp();
};

function recomputeStatuses(){
    const now = Date.now();
    for(let i=0; i<deadlines.length; i++){
        deadlines[i].daysRemaining = calculateDaysRemaining(deadlines[i].dueDate);
        if(!deadlines[i].completed)
            deadlines[i].status = now < deadlines[i].dueDate ? "Active" : "Failed";
    }
    saveData();
    renderApp();
};

function editDeadline(id, dueDate){
    for (let d1 of deadlines) {
        if (d1.id === id) {
            d1.dueDate = dueDate;
            d1.daysRemaining = calculateDaysRemaining(dueDate);
        }
    }
    recomputeStatuses();
    saveData();
    renderApp();
};

function deleteDeadline(id){
    deadlines = deadlines.filter(dl => dl.id !== id);
    saveData();
    renderApp();
};

function markCompleted(id){
    for(let d1 of deadlines){
        if(d1.id===id){
            d1.completed = true;
            d1.completedAt = Date.now();
            d1.status = "Completed"; 
        }
    }
    saveData();
    renderApp();
};

function calculateDaysRemaining(dueDate){
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.ceil((dueDate - Date.now()) / msInDay);
};
