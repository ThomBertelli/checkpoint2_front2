let buttonReferene = document.querySelector('button')

let inputEmailreference = document.querySelector('#inputEmail')

let inputPasswordReferece = document.querySelector('#inputPassword')

let errorEmail = true;
let errorPassword = true;

buttonReferene.addEventListener('click',function(event){

    event.preventDefault()

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
