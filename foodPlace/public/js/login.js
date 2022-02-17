window.addEventListener("load", function(){

    const RegEx = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^.{8,20}$/, 
    }
    const fields = {
        email: false,
        password: false
    }

    const form  = document.getElementById("form")
    const inputs = this.document.querySelectorAll("#form input")
   
    const validateForm = (e)=>{
        switch (e.target.name){
            case "email":
                validateField(RegEx.email,e.target,"email")
            break;
            case "password":
                validateField(RegEx.password,e.target,"password")
            break;
        }
        
    }

    const validateField = (expression, input, field)=>{
        if(expression.test(input.value)){
            document.getElementById(`group__${field}`).classList.remove("form-input-incorrect")
            document.getElementById(`group__${field}`).classList.add("form-input-correct")
            document.querySelector(`#group__${field} i`).classList.add("fa-check-circle")
            document.querySelector(`#group__${field} i`).classList.remove("fa-times-circle")
            document.querySelector(`.input-error-${field}`).classList.remove("input-error-active")
            document.getElementById("form-message").classList.remove("form-message-active")
            fields[field]=true;
        }else{
            document.getElementById(`group__${field}`).classList.add("form-input-incorrect")
            document.getElementById(`group__${field}`).classList.remove("form-input-correct")
            document.querySelector(`#group__${field} i`).classList.add("fa-times-circle")
            document.querySelector(`#group__${field} i`).classList.remove("fa-check-circle")
            document.querySelector(`.input-error-${field}`).classList.add("input-error-active")
            document.getElementById("form-message").classList.remove("form-message-active")
            fields[field]=false;
        }
    }

    inputs.forEach((input)=>{
        input.addEventListener('keyup', validateForm)
        input.addEventListener('blur', validateForm)
    })

    form.addEventListener("submit", function(e){
        
        if(fields.email=="" || fields.password==""){
            document.getElementById("form-message").classList.add("form-message-active")
            e.preventDefault();  
        }else{
            document.getElementById("form-message").classList.remove("form-message-active")
        }
    })
    
})