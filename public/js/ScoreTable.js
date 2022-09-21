const button = document.getElementById("show-score-table");
const closeButton = document.getElementById("close");
const scoreTable = document.getElementsByClassName("wrapper-score-table").item(0);

button.onclick = ((e) => {
    scoreTable.style.display = 'block';
    let html = '<table>';
    let usersList = getUser();
    usersList.sort(compare);
    console.log()
    html += '<thead>' + '<tr>' + '<th>Имя</th>'
         +' <th>Количество очков</th>' + '</tr>' + '</thead>'
         + '<tbody>';
    for (let i = 0; i < usersList.length; i++) {
        html += '<tr>';
        html += '<td>' + usersList[i].name + '</td>';
        html += '<td>' + usersList[i].score + '</td>';
        html += '</tr>';
        if(i === 3) break;
    }
    console.log(html.toString())
    document.getElementById('table').innerHTML = html + '</tbody>' + '</table>';
});

closeButton.onclick = ((e) => {
    scoreTable.style.display = 'none';
})

function compare(a, b) {
    if (a.score < b.score){
        return -1;
    }
    if (a.score > b.score){
        return 1;
    }
    return 0;
}