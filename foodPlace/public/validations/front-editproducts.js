
    const formulario = document.querySelector("#formEdit")
    
        formulario.addEventListener("submit", function(e){
            
            console.log("se espicho")
           
            const productName = document.querySelector(".productName")
            const productDescription = document.querySelector(".productDescription")
            const productImage = document.querySelector("#product-image")

            let errors = []

            if (productName.value.length < 5 || productName.value == ""){
                errors.push("productName")
                
                
            }
            if (productDescription.value.length < 20 ){
                errors.push("productDescription")
                
            }


            if (!(/\.(jpg|png|gif|jpeg)$/i).test(productImage.value)) {
                errors.push('image')
                
              }
            
            

            if (errors.length > 0){
                console.log(errors)
                e.preventDefault()
               
                
            }


              

            // console.log("se espicho")
            // // e.preventDefault()
            // let nombre = document.querySelector(".productName")
        
            // if (nombre.value == ""){
                
            //     document.querySelector("#respuesta").innerHTML += "debe tener al menos 5 caracteres"
            // }else if (nombre.value.length < 5){
            //     alert("el campo de nombre debe tener al menos 5 caracteres")
            // }
        
        
        })

   
    
   





