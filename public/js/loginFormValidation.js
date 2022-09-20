const form = document.querySelector("form");
usernameField = form.querySelector(".username"), nameInput = usernameField.querySelector("input");

form.onsubmit = (e)=>{
    e.preventDefault();
    if(nameInput.value === "") {
        usernameField.classList.add("shake", "error");
    } else {
        storeUser(nameInput.value);
        window.location.href = form.getAttribute("action");
    }

    // remove shake class after 500ms
    setTimeout(()=>{
        usernameField.classList.remove("shake");
    }, 500);

    // remove error
    nameInput.onkeyup = () => {
        usernameField.classList.remove("error");
        usernameField.classList.add("valid");
    }

}