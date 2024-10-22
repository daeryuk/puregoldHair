// main.js
window.onload = function () {
    var reservationLink = document.getElementById('reservation-link');
    var myReservationLink = document.getElementById('my-reservation-link');
    var logoutButton = document.getElementById('logout-button');
    var userEmailDisplay = document.getElementById('user-sayhi');

    // 사용자 로그인 상태 확인
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // 사용자가 로그인한 경우
            // 사용자 이름으로 인사말
            var username = sessionStorage.getItem('username')
            userEmailDisplay.textContent = '환영합니다! '+username+'님';
            logoutButton.style.display = 'block'; // 로그아웃 버튼 표시
        } else {
            // 사용자가 로그인하지 않은 경우
            userEmailDisplay.textContent = '로그인 후 예약 가능합니다!';
            logoutButton.style.display = 'none'; // 로그아웃 버튼 숨김
        }
    });

    // 예약하기 버튼 클릭 시
    reservationLink.addEventListener('click', function (e) {
        e.preventDefault();
        checkUserAuth(function (user) {
            if (user) {
                window.location.href = 'reservation.html';
            } else {
                alert('로그인을 하셔야 합니다.');
                window.location.href = 'loginSignup.html';
            }
        });
    });

    // 나의 예약정보 확인 버튼 클릭 시
    myReservationLink.addEventListener('click', function (e) {
        e.preventDefault();
        checkUserAuth(function (user) {
            if (user) {
                window.location.href = 'myReservation.html';
            } else {
                alert('로그인을 하셔야 합니다.');
                window.location.href = 'loginSignup.html';
            }
        });
    });

    // 로그아웃 버튼 클릭 시
    logoutButton.addEventListener('click', function () {
        // signOut 
        firebase.auth().signOut().then(function() {
            alert('로그아웃되었습니다.');
            window.location.reload(); // 페이지를 새로 고침하여 변경 사항 반영
        }).catch(function(error) {
            console.error('로그아웃 실패:', error);
        });
    });
};

// 사용자 인증 상태 확인을 위한 함수
function checkUserAuth(callback) {
    firebase.auth().onAuthStateChanged(function (user) {
        callback(user);
    });
}


  
  
  