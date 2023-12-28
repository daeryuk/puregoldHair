// index.js
const firebaseConfig = {
    apiKey: "AIzaSyDeOfzIlQKi1kcFQFaA5Y60WOyvk3qBBvk",
    authDomain: "puregoldhair-db.firebaseapp.com",
    projectId: "puregoldhair-db",
    storageBucket: "puregoldhair-db.appspot.com",
    messagingSenderId: "155330605933",
    appId: "1:155330605933:web:a1b46142e44f94ef192064"
};
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.database();

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
  
  document.getElementById('signupLink').addEventListener('click', (event) => {
    event.preventDefault();
    toggleSignupForm();
  });
  
  document.getElementById('loginLink').addEventListener('click', (event) => {
    event.preventDefault();
    toggleLoginForm();
  });
  
  

document.getElementById('signupButton').addEventListener('click', () => {
  const email = getElementValue('signupEmail');
  const password = getElementValue('signupPassword');
  const passwordConfirm = getElementValue('signupPasswordConfirm');
  const phone = getElementValue('signupPhone');

  if (phone.length !== 11) {
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

  auth.createUserWithEmailAndPassword(email, password)
.then((userCredential) => {
    // 회원가입 성공
    var user = userCredential.user;

    // 사용자 정보를 가져옵니다.
    var name = getElementValue('signupName');
    var phone = getElementValue('signupPhone');

    // 사용자 정보를 데이터베이스에 저장합니다.
    db.ref('users/' + user.uid).set({
        email: email,
        name: name,
        phone: phone
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
document.getElementById('loginButton').addEventListener('click', function() {
    const email = getElementValue('loginEmail');
    const password = getElementValue('loginPassword');

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // 로그인 성공
        var user = userCredential.user;
        alert('로그인에 성공하였습니다.');
    })
    .catch((error) => {
        // 로그인 실패
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('로그인에 실패하였습니다. 에러 메시지: ' + errorMessage);
    });
});