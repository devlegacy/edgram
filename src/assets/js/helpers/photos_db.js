import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
export function savePhotoInDb(url, user) {
  // https://firebase.google.com/docs/database/web/read-and-write
  // Push generate a unique id
  firebase.database().ref().child('photos').push({
    photoURL: url,
    uid: user.uid,
    displayName: user.displayName,
    avatar: user.photoURL,
  });
};
