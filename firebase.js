const firebaseConfig = {
    apiKey: 'AIzaSyDeOfzIlQKi1kcFQFaA5Y60WOyvk3qBBvk',
    authDomain: 'puregoldhair-db.firebaseapp.com',
    databaseURL:
      'https://puregoldhair-db-default-rtdb.asia-southeast1.firebasedatabase.app', // 데이터베이스 URL 변경
    projectId: 'your-project-id',
    projectId: 'puregoldhair-db',
    storageBucket: 'puregoldhair-db.appspot.com',
    messagingSenderId: '155330605933',
    appId: '1:155330605933:web:a1b46142e44f94ef192064',
  };
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var db = firebase.database();
  var database = firebase.database();