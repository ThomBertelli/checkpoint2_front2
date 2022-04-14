let showCompleteTasksReference = document.getElementById('completeTasks')

let showNotCompleteTasksReference = document.getElementById('notCompleteTaks')


window.onload = () => {

    let requestHeaders = {

        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')

    }

    let requestConfiguration = {

        headers: requestHeaders,

    }

    let showUserNameReference = document.querySelector('#showName')

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfiguration).then(

        response => {

            response.json().then(

                data => {

                    showUserNameReference.innerText = `${data.firstName}  ${data.lastName}`

                }

            )

        }

    )

    setTimeout(() => {

        getAllTasks()

    }, 2000)

}

let inputNewTaskReference = document.getElementById('newTask')

let buttonCreateNewTaskReference = document.getElementById('addNewTask')

buttonCreateNewTaskReference.addEventListener('click', (event) => {

    event.preventDefault()

    let taskBody = {
        description: inputNewTaskReference.value,
        completed: false
    }


    let requestHeaders = {

        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')

    }

    let requestConfiguration = {

        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(taskBody)

    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration).then(

        response => {

            if (response.ok) {

                getAllTasks()

            }

        }

    )

    inputNewTaskReference.value = ''

})


function taksRender(tasks) {

    showCompleteTasksReference.innerHTML = ''
    showNotCompleteTasksReference.innerHTML = ''

    for (let task of tasks) {

        const formatDate = new Date(task.createdAt).toLocaleDateString(
            'pt-BR',

            {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }

        )

        if (task.completed) {
            showCompleteTasksReference.innerHTML += `
                                    <li class="tarefa">
                                        <div class="not-done" onclick="taskCompleted(${task.id},false)"></div>
                                        <div class="descricao">
                                            <p class="nome">${task.description}</p>
                                            <p class="timestamp">Criada em: ${formatDate} </p>
                                            
                                        </div>
                                        <img class="lixeira"  src="https://img.icons8.com/color/344/trash--v1.png" alt="" onclick="deleteTask(${task.id})">
                                    </li>
                                    `
        } else {
            showNotCompleteTasksReference.innerHTML += `
                                    <li class="tarefa">
                                        <div class="not-done" onclick="taskCompleted(${task.id},true)"></div>
                                        <div class="descricao">
                                            <p class="nome">${task.description}</p>
                                            <p class="timestamp"> Criada em: ${formatDate} </p>
                                        </div>
                                    </li>
                                    `
        }
    }


}


function getAllTasks() {

    let requestHeaders = {

        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')

    }

    let requestConfiguration = {

        headers: requestHeaders,

    }


    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration).then(

        response => {

            if (response.ok) {


                response.json().then(

                    data => {

                        taksRender(data)

                    }

                )

            }

        }

    )
}

function taskCompleted(id, completed) {

    let requestHeaders = {

        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')

    }

    let requestConfiguration = {

        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify({ completed: completed })

    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfiguration).then(

        response => {

            if (response.ok) {

                getAllTasks()
            }

        }

    )

}

function deleteTask(id) {

    let requestHeaders = {

        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')

    }

    let requestConfiguration = {

        method: 'DELETE',
        headers: requestHeaders,


    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfiguration).then(

        response => {

            if (response.ok) {

                getAllTasks()
            }

        }

    )

}



