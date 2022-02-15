window.addEventListener("load", function(){
    let form  = document.querySelector("form.iniciosesion")
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
   
    form.addEventListener("submit", function(e){
        let email = document.querySelector("#email")
        let password = document.querySelector("#password")

        if(document.querySelector("#email").value ==""){
            e.preventDefault();
            document.querySelector("#email-empty").classList.remove("no-visible")
        }else if (!regex.test(email.value)){
            e.preventDefault();
            document.querySelector("#email-empty").classList.add("no-visible")
            document.querySelector("#email-invalid").classList.remove("no-visible")
        }else{
            document.querySelector("#email-invalid").classList.add("no-visible")
        }
        if(password.value ==""){
            e.preventDefault();
            document.querySelector("#password-empty").classList.remove("no-visible")
        }
    })
    
})