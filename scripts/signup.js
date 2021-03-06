import { mostrarSpinner, ocultarSpinner } from './loader.js'

let buttonCreateReference = document.querySelector('#buttonCreate')

let inputsReference = document.querySelectorAll('input')

let userData = {

    firstName: " ",
    lastName: " ",
    email: " ",
    password: " "

}

let userDataErrors = {

    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmPassword: true

}

let errorConfirmEqualPassword = true

let pass = null
let confirmPass = null

for(let input of inputsReference){    

    input.addEventListener('change', () => {

        if (input.checkValidity()) {
            input.classList.remove('error')
            userData[input.id] = input.value
            userDataErrors[input.id] = false

        } else {
            userDataErrors[input.id] = true
            input.classList.add('error')
        }

        if (input.id == "password") {
            pass = input.value.trim()
            if(pass.match("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")){
                userDataErrors.password = false
                input.classList.remove('error')
                document.getElementById('erroSenha').style.display = 'none'
            }else{
                userDataErrors.password = true
                input.classList.add('error')
                document.getElementById('erroSenha').style.display = 'flex'
            }
        }
        if (input.id == "confirmPassword") {
            confirmPass = input.value.trim()
            if (pass != confirmPass) {
                input.classList.add('error')
                errorConfirmEqualPassword = true
                document.getElementById('erroConfirmaSenha').style.display = 'flex'
            } else {
                input.classList.remove('error')
                errorConfirmEqualPassword = false
                userData.password = pass
                document.getElementById('erroConfirmaSenha').style.display = 'none'
            }
        }
        if (userDataErrors.firstName === false &&
            userDataErrors.lastName === false &&
            userDataErrors.email === false &&
            userDataErrors.password === false &&
            userDataErrors.confirmPassword === false &&
            errorConfirmEqualPassword === false) {
            buttonCreateReference.disabled = false
        } else {
            buttonCreateReference.disabled = true
        }
        
    }
    )
}

buttonCreateReference.addEventListener('click', event => {

    event.preventDefault()

    let headersRequest = {
        
        'Content-Type': 'application/json'

    }
    
    let requestConfig = {

        method: 'POST',
        body: JSON.stringify(userData),
        headers: headersRequest

    }


    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestConfig).then(

        response => {
            if(response.ok){

                mostrarSpinner()

                response.json().then(

                    data => {

                        setTimeout(()=>{

                            Swal.fire({

                                title:'Usu??rio cadastrado com sucesso!',
                                
                            }).then((result) => {
                                
                                if (result.isConfirmed) {

                                    localStorage.setItem('token', data.jwt)
                                    window.location.href = "index.html"
                                }
                            })

                        },4000)
                    }
                )
            }if(response.status === 400){

                mostrarSpinner()

                setTimeout(()=>{

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email/Usu??rio j?? cadastrado!',
                    })

                    ocultarSpinner()

                },4000)
            }
            
        }
    )
})


