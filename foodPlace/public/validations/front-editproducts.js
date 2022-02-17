
    const formulario = document.querySelector("#formEdit")
    
        formulario.addEventListener("submit", function(e){
            
           
           
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
                errors.push('productImage')
                
              }
            
            

           

            if (errors.includes('productName')) {
                document.querySelector("#productName span").innerText = "Please use a valid product name (min 5 characters)"
              } else {
                document.querySelector("#productName span").innerHTML = ""
              }
            if (errors.includes("productDescription")){
                document.querySelector("#productDes span").innerHTML = "Please use a valid description (min 20 characters)"
            }else {
                document.querySelector("#productDes span").innerHTML = ""
              }
            
              if (errors.includes('productImage')) {
                document.querySelector("#productIma span").innerHTML = "Please use a valid image (JPEG,JPG,GIF,PNG)"
              } else {
                document.querySelector("#productIma span").innerHTML = ""
              }
            
            if (errors.length > 0){
                
                e.preventDefault()
            
            }

            
        
        })

   
    
   





