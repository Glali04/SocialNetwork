let session = new Session();
session = session.getSession();

if(session !== ""){
    window.location.href = "hexa.html";
}

document.querySelector("#registration")
.addEventListener("click", () => {
    document.querySelector(".custom-modal").style.display = "block";
});

document.querySelector("#closeModal")
.addEventListener("click", () => {
    document.querySelector(".custom-modal").style.display = "none";
});

let config = {
    "userName": {
        required: true,
        minlength: 5,
        maxlength: 50
    },
    "registerEmail": {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },
    "registerPassword": {
        required: true,
        matching: "passwordAgain",
        minlength: 7,
        maxlength: 25
    },
    "passwordAgain": {
        required: true,
        matching: "registerPassword",
        minlength: 7,
        maxlength: 25
    }
};

let validator = new Validator(config, "#registerForm");
document.querySelector("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if(validator.validationPassed()){
        let user = new User();
        user.username = document.querySelector("#userName").value;
        user.email = document.querySelector("#email").value;
        user.password = document.querySelector("#password").value;
        user.create();
    }else{
        alert("polja nisu dobro popunjena")
    }
});
document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    
    let user = new User();
    user.email = document.querySelector("#loginEmail").value;
    user.password = document.querySelector("#loginPassword").value;
    user.login();
})