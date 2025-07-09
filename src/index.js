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

//NEW TODO BUTTON
new_todo_btn.addEventListener("click", function(){
    if(form.style.display === "none"){
        form.style.display = "block";
    }
    else{
        form.style.display = "none";
    }
});
//

let todoSection = document.querySelector("#TODOS");

//render function to display ALL todos ARRAY in todo section
function render(){
    for(let i in allTodos){
        let todoTask = document.createElement("div");
        todoTask.className = "todo";

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
        editButton.id = "edit-button";
        editButton.textContent = "Edit";

        let deleteButton = document.createElement("button");
        deleteButton.id = "delete-button";
        deleteButton.textContent = "Delete";

        let toggleStatusButton = document.createElement("button");
        toggleStatusButton.id = "toggle-button";
        toggleStatusButton.textContent = "Toggle Task Status";

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

//form inputs
function formInputs(){
    let titleInput = document.getElementById('name');
    let titleInputValue = titleInput.value;
    
    let descriptionInput = document.getElementById('desc');
    let descriptionInputValue = descriptionInput.value;

    let dueDateInput = document.getElementById('due_date');
    let dueDateInputValue = dueDateInput.value;

    let priorityInput = document.getElementById('priority');
    let priorityInputValue = priorityInput.value;

    let taskStatusInput = document.getElementById('task_status');
    let taskStatusInputValue = "";
    if(taskStatusInput.checked == true){
        taskStatusInputValue = "Completed!";
    }
    else{
        taskStatusInputValue = "Working on it!";
    }

    const newTodo = new Todo(titleInputValue, descriptionInputValue, dueDateInputValue,priorityInputValue,taskStatusInputValue);

    allTodos.push(newTodo);
}
