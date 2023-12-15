// login.js
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

window.onload = function () {
  const loginText = document.getElementById('loginText');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = loginModal.getElementsByClassName('close')[0];

  loginText.addEventListener('click', function () {
    loginModal.style.display = 'block';
  });

  closeLoginModal.addEventListener('click', function () {
    loginModal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });

  document.getElementById('loginSubmit').addEventListener('click', function () {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login
        loginModal.style.display = 'none';
      })
      .catch((error) => {
        // Failed login
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      });
  });
};