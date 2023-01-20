var logoutBtn = document.getElementById('logOutbtn');

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem("userLoggedIn");
    window.location.replace('/');
})