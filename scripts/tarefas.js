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


