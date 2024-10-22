// clientlist.js 수정
db.ref('reservations').on('value', function(snapshot) {
    var data = snapshot.val();
    var tbody = document.querySelector('#reservationList tbody');
    tbody.innerHTML = '';

    for (var key in data) {
        var row = document.createElement('tr');
        row.id = key;
        
        // Checkbox cell
        var checkboxCell = document.createElement('td');
        checkboxCell.className = 'checkbox-wrapper';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = key;
        checkbox.className = 'custom-checkbox';
        checkbox.addEventListener('change', function() {
            this.closest('tr').classList.toggle('selected');
        });
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);

        // Data cells
        var fields = ['name', 'visitTime', 'email', 'gender', 'cutContent'];
        fields.forEach(field => {
            var cell = document.createElement('td');
            if (field === 'gender') {
                var badge = document.createElement('span');
                badge.className = `status-badge status-${data[key][field].toLowerCase()}`;
                badge.textContent = data[key][field];
                cell.appendChild(badge);
            } else {
                cell.textContent = data[key][field];
            }
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    }
});

document.getElementById('deleteBtn').addEventListener('click', function() {
    if (!confirm('선택한 예약을 삭제하시겠습니까?')) return;

    var checkboxes = document.querySelectorAll('.custom-checkbox:checked');
    checkboxes.forEach(checkbox => {
        db.ref('reservations/' + checkbox.id).remove()
            .then(() => {
                console.log('예약이 성공적으로 삭제되었습니다.');
            })
            .catch(error => {
                console.error('삭제 중 오류가 발생했습니다:', error);
            });
    });
});
