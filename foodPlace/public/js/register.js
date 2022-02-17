let form = document.querySelector("form.registro");

form.addEventListener("submit", function (e) {
  let errors = [];

  const userName = document.getElementById("fullname");
  const userEmail = document.getElementById("email");
  const userPassword = document.getElementById("password");
  const userImage = document.getElementById("image");

  //Validate img format
  if (!/\.(jpg|png|gif|jpeg)$/i.test(userImage.value)) {
    errors.push("image");
  }

  //Validate username
  if (userName.value.length < 2) {
    errors.push("username");
  }

  //Validate email
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  let validationEmail = regex.test(userEmail.value);

  if (validationEmail === false) {
    errors.push("email");
  }

  //Validate password
  if (userPassword.value.length < 8) {
    errors.push("password");
  }

  //Set errors
  if (errors.includes('username')) {
    document.querySelector(".danger-name").innerHTML = "Please use a valid username (min 2 characters)"
  } else {
    document.querySelector(".danger-name").innerHTML = ""
  }

  if (errors.includes('email')) {
    document.querySelector(".danger-email").innerHTML = "Please use a valid email"
  } else {
    document.querySelector(".danger-email").innerHTML = ""
  }

  if (errors.includes('password')) {
    document.querySelector(".danger-password").innerHTML = "Please use a valid password (min 8 characters)"
  } else {
    document.querySelector(".danger-password").innerHTML = ""
  } 
  

  if (errors.includes('image')) {
    document.querySelector(".danger-image").innerHTML = "Please use a valid image (JPEG,JPG,GIF,PNG)"
  } else {
    document.querySelector(".danger-image").innerHTML = ""
  }

  if (errors.length > 0) {
    e.preventDefault();
  }
});
