import "./styles.css";

class Todo{
    constructor(title, description, dueDate = null, priority = null, notes = null){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompleted(){
        this.completed = !this.completed;
    }
}

const newTodo = new Todo("todo#1", "This is a new todo.");
newTodo.toggleCompleted();

console.log(newTodo);

class defaultProject{
    constructor(todo){
        this.todo = todo;
    }
}

const DP = new defaultProject(newTodo);
console.log(DP);

const new_todo_btn = document.querySelector("#new-todo-btn");

const form = document.querySelector("#myForm");

new_todo_btn.addEventListener("click", function(){
    if(form.style.display === "none"){
        form.style.display = "block";
    }
    else{
        form.style.display = "none";
    }
});
