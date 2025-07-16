import "./styles.css";

// let sidebar_menu_item = document.querySelector(".sidebar-menu-item");

let titleInput = document.getElementById('name');
let descriptionInput = document.getElementById('desc');
let dueDateInput = document.getElementById('due_date');
let priorityInput = document.getElementById('priority');
let taskStatusInput = document.getElementById('task_status');

const new_todo_btn = document.querySelector("#new-todo-btn");
const form = document.querySelector("#myForm");
let confirmBtn = document.querySelector(".confirm-edit-btn");

let todoSection = document.querySelector("#TODOS");
let add_todo_btn = document.querySelector("#add-todo-btn");

let new_project_button = document.querySelector("#new-project-btn");
let projectForm = document.querySelector("#project-form");

let project_name_save_btn = document.querySelector("#project-name-save-btn");
let sidebar_menu = document.querySelector("#sidebar-menu");
let project_name_input = document.querySelector("#project-name");



class Project{
    constructor(ProjectName = "Default-Project", ProjectTodo = `${ProjectName}Todos`){
        this.ProjectName = ProjectName;
        this.ProjectTodo = [];
    }
}

class Todo{
    constructor(title, description, dueDate = null, priority = null, taskStatus){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.taskStatus = taskStatus;
    }
}

let DefaultProject = new Project();
let allProjects = [];
allProjects.push(DefaultProject);
let currentProject = allProjects[0];
renderProject();

//Project Save Button
project_name_save_btn.addEventListener("click", function(e){

    e.preventDefault();
    let project_name_input_value = project_name_input.value;
    let newProject = new Project(project_name_input_value, `${project_name_input_value}Todos`);
    allProjects.push(newProject);
    renderProject();
    renderTodos();
    projectForm.style.display = "none";
    projectForm.reset();
    console.log(allProjects);
})

function renderProject(){
    sidebar_menu.textContent = "";
    for(let i in allProjects){
        let projectNameDiv = document.createElement("button");
        projectNameDiv.classList = "sidebar-menu-item";
        projectNameDiv.id = i;
        projectNameDiv.textContent = allProjects[i].ProjectName;
        sidebar_menu.appendChild(projectNameDiv);
        currentProject = allProjects[i];
        todoSection.textContent = "";

        projectNameDiv.addEventListener("click", function(){
            todoSection.textContent = "";
            currentProject = allProjects[i];
            console.log(`${currentProject.ProjectName} is selected.`);
            renderTodos();
        })
    }
}

function renderTodos(){
    let todosInAProject = currentProject.ProjectTodo;
    for(let i in todosInAProject){
        let todoTask = document.createElement("div");
        todoTask.className = "todo";
        todoTask.id = `todo-${i}`;

        let titleText = document.createElement("p");
        titleText.innerHTML = `Title: ${todosInAProject[i].title}`;

        let descriptionText = document.createElement("p");
        descriptionText.innerHTML = `Description: ${todosInAProject[i].description}`;

        let dueDateText = document.createElement("p");
        dueDateText.innerHTML = `Due Date: ${todosInAProject[i].dueDate}`;

        let priorityText = document.createElement("p");
        priorityText.innerHTML = `Priority: ${todosInAProject[i].priority}`;

        let taskStatusText = document.createElement("p");
        taskStatusText.innerHTML = `Task Status: ${todosInAProject[i].taskStatus}`;

        let editButton = document.createElement("button");
        editButton.id = `edit-button-${i}`;
        editButton.className = "edit-button"
        editButton.textContent = "Edit";

        //EDIT BUTTON
        editButton.addEventListener("click", function(){

            let titleInput = document.getElementById('name');
            titleInput.value = todosInAProject[i].title;

            let descriptionInput = document.getElementById('desc');
            descriptionInput.value = todosInAProject[i].description;

            let dueDateInput = document.getElementById('due_date');
            dueDateInput.value = todosInAProject[i].dueDate;

            let priorityInput = document.getElementById('priority');
            priorityInput.value = todosInAProject[i].priority;

            let taskStatusInput = document.getElementById('task_status');
            taskStatusInput.value = todosInAProject[i].taskStatus;

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
            todosInAProject.splice(index, 1);
            todoSection.innerHTML = "";
            renderTodos();
        })

        let toggleStatusButton = document.createElement("button");
        toggleStatusButton.id = "toggle-button";
        toggleStatusButton.textContent = "Toggle Task Status";

        //TOGGLE TASK STATUS
        toggleStatusButton.addEventListener("click", function(){
            if(taskStatusInput.checked === true){
                todosInAProject[i].taskStatus = "Working on it!";
                taskStatusText.innerHTML = `Task Status: ${todosInAProject[i].taskStatus}`;
                taskStatusInput.checked = false;

            }
            else{
                todosInAProject[i].taskStatus = "Completed!";
                taskStatusText.innerHTML = `Task Status: ${todosInAProject[i].taskStatus}`;
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

confirmBtn.addEventListener("click", function(e){
    e.preventDefault();

    let index = e.target.id;
    currentProject.ProjectTodo[index].title = titleInput.value;
    currentProject.ProjectTodo[index].description = descriptionInput.value;
    currentProject.ProjectTodo[index].dueDate = dueDateInput.value;
    currentProject.ProjectTodo[index].priority = priorityInput.value;

    if(taskStatusInput.checked === true){
        currentProject.ProjectTodo[index].taskStatus = "Completed!";
    }
    else{
        currentProject.ProjectTodo[index].taskStatus = "Working on it!";
    }

    todoSection.innerHTML = "";
    renderTodos();
    form.style.display = "none";
    form.reset();
})



function addTodoToProject(){

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

        currentProject.ProjectTodo.push(newTodo);
        console.log(allProjects);
}

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

//ADD TODO BUTTON
add_todo_btn.addEventListener("click", function(e){
    if(form.checkValidity()){
        todoSection.innerHTML = "";
        addTodoToProject();
        renderTodos();
        form.style.display = "none";
        form.reset();
    }
    else{
        form.reportValidity();
    }
    
})
//

new_project_button.addEventListener("click", function(){
    if(projectForm.style.display === "none"){
        projectForm.style.display = "block";
    }
    else{
        projectForm.style.display = "none";
    }
})