const {initializeApp} = require('firebase/app');
require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyAe1AO7AnxgDWHHT31buQdrgk9p4o06IHE",
    authDomain: "pf-soyhenry.firebaseapp.com",
    projectId: "pf-soyhenry",
    storageBucket: "pf-soyhenry.appspot.com",
    messagingSenderId: "959054088030",
    appId: "1:959054088030:web:978b5863ed037d2a5671cf"
  };

 const firebase = initializeApp(firebaseConfig);

 module.exports = firebase