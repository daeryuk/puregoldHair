// myReservation.js
window.onload = function () {
  var cancelReservationBtn = document.getElementById('cancelReservation');
  var reservationDetails = document.getElementById('reservationDetails');

  // 페이지 로딩 시 사용자의 예약 정보를 화면에 표시
  var email = sessionStorage.getItem('email');

  console.log("Logged-in email: " + email); //로그인 한 이메일 확인해보자
  var ref = database.ref('reservations/');

  ref
  .orderByChild('email')
  .equalTo(email)
  .on('value', function (snapshot) {
    var data = snapshot.val();
    if (data) {
      var html = '';
      for (var key in data) {
        html += `<p>예약 시간: ${data[key].visitTime}</p>`;
        html += `<p>이름: ${data[key].name}</p>`;
        html += `<p>성별: ${data[key].gender}</p>`;
        html += `<p>커트 내용: ${data[key].cutContent}</p>`;
      }
      reservationDetails.innerHTML = html;
    } else {
      reservationDetails.innerHTML = '예약한 정보가 없습니다!';
    }
  });
  
  if (cancelReservationBtn) {
    // '예약 취소' 클릭 시 이벤트
    cancelReservationBtn.addEventListener('click', function () {
      ref
        .orderByChild('email')
        .equalTo(email)
        .once('child_added', function (snapshot) {
          ref.child(snapshot.key).remove();
          reservationDetails.innerHTML = '예약이 취소되었습니다.';
        });
    });
  }
};
