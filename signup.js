// signup.js
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

window.onload = function () {
  const signupText = document.getElementById('signupText');
  const signupModal = document.getElementById('signupModal');
  const closeSignupModal = signupModal.getElementsByClassName('close')[0];

  signupText.addEventListener('click', function () {
    signupModal.style.display = 'block';
  });

  closeSignupModal.addEventListener('click', function () {
    signupModal.style.display = 'none';
    clearSignupForm(); // Clear the signup form when closing
  });

  window.addEventListener('click', function (event) {
    if (event.target === signupModal) {
      signupModal.style.display = 'none';
      clearSignupForm(); // Clear the signup form when closing
    }
  });

  document.getElementById('signupSubmit').addEventListener('click', function () {
    const email = document.getElementById('signupEmail').value;
    const name = document.getElementById('signupName').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    // Validate phone number (must be 11 digits)
    if (!isValidPhoneNumber(phone)) {
      alert('전화번호를 정확히 입력해주세요.');
      return;
    }

    // Validate password (must be at least 6 characters)
    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    // Validate password confirmation
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful signup
        const userId = userCredential.user.uid;
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
          phoneNumber: phone,
        });
        alert('회원가입이 완료되었습니다.');
        signupModal.style.display = 'none';
        clearSignupForm(); // Clear the signup form after successful signup
      })
      .catch((error) => {
        // Failed signup
        alert(error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      });
  });

  // Function to clear the signup form
  function clearSignupForm() {
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupName').value = '';
    document.getElementById('signupPhone').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupPasswordConfirm').value = '';
  }

  // Function to validate phone number (must be 11 digits)
  function isValidPhoneNumber(phone) {
    const phoneNumberRegex = /^\d{11}$/;
    return phoneNumberRegex.test(phone);
  }
};
