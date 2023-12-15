// home.js
document.getElementById("loginText").addEventListener("click", function () {
    document.getElementById('loginModal').style.display = 'block';
});

document.getElementById("signupText").addEventListener("click", function () {
    document.getElementById('signupModal').style.display = 'block';
});

// 로그인 회원가입 입력 폼 닫힌 기능
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}