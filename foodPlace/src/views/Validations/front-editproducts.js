window.addEventListener("load",function(){
    const formulario = document.querySelector("#formEdit")
    
    
    formulario.addEventListener("submit", function(e){
        console.log("se espicho")
        // e.preventDefault()
        let nombre = document.querySelector("input .productName")
    
        if (nombre.value == ""){
            alert("el campo nombre tiene que estar completo")
            // document.querySelector("#respuesta").innerHTML += "debe tener al menos 5 caracteres"
        }else if (nombre.value.length < 5){
            alert("el campo de nombre debe tener al menos 5 caracteres")
        }
    
    
    })


})


