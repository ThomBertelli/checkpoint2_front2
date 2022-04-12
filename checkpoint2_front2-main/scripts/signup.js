
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

    input.addEventListener('change', event => {


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
        }
        if (input.id == "confirmPassword") {
            confirmPass = input.value.trim()
            if (pass != confirmPass) {
                input.classList.add('error')
                errorConfirmEqualPassword = true
            } else {
                input.classList.remove('error')
                errorConfirmEqualPassword = false
                userData.password = pass
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
        console.log(userDataErrors)
        console.log(userData)
        console.log(confirmPass)
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

            response.json().then(

                data => {

                    console.log(data)
                    localStorage.setItem('token', data.jwt)
                    window.location.href = "index.html"

                }
            )
        }
    )
})
