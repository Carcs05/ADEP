const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Function to calculate and update task statistics
function updateStats() {
    const total = document.querySelectorAll('li').length;
    const completed = document.querySelectorAll('.completed').length;
    document.getElementById('tasks-left').textContent = `${total - completed} tasks remaining`;
    document.getElementById('tasks-done').textContent = `${completed} completed`;
}

// Function to handle adding a task
addBtn.addEventListener('click', () => {
    const taskValue = input.value.trim();
    
    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" class="done-check">
        <span class="text-content">${taskValue}</span>
        <div class="action-btns">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    
    li.querySelector('.done-check').addEventListener('change', (e) => {
        li.classList.toggle('completed', e.target.checked);
        updateStats();
    });

    
    const editBtn = li.querySelector('.edit-btn');
    const span = li.querySelector('.text-content');
    
    editBtn.addEventListener('click', () => {
        if (editBtn.textContent === "Edit") {
            const currentText = span.textContent;
           
            span.innerHTML = `<input type="text" class="editing-input" value="${currentText}" 
                style="width:100%; background:#1a1d23; color:white; border:1px solid #3b82f6; padding:4px; border-radius:4px; outline:none;">`;
            editBtn.textContent = "Save";
            editBtn.style.color = "#10b981"; 
        } else {
            const editInput = span.querySelector('.editing-input');
            if (editInput) {
                span.textContent = editInput.value;
                editBtn.textContent = "Edit";
                editBtn.style.color = "#3b82f6"; 
            }
        }
    });

    
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        updateStats();
    });

    todoList.appendChild(li);
    input.value = ""; 
    updateStats();    
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});