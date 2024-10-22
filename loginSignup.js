// loginSignup.js

function getElementValue(id) {
    return document.getElementById(id).value;
  }
  
  
  const toggleLoginForm = () => {
    document.getElementById('loginDiv').style.display = 'block';
    document.getElementById('signupDiv').style.display = 'none';
  };
  
  const toggleSignupForm = () => {
    document.getElementById('loginDiv').style.display = 'none';
    document.getElementById('signupDiv').style.display = 'block';
  };
  
  //회원가입 화면으로 감
  document.getElementById('signupLink').addEventListener('click', (event) => {
    event.preventDefault();
    toggleSignupForm();
  });
  
  //로그인 화면으로 감
  document.getElementById('loginLink').addEventListener('click', (event) => {
    event.preventDefault();
    toggleLoginForm();
  });
  
  document.getElementById('signupButton').addEventListener('click', () => {
    const email = getElementValue('signupEmail');
    const password = getElementValue('signupPassword');
    const passwordConfirm = getElementValue('signupPasswordConfirm');
    const name = getElementValue('signupName'); // Fix: store name value
    const phoneValue = getElementValue('signupPhone'); // Fix: store phone value
  
    if (phoneValue.length !== 11) {
      alert('전화번호는 11자리여야 합니다.');
      return;
    }
  
    if (password.length < 6) {
      alert('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }
  
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
      return;
    }
  
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // 회원가입 성공
        var user = userCredential.user;
  
        // 사용자 정보를 데이터베이스에 저장합니다.
        db.ref('users/' + user.uid).set({
          email: email,
          name: name, // Fix: use the stored name value
          phone: phoneValue, // Fix: use the stored phone value
        });
  
        alert('회원가입에 성공하였습니다.');
      })
      .catch((error) => {
        // 회원가입 실패
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('회원가입에 실패하였습니다. 에러 메시지: ' + errorMessage);
      });
  });
  
  // 로그인
  document.getElementById('loginButton').addEventListener('click', function () {
    const email = getElementValue('loginEmail');
    const password = getElementValue('loginPassword');
  
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // 로그인 성공
        var user = userCredential.user;
        // 이메일 정보를 세션 스토리지에 저장합니다.
        sessionStorage.setItem('email', email);
  
        // 데이터베이스에서 사용자의 이름을 가져옵니다.
        db.ref('users/' + user.uid)
          .once('value')
          .then((snapshot) => {
            var name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
  
            // 사용자의 이름을 세션 스토리지에 저장합니다.
            sessionStorage.setItem('username', name);
  
            // main.html 페이지로 이동합니다.
            window.location.href = 'main.html';
          });
      })
      .catch((error) => {
        // 로그인 실패
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('로그인에 실패하였습니다. 에러 메시지: ' + errorMessage);
      });
  });
  