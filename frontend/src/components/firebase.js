import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };