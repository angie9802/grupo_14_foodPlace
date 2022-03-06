window.addEventListener("load", function(){

const RegEx = {
    fullname : /^[a-zA-ZÀ-ÿ\s]{3,20}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[a-zA-Z0-9!@#$&*])(?=.*[!@#$&*]).{8,50}$/, 
    address: /^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*/,
    number:  /^\d{7,14}$/,
    image: /(.jpg|.jpeg|.png|.gif)$/i
}
const fields = {
    fullname: false,
    email: false,
    password: false,
    address: false,
    number : false
}


  const form  = document.getElementById("form")
  const inputs = this.document.querySelectorAll("#form input")

  const validateForm = (e)=>{
   
    switch (e.target.name){
        case "fullname":
          validateField(RegEx.fullname,e.target,"fullname")
        break;
        case "email":
            validateField(RegEx.email,e.target,"email")
        break;
        case "number":
            validateField(RegEx.number,e.target,"number")
        break;
        case "address":
            validateField(RegEx.address,e.target,"address")
        break;
        case "password":
            validateField(RegEx.password,e.target,"password")
            validateCPassword()
        break;
        case "cpassword":
            validateCPassword()
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
const validateCPassword = ()=>{
  const inputPassword = document.getElementById("password")
  const inputCPassword = document.getElementById("cpassword")
  if(inputPassword.value !== inputCPassword.value){
      document.getElementById("group__cpassword").classList.add("form-input-incorrect")
      document.getElementById("group__cpassword").classList.remove("form-input-correct")
      document.querySelector("#group__cpassword i").classList.add("fa-times-circle")
      document.querySelector("#group__cpassword i").classList.remove("fa-check-circle")
      document.querySelector(".input-error-cpassword").classList.add("input-error-active")
      document.getElementById("form-message").classList.remove("form-message-active")
  }else if(inputPassword.value!==""){
    document.getElementById("group__cpassword").classList.remove("form-input-incorrect")
    document.getElementById("group__cpassword").classList.add("form-input-correct")
    document.querySelector("#group__cpassword i").classList.remove("fa-times-circle")
    document.querySelector("#group__cpassword i").classList.add("fa-check-circle")
    document.querySelector(".input-error-cpassword").classList.remove("input-error-active")
    document.getElementById("form-message").classList.remove("form-message-active")
  }
}
 
  inputs.forEach((input)=>{
      input.addEventListener('keyup', validateForm)
      input.addEventListener('click', validateForm)
    
  })

  form.addEventListener("submit", function(e){
    if(fields.fullname=="" || fields.email=="" || fields.password=="" || fields.number==""  || fields.address=="" || fields.role==""){
      document.getElementById("form-message").classList.add("form-message-active")
      e.preventDefault();  
    }else{
      document.getElementById("form-message").classList.remove("form-message-active")
    }  
    	
  })
  
})