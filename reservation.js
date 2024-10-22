// reservation.js
window.onload = function () {
  var reservationForm = document.getElementById('reservationForm');

  reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
              sessionStorage.setItem('email', user.email);

              var visitTime = document.getElementById('timePicker').value;
              var gender = document.getElementById('gender').value;
              var cutContent = document.getElementById('cutContent').value;
              var username = sessionStorage.getItem('username') || 'Unknown';
              var email = sessionStorage.getItem('email') || 'Unknown';

              database.ref('reservations/').push({
                  visitTime: visitTime,
                  gender: gender,
                  cutContent: cutContent,
                  name: username,
                  email: email,
              }, function(error) {
                  if (error) {
                      alert('예약 저장에 실패했습니다. 다시 시도해주세요.');
                  } else {
                      alert('예약이 완료되었습니다.');
                      window.location.href = 'myReservation.html';
                  }
              });
          } else {
              alert('예약을 위해 로그인이 필요합니다.');
          }
      });
  });

  // 관리자 섹션 처리
  firebase.auth().onAuthStateChanged(function(user) {
      if (user && user.email === 'admin@gmail.com') {
          var adminSection = document.getElementById('adminSection');
          adminSection.innerHTML = `
              <div class="admin-panel">
                  <a href="clientlist.html" class="btn btn-admin">
                      <i class="fas fa-users-cog"></i>
                      고객예약 리스트 관리
                  </a>
              </div>
          `;
      }
  });
};
