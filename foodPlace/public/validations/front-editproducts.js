
    const formulario = document.querySelector("#formEdit")
    
        formulario.addEventListener("submit", function(e){
            
           
           
            const productName = document.querySelector(".productName")
            const productDescription = document.querySelector(".productDescription")
            const productImage = document.querySelector("#product-image")
            const productCategory = document.querySelector("#product-category")
            const productPrice = document.querySelector(".product-price")
            const productDelay = document.querySelector(".delay-time")

            let errors = []

            if (productName.value.length < 5 || productName.value == ""){
                errors.push("productName")  
            }
            if (productDescription.value.length < 20 ){
                errors.push("productDescription")    
            }
            if (productCategory.value == "" ){
              errors.push("productCategory")
            }
            if (productPrice.value == "" ){
              errors.push("productPrice")
            }
            if (productDelay.value == "" ){
              errors.push("productDelay")
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
              if (errors.includes('productCategory')) {
                document.querySelector("#productCategory span").innerHTML = "Please choose a category"
              } else {
                document.querySelector("#productCategory span").innerHTML = ""
              }
              if (errors.includes('productPrice')) {
                document.querySelector("#productPrice span").innerHTML = "Please enter a price"
              } else {
                document.querySelector("#productPrice span").innerHTML = ""
              }
              if (errors.includes('productDelay')) {
                document.querySelector("#productDelay span").innerHTML = "Please enter a delay"
              } else {
                document.querySelector("#productDelay span").innerHTML = ""
              }
            
            if (errors.length > 0){
                
                e.preventDefault()
            
            }

            
        
        })

   
    
   





