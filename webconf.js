const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", () => {
    // Janela modal
    fetch(`${urlBase}/signin`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `email=${email}&password=${pass}`

        
    });
    sessionStorage.token = email;
        if(!sessionStorage.token) {
        // utilizador sem acesso à página
        } else {
            //acesso à página
        }
});

/* talvez o sessionStorage.token = email
        if(!sessionStorage.token) {
            // utilizador sem acesso à página
            } else {
                //acesso à página
            } vá aqui 
*/