function storeUser(user, score) {
    let usersList = JSON.parse(localStorage.getItem("tetris.scores")) || [];
    if(checkUniqueness(user)) {
        let newUser = {'name': user, 'score': JSON.stringify(score)};
        if(!(usersList instanceof Array))
            usersList = [usersList];
        usersList.push(newUser);
        localStorage.setItem("tetris.scores", JSON.stringify(usersList));
    }
    localStorage.setItem("tetris.lastUser", user);
}

function getUser() {
    let usersList = JSON.parse(localStorage.getItem("tetris.scores")) || [];
    if(!(usersList instanceof Array))
        usersList = [usersList];
    console.log("in get")
    console.log(usersList)
    return usersList;
}

function storeUpdatedScore(updatedScore) {
    let currentUser = localStorage.getItem("tetris.lastUser");
    let usersList = JSON.parse(localStorage.getItem("tetris.scores")) || [];
    if(!(usersList instanceof Array))
        usersList = [usersList];

    for(let i=0; i<usersList.length; i++) {
        if(usersList[i].name === currentUser) {
            usersList[i].score = updatedScore;
            break;
        }
    }
    localStorage.setItem("tetris.scores", JSON.stringify(usersList));
}

function checkUniqueness(name) {
    let usersList = JSON.parse(localStorage.getItem("tetris.scores")) || [];
    if(!(usersList instanceof Array))
        usersList = [usersList];

    for(let i=0; i<usersList.length; i++) {
        if(usersList[i].name === name) {
            return false;
        }
    }
    return true;
}

function getLastUser() {
    return localStorage.getItem("tetris.lastUser");
}

function getCurrentUserScore() {
    let user = getLastUser();
    let usersList = JSON.parse(localStorage.getItem("tetris.scores")) || [];
    if(!(usersList instanceof Array))
        usersList = [usersList];

    for(let i=0; i<usersList.length; i++) {
        if(usersList[i].name === user) {
            return usersList[i].score;
        }
    }
}