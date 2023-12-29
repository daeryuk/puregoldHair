// clientlist.js 수정
db.ref('reservations').on('value', function(snapshot) {
    var data = snapshot.val();
    var list = document.getElementById('reservationList');

    // 기존에 표시되던 예약 목록 삭제
    while (list.rows.length > 1) {
        list.deleteRow(-1);
    }

    for (var key in data) {
        var row = list.insertRow(-1);
        row.id = key;
        var checkboxCell = row.insertCell(-1);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = key;
        checkboxCell.appendChild(checkbox);
        var fields = ['name', 'visitTime', 'email', 'gender', 'cutContent']; // 'reservationTime'을 'visitTime'으로 변경

        for (var i = 0; i < fields.length; i++) {
            var cell = row.insertCell(-1);
            cell.textContent = data[key][fields[i]];
        }
    }
});

// '선택 항목 삭제' 버튼 클릭 이벤트
document.getElementById('deleteBtn').addEventListener('click', function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        var key = checkboxes[i].id;
        db.ref('reservations/' + key).remove();
    }
});
