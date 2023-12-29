// reservation.js
window.onload = function () {
  var reservationForm = document.getElementById('reservationForm');

  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        sessionStorage.setItem('email', user.email);
      } else {
        // No user is signed in.
        sessionStorage.setItem('email', 'Unknown');
      }
    });

    var amPm = document.getElementById('amPm').value;
    var hour = document.getElementById('hour').value;
    var minute = document.getElementById('minute').value;
    var visitTime = amPm + ' ' + hour + ':' + minute;

    var gender = document.getElementById('gender').value;
    var cutContent = document.getElementById('cutContent').value;
    var username = sessionStorage.getItem('username');
    var email = sessionStorage.getItem('email') || 'Unknown';

    database.ref('reservations/').push({
      visitTime: visitTime,
      gender: gender,
      cutContent: cutContent,
      name: username,
      email: email,
    });

    alert('예약이 완료되었습니다.');
  });
};
