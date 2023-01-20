// check Login 
const loggedIn = sessionStorage.getItem("userLoggedIn");

function checkLogin(loggedIn, hrefurl) {
    if (loggedIn) {
        alert("Already LoggedIn!!");
        window.location.replace(hrefurl);
    }
}

checkLogin(loggedIn, "/resume.html");


// Login Fucationality 

// Setting Up Username and Password to local storage 
const userDetails = {
    username: "admin",
    password: "password"
};

localStorage.setItem("usercred", JSON.stringify(userDetails));

const getCred = JSON.parse(localStorage.getItem("usercred")); 

// Check UserName and Password 
const loginFunc = () => {
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const LoginError = document.getElementById("loginError");
    const loginForm = document.getElementById("loginForm");

    // console.dir(loginForm);
    
    if (user == "" && password == "") {
        LoginError.innerHTML = `<i class="fa-solid fa-circle-exclamation text-warning"></i> Username or/and Password can't be empty !!`;
    }
    else if (getCred["username"] == user && getCred["password"] == password) {
        sessionStorage.setItem("userLoggedIn", true);
        window.location.replace("/resume.html");
    }
    else {
        loginForm.reset();
        LoginError.innerHTML = `<i class="fa-solid fa-circle-exclamation text-warning"></i> Username or/and Password Incorrect !!`;
    }

}

document.getElementById('submitBtn').addEventListener('click', loginFunc);