const scoreTable = document.getElementsByClassName("wrapper-score-table").item(0);

document.getElementById("show-score-table").onclick = (() => {
    playOnClick();
    prepareInfo();
});

document.getElementById("score-table").onclick = (() => {
    playOnClick();
    prepareInfo();
});

document.getElementById("close").onclick = (() => {
    playOnClick();
    scoreTable.style.display = 'none';
})

function prepareInfo() {
    scoreTable.style.display = 'block';
    let html = '<table>';
    let usersList = getUser();
    usersList.sort(compare);
    html += '<thead>' + '<tr>' + '<th>Игрок</th>'
        +' <th>Количество очков</th>' + '</tr>' + '</thead>'
        + '<tbody>';
    for (let i = 0; i < usersList.length; i++) {
        html += '<tr>';
        html += '<td>' + usersList[i].name + '</td>';
        html += '<td>' + usersList[i].score + '</td>';
        html += '</tr>';
        if(i === 5) break;
    }
    document.getElementById('table').innerHTML = html + '</tbody>' + '</table>';
}

function compare(a, b) {
    if (a.score > b.score){
        return -1;
    }
    if (a.score < b.score){
        return 1;
    }
    return 0;
}

function playOnClick() {
    let click = new Audio("../assets/sounds/click2.wav");
    click.play();
}