// myReservation.js
window.onload = function () {
  var cancelReservationBtn = document.getElementById('cancelReservation');
  var reservationDetails = document.getElementById('reservationDetails');
  
  var email = sessionStorage.getItem('email');
  console.log("Logged-in email: " + email);
  
  var ref = database.ref('reservations/');
  ref
    .orderByChild('email')
    .equalTo(email)
    .on('value', function (snapshot) {
      var data = snapshot.val();
      if (data) {
        var html = '';
        for (var key in data) {
          html += `<p><i class="far fa-clock"></i>예약 시간: ${data[key].visitTime}</p>`;
          html += `<p><i class="far fa-user"></i>이름: ${data[key].name}</p>`;
          html += `<p><i class="fas fa-venus-mars"></i>성별: ${data[key].gender}</p>`;
          html += `<p><i class="fas fa-cut"></i>커트 내용: ${data[key].cutContent}</p>`;
        }
        reservationDetails.innerHTML = html;
      } else {
        reservationDetails.innerHTML = '<p style="text-align: center; color: #666;"><i class="fas fa-info-circle"></i>예약한 정보가 없습니다!</p>';
      }
    });
  
  if (cancelReservationBtn) {
    cancelReservationBtn.addEventListener('click', function () {
      if (confirm('정말로 예약을 취소하시겠습니까?')) {
        ref
          .orderByChild('email')
          .equalTo(email)
          .once('child_added', function (snapshot) {
            ref.child(snapshot.key).remove();
            reservationDetails.innerHTML = '<p style="text-align: center; color: #dc3545;"><i class="fas fa-check-circle"></i>예약이 취소되었습니다.</p>';
          });
      }
    });
  }
};