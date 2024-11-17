var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete') || e.target.classList.contains('ci')) {
        completeTodo(e);
    }
    if (e.target.classList.contains('delete') || e.target.classList.contains('di')) {
        deleteTodo(e);
    }
    if (e.target.id === "all") {
        viewAll();
    }
    if (e.target.id === "rem") {
        viewRemaining();
    }
    if (e.target.id === "com") {
        viewCompleted();
    }
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

function update() {
    comdoList = todoList.filter(ele => ele.complete);
    remList = todoList.filter(ele => !ele.complete);
    document.getElementById("r-count").innerText = remList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
}

function add() {
    var value = todoInput.value.trim();
    if (value === '') {
        alert("😮 Task cannot be empty");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = "";
    update();
    addinmain(todoList);
}

function addinmain(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var x = `<li id="${element.id}" class="todo-item">
            <p class="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
            <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class="ci bx bx-check bx-sm"></i>
                </button>
                <button class="delete btn btn-error">
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += x;
    });
}

function deleteTodo(e) {
    var deleted = e.target.closest('.todo-item').getAttribute('id');
    todoList = todoList.filter(ele => ele.id !== deleted);

    update();
    addinmain(todoList);
}

function completeTodo(e) {
    var completed = e.target.closest('.todo-item').getAttribute('id');
    todoList.forEach(obj => {
        if (obj.id === completed) {
            obj.complete = !obj.complete;
            e.target.closest('.todo-item').querySelector(".task").classList.toggle("line", obj.complete);
        }
    });
    update();
    addinmain(todoList);
}

function deleteAll() {
    todoList = [];
    update();
    addinmain(todoList);
}

function deleteS() {
    todoList = todoList.filter(ele => !ele.complete);
    update();
    addinmain(todoList);
}

function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {
    addinmain(remList);
}

function viewAll() {
    addinmain(todoList);
}
