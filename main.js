
let input = document.querySelector('input[type="text"]');
let submit = document.querySelector('input[type="submit"]');
let tasksDiv = document.querySelector('.tasks');
let clearTasks = document.querySelector(".clear-tasks");


// Empty Array To Store The Tasks
let arrayOfTask = [];

// Check If Theres Tasks In Local Storge
if (localStorage.getItem("Tasks")) {
    arrayOfTask = JSON.parse(localStorage.getItem("Tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
    if (input.value != "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Input Field
    }
    showButtonClear(clearTasks);
}

// Click On Task Elemente
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
    // Remove Task From Loacl Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Elemente Form Page 
    e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("new-task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggele Done Class
        e.target.classList.toggle("done");
    } if (e.target.classList.contains("titel-task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Toggele Done Class
        e.target.parentElement.classList.toggle("done");
    }
    showButtonClear(clearTasks);
});


    function addTaskToArray(taskText) {
        // Task Data
        const task = {
            id: Date.now(),
            title: taskText,
            completed: false,
        };
        //  Push Task To Array Of Tasks
        arrayOfTask.push(task);
        // Add Task To Page
        addElementsToPageFrom(arrayOfTask);
        // Add Task To Locale Storge
        addToLocaleStorgeFrom(arrayOfTask);
    }

    function addElementsToPageFrom(arrayOfTask) {
        // Empty Tasks Div
        tasksDiv.innerHTML = "";
        // Looping On Array Of Task
        arrayOfTask.forEach(task => {
            // Create Main Div 
            let div = document.createElement('div');
            div.className = "new-task";
            if (task.completed) {
            div.className = "new-task done";
            }
            div.setAttribute("data-id", task.id);
            // Create Paragraph Show Data
            let p = document.createElement('p');
            p.className = "titel-task";
            p.appendChild(document.createTextNode(task.title));
            div.appendChild(p);
            // Create Button Delete Task
            let btnDelete = document.createElement('button');
            btnDelete.className = "del";
            btnDelete.appendChild(document.createTextNode("Delete"));
            // Append Button In Main Div
            div.appendChild(btnDelete);
            // Append Div Task To Tasks Section
            tasksDiv.appendChild(div);
        });
        // Show Button Clear All 
        // Clear All Tasks From Page 
        clearTasks.onclick = function () {
        tasksDiv.innerHTML = "";
        window.localStorage.removeItem("Tasks");
        }
    };

function addToLocaleStorgeFrom(arrayOfTask) {
    window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTask));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("Tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
    showButtonClear(clearTasks);
}

function deleteTaskWith(taskId) {
    arrayOfTask = arrayOfTask.filter((task) => task.id != taskId);
    addToLocaleStorgeFrom(arrayOfTask);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTask.length; i++) {

        if (arrayOfTask[i].id == taskId) {
            arrayOfTask[i].completed == false ? arrayOfTask[i].completed = true : arrayOfTask[i].completed = false;
        };
    };
    addToLocaleStorgeFrom(arrayOfTask);
};

function showButtonClear(e) {
    if (arrayOfTask.length <= 2) {
        e.setAttribute("class", "close");
    }  else {
        e.className = "clear-tasks";
    }
}
