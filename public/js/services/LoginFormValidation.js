const form = document.querySelector("form");
const usernameField = form.querySelector(".username"),
    nameInput = usernameField.querySelector("input");

form.onsubmit = (e)=>{
    e.preventDefault();
    if(nameInput.value === "") {
        document.getElementById("error").innerHTML = "Имя не может быть пустым";
        usernameField.classList.add("shake", "error");
    } else {
        storeUser(nameInput.value, 0);
        window.location.href = form.getAttribute("action");
    }

    setTimeout(()=>{
        usernameField.classList.remove("shake");
    }, 500);

    nameInput.onkeyup = () => {
        usernameField.classList.remove("error");
        usernameField.classList.add("valid");
    }

}