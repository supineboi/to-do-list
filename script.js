// ========================== SET THE LOCAL STORAGE WITH EMPTY TODOS LIST ==========================
function setStorage(set = ''){           //     FUNCTION - 1
    console.log("set storage!");

    // setting up local storage
    if(set){
        let todos = {
            "todos" : set
        };
        todos = JSON.stringify(todos);
        localStorage.setItem("todos",todos);
        return;
    }

    // checking local storage set or not
    let todos = localStorage.getItem("todos");
    if(todos !== null)
        return true;

    return false;
}

// ========================== GET THE LOCAL STORAGE --> ALL TODOS ==========================
function getStorage(){                      // FUNCTION - 2
    console.log("get Storage!");
    let todos = localStorage.getItem("todos");
    
    if(todos !== null){
        todos = JSON.parse(todos);
        todos = todos.todos;
        return todos;
    }
    todos = []; 
    return todos;
}

// ========================== PRINTING ALL THE TODOS ON WEBPAGE ==========================
function printAllTodos(todos){                     // FUNCTION-3
    console.log("print all todos!"); 
    $('.list-of-task').html('')
    todos.map( (todo)=> {
            $('.list-of-task').prepend(
                `<li>
                <span>${todo.task}</span>
                <span>
                <span><button onclick="deleteTodo(${todo.id})" class="btn btn-danger btn-outline">delete</button></span>
                <span><button onclick="editTodo(${todo.id})" class="btn btn-primary btn-outline ms-3">edit</button></span>
                </span>
                </li>`
                );
    });
}

// ========================== DELETE TODOS ==========================
function deleteTodo(id){                        // FUNCTION - 4
    let todos = getStorage();
    
    todos = todos.filter( (todo) => todo.id !== id)
    setStorage(todos);
    printAllTodos(todos);
    $('.editor').html('');
}

// ========================== CLEAR ALL TODOS ==========================
function clearAllTodo(){                        // FUNCTION - 5
    localStorage.clear();
    $('.list-of-task').html('')
    $('.editor').html('');
}

// ========================== EDIT TODOS ==========================
function editTodo(id){                          // FUNCTION - 6
    let todos = getStorage();

    let todo = todos.filter( (todo) => todo.id == id);

    $('.editor').html(
        `<input type="text" class="editTask" value="${todo[0].task}">
        <button onclick="saveTodo(${todo[0].id})" class="btn btn-info">Save</button>`
    )
}

// ========================== EDIT TODOS ==========================
function saveTodo(id){                          // FUNCTION - 7
    let task = $(".editTask").val();
    $('.editor').html('')

    if(task){
        let todos = getStorage();
        let updatedTodos = todos.map( (todo) => {
            if(todo.id == id){
                todo.task = task;
            }
            return todo;
        });
        setStorage(updatedTodos);
        printAllTodos(updatedTodos);
    }
}

// ================================= START FROM HERE  =============================
let isTodos = setStorage();
console.log(isTodos);

if(isTodos){
    let todos = getStorage(); 
    printAllTodos(todos);
}

// =============================== ON FORM SUBMITTED ================================
$('form').submit( (event) => {
    event.preventDefault();
    $('.editor').html('')
    
    let task = event.target['task'].value;

    if(task){    
        let todos = getStorage();
        let id = 0;

        // empty input task field
        $('.task').val('');

        // If atleast one todo is already added in TodoList
        if(todos.length)
            id = todos.length;
        
        let newTodo = {
            id,
            task
        }; 
        todos.push(newTodo);
        
        $('.list-of-task').prepend(
                `<li>
                <span>${task}</span>
                <span>
                <span><button onclick="deleteTodo(${id})" class="btn btn-danger btn-outline">delete</button></span>
                <span><button onclick="editTodo(${id})" class="btn btn-primary btn-outline ms-3">edit</button></span>
                </span>
                </li>`
                );
        setStorage(todos);
    }
})

