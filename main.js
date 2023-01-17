const $addTaskBtn = document.querySelector('.input__field button'),
    $deleteAllBtn = document.querySelector('.footer button'),
    $input = document.querySelector('.input__field input'),
    $todoContainer = document.querySelector('.todo'),
    $pendingNumber = document.querySelector('.pending-tasks');

let tasksArr = null;

const showTasks = () => {
	const getLocalStorage = localStorage.getItem("New Todo");

	if (!getLocalStorage) tasksArr = [];
	else {
		tasksArr = JSON.parse(getLocalStorage);
		localStorage.setItem("New Todo", JSON.stringify(tasksArr)); // Transforming array into JSON
	
		let $liTag = ""
		
		tasksArr.forEach((element,index) => {
			$liTag += `<li data-index="${index}">${element}<button class="delete-button"><img src="images/delete-bin.svg" alt="Borrar"></button></li>`;
		});
		$todoContainer.innerHTML = $liTag
	}
	$input.value = ""

	if (tasksArr.length > 0) $deleteAllBtn.classList.add('active');
	else $deleteAllBtn.classList.remove('active');
	$pendingNumber.textContent = tasksArr.length;
}


const deleteTask = index => {
	// Delete clickek task
	tasksArr.splice(index, 1);
	localStorage.setItem("New Todo", JSON.stringify(tasksArr));
	showTasks();
}



$input.addEventListener('keyup', e => {
	// Add or remove active class to buttons if input is not empty
    if (!$input.value.trim()) $addTaskBtn.classList.remove('active');
    else $addTaskBtn.classList.add('active');

    // Add new task if Enter key is pushed and the input is not empty
    if (e.key === "Enter") {
    	if ($input.value.trim()) {
            tasksArr.unshift($input.value)
            localStorage.setItem("New Todo", JSON.stringify(tasksArr))
            $addTaskBtn.classList.remove('active');
            showTasks()
    	}
    }
})

document.addEventListener('click', e => {
	// Add task
	if (e.target === $addTaskBtn) {
		tasksArr.unshift($input.value)
		localStorage.setItem("New Todo", JSON.stringify(tasksArr))
		$addTaskBtn.classList.remove('active');
		showTasks()
	}

	// Delete task
	else if (e.target.matches(".todo .delete-button")) {
		deleteTask(e.target.dataset.index)
	}

	// Delete all tasks
	else if (e.target === $deleteAllBtn) {
		listArr = [];
		localStorage.setItem("New Todo", JSON.stringify(listArr));
		showTasks();
	}
})

document.addEventListener('DOMContentLoaded', showTasks)