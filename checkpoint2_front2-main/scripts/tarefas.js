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

}

let inputNovaTarefaReference = document.querySelector('#novaTarea')

let clickButtonTarefasReference = document.querySelector('#buttonInputNovaTarefa')

clickButtonTarefasReference.addEventListener('click',function(event){
    event.preventDefault()
    
    let novaTarefa = {
        description: inputNovaTarefaReference.value,
        completed: false
      }
      

    let requestHeaders = {

        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')

    }

    // cria o objeto de configuração que irá ser informado como segundo parametro no fetch

    let requestConfiguration = {

        method: 'POST',
        body: JSON.stringify(novaTarefa),
        headers: requestHeaders

    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration).then(

        response => {

            response.json().then(

                data => {console.log(data)}
                
                )
            }
            )
})