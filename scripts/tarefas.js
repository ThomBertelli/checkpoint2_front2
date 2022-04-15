let showCompleteTasksReference = document.getElementById('completeTasks')

let showNotCompleteTasksReference = document.getElementById('notCompleteTaks')

let requestHeaders = {

    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')

}

window.onload = () => {

    let token = localStorage.getItem('token')

    if (token === null || token === 'null' || token === '' || token === ' ' || token === undefined) {
        window.location.href = "./index.html"

    }else {

        showUserName()

        setTimeout(() => {

            getAllTasks()

        }, 2000)

    }

}

function showUserName() {
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

}

let inputNewTaskReference = document.getElementById('newTask')

let buttonCreateNewTaskReference = document.getElementById('addNewTask')

buttonCreateNewTaskReference.addEventListener('click', (event) => {

    event.preventDefault()

    let taskBody = {
        description: inputNewTaskReference.value,
        completed: false
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
                                        <img class="lixeira vibrate-3"  src="https://img.icons8.com/color/344/trash--v1.png" alt="" onclick="deleteTask(${task.id})">
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

function logOut() {

    Swal.fire({

        icon:'question',
        title: 'Deseja realmente sair?',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: `Não`,
        
    }).then((result) => {

        if (result.isConfirmed) {

            localStorage.setItem('token', '')
            window.location.href = "./index.html"

        }

    })

}






