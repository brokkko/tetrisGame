function storeUser(user) {
    localStorage.setItem('tetris.username', user);
}

function getUser() {
    return localStorage["tetris.username"];
}