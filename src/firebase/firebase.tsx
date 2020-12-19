import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBWf1JYtcld5rEhou2YyANxAtl20AylP80',
  authDomain: 'groundstandards-8a1dd.firebaseapp.com',
  databaseURL: 'https://groundstandards-8a1dd.firebaseio.com',
  projectId: 'groundstandards-8a1dd',
  storageBucket: 'groundstandards-8a1dd.appspot.com',
  messagingSenderId: '137110708999',
  appId: '1:137110708999:web:ab0b42be7878425a805ba2',
  measurementId: 'G-V8H0LZB9DH'
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firebase as fireFirebase, firestore as fireFirestore, auth as fireAuth };
