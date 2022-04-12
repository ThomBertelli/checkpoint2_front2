let buttonReferene = document.querySelector('button')

let inputEmailreference = document.querySelector('#inputEmail')

let inputPasswordReferece = document.querySelector('#inputPassword')

let errorEmail = true;
let errorPassword = true;

buttonReferene.addEventListener('click',function(event){

    event.preventDefault()

    let credentials = {

        email: inputEmailreference.value ,
        password: inputPasswordReferece.value

    }

    let requestHeaders = {

        'Content-Type': 'application/json'

    }

    let requestConfiguration = {

        method: 'POST',
        body: JSON.stringify(credentials),
        headers: requestHeaders

    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration).then(

        response => {

            response.json().then(

                data => {

                    localStorage.setItem('token', data.jwt)
                    window.location.href = "./tarefas.html"

                }

            )

        }

    )

})

inputEmailreference.addEventListener('keyup',function(event){

    if(!inputEmailreference.checkValidity()){
        inputEmailreference.classList.add('error')
        errorEmail = true
    }else{
        inputEmailreference.classList.remove('error')
        errorEmail = false
    }
    verifyErrors()
})

inputPasswordReferece.addEventListener('keyup',function(){
    if(inputPasswordReferece.value.length < 6){
        inputPasswordReferece.classList.add('error')
        errorPassword = true
    }else{
        inputPasswordReferece.classList.remove('error')
        errorPassword = false
    }
    verifyErrors()
})

function verifyErrors (){
    if (!errorEmail && !errorPassword){
        buttonReferene.disabled = false
    }else{
        buttonReferene.disabled = true
    } 

}
