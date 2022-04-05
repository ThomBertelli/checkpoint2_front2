
let buttonCreateReference = document.querySelector('#buttonCreate')

let inputsReference = document.querySelectorAll('input')




let userData = {

    firstName: " ",
    lastName: " ",
    email: " ",
    password: " "
    
}

let error = 5
let pass = null
let confirmPass = null

for(let input of inputsReference){    

    input.addEventListener('change', event =>{
        
        
        if(input.checkValidity()){
            input.classList.remove('error')
            error--
            if(input.id == "name"){
                userData.firstName = input.value
            }else if(input.id == "surname"){
                userData.lastName = input.value
            }else if(input.id == "email"){
                userData.email = input.value
        }}
        else{
            input.classList.add('error')
            error++
        }      

            if (input.id == "password"){
                pass = input.value.trim()
            }
            if (input.id == "confirmPassword"){
                confirmPass = input.value.trim()
                    if(pass != confirmPass){
                    input.classList.add('error')
                    error++
                        }else{
                            input.classList.remove('error')
                            error--
                            userData.password = pass
                        }
            }
            if(error <= 0){
                buttonCreateReference.disabled = false
            }else{
                buttonCreateReference.disabled = true
            }
            console.log(userData)
            console.log(error)
            console.log(pass)
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
