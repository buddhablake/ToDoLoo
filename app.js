 //Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("click", filterTodo);



 //Functions
 function addTodo(event){
     //Prevent form from submitting
     event.preventDefault()
     //Todo DIV 
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todo');
     //Create LI
     const newTodo = document.createElement('li');
     newTodo.innerText = todoInput.value;
     newTodo.classList.add('todo-item');
     todoDiv.appendChild(newTodo);
     //ADD TODO TO LOCAL STORAGE
     saveLocalTodos(todoInput.value);
     //CHECK MARK BUTTON
     const completedButton = document.createElement('button');
    //  REMEMBER TO USE SINGLE QUOTATIONS IF YOUR STRING CONTAINS 
    //  DOUBLE QUOATATIONS LIKE BELOW
     completedButton.innerHTML = '<i class="fas fa-check"></i>';
     completedButton.classList.add('complete-button');
     todoDiv.appendChild(completedButton);
     //CHECK TRASH BUTTON
     const trashButton = document.createElement('button');
    //  REMEMBER TO USE SINGLE QUOTATIONS IF YOUR STRING CONTAINS 
    //  DOUBLE QUOATATIONS LIKE BELOW
     trashButton.innerHTML= '<i class="fas fa-trash"></i>';
     trashButton.classList.add('trash-button');
     todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //CLEAR TOD INPUT VALUE 
    todoInput.value = '';
 }

 function deleteCheck(event){
     const item = event.target;
     //DELETE TODO 
        if(item.classList[0] === 'trash-button'){
       const todo = item.parentElement
       todo.classList.add('fall');
       removeLocalTodos(todo);
       todo.addEventListener("transitionend", function(){
           todo.remove()
       })
     }

     //CHECKMARK 
     if(item.classList[0] === 'complete-button'){
         const todo = item.parentElement
         todo.classList.toggle('completed');
     }
 }

 function filterTodo(event){
     
const todos = todoList.childNodes;
todos.forEach(function(todo){
    switch(event.target.value){
        case "all":
            todo.style.display = 'flex';
            break;
            
        case "completed":
            
            if(todo.classList.contains('completed')){
                todo.style.display = "flex";
            } else{
                todo.style.display = "none";
            }
            break;

        case "incomplete":
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }
            else{
                todo.style.display = "none";
            }
           
    }
})
 }



 function saveLocalTodos(todo){
//CHECK --- IF THERE IS ALREADY A TODOS
let todos;
if(localStorage.getItem('todos') === null){
    todos = [];
}else{
    todos = JSON.parse(localStorage.getItem('todos'));
}

todos.push(todo);
localStorage.setItem('todos', JSON.stringify(todos));
 }

 function getTodos(){
     //CHECK --- IF THERE IS ALREADY A TODOS
let todos;
if(localStorage.getItem('todos') === null){
    todos = [];
}else{
    todos = JSON.parse(localStorage.getItem('todos'));
}
todos.forEach(function(todo){
    //Todo DIV 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
   //  REMEMBER TO USE SINGLE QUOTATIONS IF YOUR STRING CONTAINS 
   //  DOUBLE QUOATATIONS LIKE BELOW
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
   //  REMEMBER TO USE SINGLE QUOTATIONS IF YOUR STRING CONTAINS 
   //  DOUBLE QUOATATIONS LIKE BELOW
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);
   //APPEND TO LIST
   todoList.appendChild(todoDiv);
})
 }


 function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
 }