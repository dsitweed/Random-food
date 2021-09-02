 // Selector
 const todoButton = document.querySelector(".todo-button");
 const todoList = document.querySelector(".todo-list");
 const randomSelect = document.querySelector("#random-select");
 const today = document.querySelector("#today");
 const url = "./list.json";

 doGetJSON(url);
 //set today
 var date = new Date();
 var y = date.getFullYear();
 var m = date.getMonth() + 1;
 var d = date.getDate();
 today.innerHTML = d + "/" + m + "/" + y;

 //Event Listener

 todoList.addEventListener('click', deleteCheck);
 todoButton.addEventListener('click', e => {
     runRandom(url);
 });

 //Function

 function addTodo(input) {
     //todo DIV
     const todoDiv = document.createElement('div');
     todoDiv.classList.add("todo"); //class="todo"
     //creat LI
     const newTodo = document.createElement('li');
     newTodo.innerText = input;
     newTodo.classList.add('todo-item'); //class="todo-item"
     todoDiv.appendChild(newTodo);
     //Check button
     const completedButton = document.createElement('button');
     completedButton.innerHTML = '<i class="fas fa-check" ></i>';
     completedButton.classList.add("complete-btn");
     todoDiv.appendChild(completedButton);
     //APPEND TO LIST
     todoList.appendChild(todoDiv);

 }

 function deleteCheck(e) {
     //define item want delete amazing
     console.log(e.target);
     const item = e.target;
     //check MARK
     if (item.classList[0] === 'complete-btn') {
         console.log('complete todo');
         const todo = item.parentElement;
         todo.classList.toggle("completed");
     }
 }

 //Display select
 function doGetJSON(url) {
     fetch(url)
         .then(async response => {
             if (!response.ok) {
                 throw new Error("Error, status: ", response.status);
             }
             const data = await response.json();
             console.log("[data]:", data);
             data.map(e => {
                 addTodo(e.select);
             })
         })
         .catch(error => {
             console.log(error);
         })
 }

 function runRandom(url) {
     fetch(url)
         .then(async response => {
             if (!response.ok) {
                 throw new Error("Error, status: ", response.status);
             }
             const data = await response.json();
             const number = Math.floor(Math.random() * data.length);
             randomSelect.innerHTML = data[number].select;
         })
         .catch(error => {
             console.log(error);
         })
 }