
window.onload = () =>{

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




    setTimeout(() =>{        

        let requestHeaders = {

            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token')
            
        }
    
        let requestConfiguration = {
    
            headers: requestHeaders,
            
    
        }
        let skeletonReference = document.getElementById('skeleton')

        fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration).then(
    
            response => {
    
                if(response.ok){
                    response.json().then(
    
                        tasks => {

                            skeletonReference.style.display = 'none'

                            taksRender(tasks)
        
                            
        
                        }
        
                    )

                }

            }
    
        )

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

            response.json().then(

                data => {

                    console.log(data)

                }

            )

        }

    )

    inputNewTaskReference.value = ''

})


function taksRender (tasks){
    let showCompleteTasksReference = document.getElementById('completeTasks')

    let showNotCompleteTasksReference = document.getElementById('notCompleteTaks')

    
    for(let task of tasks){

        const formatDate = new Date(task.createdAt).toLocaleDateString(
            'pt-BR',
    
            {
                day: '2-digit',
                month:'2-digit',
                year: 'numeric'
            }
    
        )

        if(task.completed){
            showCompleteTasksReference.innerHTML += `
                                    <li class="tarefa">
                                        <div></div>
                                        <div class="descricao">
                                            <p class="nome">${task.description}</p>
                                            <p class="timestamp"> ${formatDate} </p>
                                        </div>
                                    </li>
                                    `
        }else{
            showNotCompleteTasksReference.innerHTML += `
                                    <li class="tarefa">
                                        <div class="not-done"></div>
                                        <div class="descricao">
                                            <p class="nome">${task.description}</p>
                                            <p class="timestamp"> ${formatDate} </p>
                                        </div>
                                    </li>
                                    `
        }
    }
}

function taskCompleted(){
    

}



