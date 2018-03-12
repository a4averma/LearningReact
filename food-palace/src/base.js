import firebase from 'firebase';
import Rebase from 're-base';

const firebaseApp = new firebase.initializeApp({
  apiKey: 'your_api_key',
  authDomain: 'your_auth_url',
  databaseURL: 'your_db_url'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
