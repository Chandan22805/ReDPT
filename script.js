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
        completed      : false,
        daysRemaining  : calculateDaysRemaining(data.dueDate())
    }
    deadlines.push(newDeadline);
    saveData();
    renderApp();
};

function recomputeStatuses(){
    for(let i=0; i<deadlines.length; i++){
        deadlines[i].daysRemaining = calculateDaysRemaining(deadlines[i].dueDate);
        if(!deadlines[i].completed)
            deadlines[i].status = Date.now() < deadlines[i].dueDate ? "Active" : "Failed";
    }
};

function editDeadline(id, dueDate){
    deadlines = deadlines.map(d1 => {
        if(d1.id === id){
            d1.dueDate = dueDate;
            d1.daysRemaining = calculateDaysRemaining(dueDate);
            if(!d1.completed) recomputeStatuses();
        }
    })
};

function deleteDeadline(id){
    deadlines = deadlines.filter(dl => dl.id !== id);
};

function markCompleted(id){
    deadlines = deadlines.map(d1 =>
        {
            if(d1.id===id){
                 d1.completetd = true;
                 d1.completedAt = Date.now();
                 d1.status = "Completed"; 
            }
    })
};

function calculateDaysRemaining(dueDate){
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.ceil((dueDate - Date.now()) / msInDay);
};
