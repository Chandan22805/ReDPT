 let deadlines =[];

function initApp(){
    loadData();
    recomputeStatuses();
    renderApp();
};

function renderApp(){
    console.log(deadlines);
};

function loadData(){
    deadlines = JSON.parse(localStorage.getItem("deadlines")) || [];
};

function saveData(){
    localStorage.setItem("deadlines", JSON.stringify(deadlines));
};

function generateId(){
    return "DL"+Date.now();
}

function addDeadline(data){
    const now = Date.now();
    const newDeadline = {
        id             : generateId(),
        title          : data.title,
        description    : data.description,
        createdAt      : now,
        dueDate        : data.dueDate,
        status         : now < data.dueDate ? 'Active' : 'Failed',
        completedAt    : null,
        daysRemaining  : calculateDaysRemaining(Date.now(), data.dueDate())
    }
    deadlines.push(newDeadline);
    saveData();
    renderApp();
};

function recomputeStatuses(){
    for(let i=0; i<deadlines.length; i++){
        deadlines[i].status = Date.now() < deadlines[i].dueDate ? "Active" : "Failed";
        deadlines[i].daysRemaining = calculateDaysRemaining(Date.now(), deadlines[i].dueDate);
    }
};

function editDeadline(id, data){};

function deleteDeadline(id){};

function markCompleted(id){};

function calculateDaysRemaining(currentDate, dueDate){
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.ceil((dueDate - currentDate) / msInDay);
};
