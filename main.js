// main.js
window.onload = function () {
    // 세션 스토리지에서 사용자의 이름을 가져옵니다.
    var name = sessionStorage.getItem('username') || 'Anonymous';

    // 사용자의 이름을 화면에 출력합니다.
    var welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.textContent = '환영합니다. ' + name + '님! ';

};
document.querySelector('header').addEventListener('mousemove', function(e) {
    const bulge = this.querySelector('#bulge');
    bulge.style.left = e.pageX + 'px';
    bulge.style.top = e.pageY + 'px';
});