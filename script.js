// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form, input, task list, and clear button elements
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const clearBtn = document.getElementById('clearBtn');

    // Load tasks from local storage, or initialize to an empty array if not present
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to display tasks in the task list
    function displayTasks() {
        taskList.innerHTML = ''; // Clear existing tasks in the list
        tasks.forEach(function(task, index) { // Loop through each task
            const li = document.createElement('li'); // Create a new list item for each task
            li.textContent = task.name; // Set the task name as the text content
            if (task.completed) { // Check if the task is completed
                li.classList.add('completed'); // Add the 'completed' class for styling
            }
            const deleteBtn = document.createElement('button'); // Create a delete button for the task
            deleteBtn.textContent = 'Delete'; // Set the text content of the button
            deleteBtn.classList.add('delete-btn'); // Add a class for styling
            deleteBtn.addEventListener('click', function() { // Add an event listener for the delete button
                deleteTask(index); // Call the deleteTask function with the current task index
            });
            li.appendChild(deleteBtn); // Append the delete button to the task item
            li.addEventListener('click', function() { // Add an event listener for toggling task completion
                toggleTask(index); // Call the toggleTask function with the current task index
            });
            taskList.appendChild(li); // Append the task item to the task list
        });
        saveTasks(); // Save the updated task list to local storage
    }

    // Event listener for adding a new task
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const taskName = taskInput.value.trim(); // Get and trim the task name from the input field
        if (taskName !== '') { // Check if the task name is not empty
            tasks.push({ name: taskName, completed: false }); // Add the new task to the task list
            taskInput.value = ''; // Clear the input field
            displayTasks(); // Update the displayed task list
        }
    });

    // Function to toggle the completion status of a task
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed; // Toggle the 'completed' status
        displayTasks(); // Update the displayed task list
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1); // Remove the task at the specified index
        displayTasks(); // Update the displayed task list
    }

    // Event listener for clearing all tasks
    clearBtn.addEventListener('click', function() {
        tasks = []; // Clear the task list
        displayTasks(); // Update the displayed task list
    });

    // Function to save the task list to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert the task list to JSON and save it
    }

    // Initial display of tasks when the page loads
    displayTasks();
});
