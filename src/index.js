import "./styles.css";

class Todo{
    constructor(title, description, dueDate = null, priority = null, taskStatus){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.taskStatus = taskStatus;
    }
}

//PUSHING ALL TODOS IN AN ARRAY OF OBJECTS
let allTodos = [];

const new_todo_btn = document.querySelector("#new-todo-btn");

const form = document.querySelector("#myForm");
let confirmBtn = document.querySelector(".confirm-edit-btn");

//NEW TODO BUTTON
new_todo_btn.addEventListener("click", function(){

    add_todo_btn.disabled = false;

    if(form.style.display === "none"){
        form.style.display = "block";
        add_todo_btn.style.display = "block";
        confirmBtn.style.display = "none";
    }
    else{
        form.style.display = "none";
    }
    form.reset();
});
//

let isOn = false;

let todoSection = document.querySelector("#TODOS");

//render function to display ALL todos ARRAY in todo section
function render(){
    for(let i in allTodos){
        let todoTask = document.createElement("div");
        todoTask.className = "todo";
        todoTask.id = `todo-${i}`;

        let titleText = document.createElement("p");
        titleText.innerHTML = `Title: ${allTodos[i].title}`;

        let descriptionText = document.createElement("p");
        descriptionText.innerHTML = `Description: ${allTodos[i].description}`;

        let dueDateText = document.createElement("p");
        dueDateText.innerHTML = `Due Date: ${allTodos[i].dueDate}`;

        let priorityText = document.createElement("p");
        priorityText.innerHTML = `Priority: ${allTodos[i].priority}`;

        let taskStatusText = document.createElement("p");
        taskStatusText.innerHTML = `Task Status: ${allTodos[i].taskStatus}`;

        let editButton = document.createElement("button");
        editButton.id = `edit-button-${i}`;
        editButton.className = "edit-button"
        editButton.textContent = "Edit";

        //EDIT BUTTON
        editButton.addEventListener("click", function(){

            let titleInput = document.getElementById('name');
            titleInput.value = allTodos[i].title;

            let descriptionInput = document.getElementById('desc');
            descriptionInput.value = allTodos[i].description;

            let dueDateInput = document.getElementById('due_date');
            dueDateInput.value = allTodos[i].dueDate;

            let priorityInput = document.getElementById('priority');
            priorityInput.value = allTodos[i].priority;

            let taskStatusInput = document.getElementById('task_status');
            taskStatusInput.value = allTodos[i].taskStatus;

            if(form.style.display === "none"){
                add_todo_btn.style.display = "none";
                form.style.display = "block";
                confirmBtn.style.display = "block";
            }
            else{
                form.style.display = "none";
            }
            confirmBtn.id = i;
            add_todo_btn.disabled = true;
        })

        let deleteButton = document.createElement("button");
        deleteButton.id = "delete-button";
        deleteButton.textContent = "Delete";

        //DELETE BUTTON
        deleteButton.addEventListener("click", function(e){
            let index = i;
            allTodos.splice(index, 1);
            todoSection.innerHTML = "";
            render();
        })

        let toggleStatusButton = document.createElement("button");
        toggleStatusButton.id = "toggle-button";
        toggleStatusButton.textContent = "Toggle Task Status";

        //TOGGLE TASK STATUS
        toggleStatusButton.addEventListener("click", function(){
            if(taskStatusInput.checked === true){
                allTodos[i].taskStatus = "Working on it!";
                taskStatusText.innerHTML = `Task Status: ${allTodos[i].taskStatus}`;
                taskStatusInput.checked = false;

            }
            else{
                allTodos[i].taskStatus = "Completed!";
                taskStatusText.innerHTML = `Task Status: ${allTodos[i].taskStatus}`;
                taskStatusInput.checked = true;
            }
        })

        todoTask.appendChild(titleText);
        todoTask.appendChild(descriptionText);
        todoTask.appendChild(dueDateText);
        todoTask.appendChild(priorityText);
        todoTask.appendChild(taskStatusText);
        todoTask.appendChild(editButton);
        todoTask.appendChild(deleteButton);
        todoTask.appendChild(toggleStatusButton);
        todoSection.appendChild(todoTask);
    }
}
//

//ADD TODO BUTTON
let add_todo_btn = document.querySelector("#add-todo-btn");

add_todo_btn.addEventListener("click", function(e){
    e.preventDefault();
    todoSection.innerHTML = "";
    formInputs();
    render();
    form.style.display = "none";
    form.reset();
})
//

let titleInput = document.getElementById('name');
let descriptionInput = document.getElementById('desc');
let dueDateInput = document.getElementById('due_date');
let priorityInput = document.getElementById('priority');
let taskStatusInput = document.getElementById('task_status');

//form inputs
function formInputs(){
    
    let titleInputValue = titleInput.value;
    let descriptionInputValue = descriptionInput.value;
    let dueDateInputValue = dueDateInput.value;
    let priorityInputValue = priorityInput.value;
    let taskStatusInputValue = "";

    if(taskStatusInput.checked === true){
        taskStatusInputValue = "Completed!";
    }
    else{
        taskStatusInputValue = "Working on it!";
    }

    const newTodo = new Todo(titleInputValue, descriptionInputValue, dueDateInputValue,priorityInputValue,taskStatusInputValue);

    allTodos.push(newTodo);
}
//

confirmBtn.addEventListener("click", function(e){
    e.preventDefault();

    let index = e.target.id;
    allTodos[index].title = titleInput.value;
    allTodos[index].description = descriptionInput.value;
    allTodos[index].dueDate = dueDateInput.value;
    allTodos[index].priority = priorityInput.value;

    if(taskStatusInput.checked === true){
        allTodos[index].taskStatus = "Completed!";
    }
    else{
        allTodos[index].taskStatus = "Working on it!";
    }
    
    todoSection.innerHTML = "";
    render();
    form.style.display = "none";
    form.reset();
})