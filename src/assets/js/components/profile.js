import { d } from '../helpers/web';
import { c } from '../helpers/console';
import firebase from 'firebase/app';
import 'firebase/database';
const profile = () => {
  const user = firebase.auth().currentUser;
  const dbRef = firebase.database().ref().child('photos');
  let profilePhotos = '';
  // Ejecutar en intervalos hasta que el documento este completo*
  // Para poder usar los script que involucren html dinamico
  const profileScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(profileScripts);
      firebase.database().ref('photos').once('value', (snapshot) => {
        // c(snapshot, snapshot.key, snapshot.val());
        // d.querySelector('.profile-photos').innerHTML = '';
        snapshot.forEach(photo => {
          if (photo.val().uid === user.uid) {
            profilePhotos += `<img src="${photo.val().photoURL}" alt="photo"/>`;
          }
        });
        d.querySelector('.profile-photos').innerHTML = profilePhotos;
      });
      firebase.database().ref('photos').on('child_added', snapshot => {
        if (snapshot.val().uid === user.uid) {
          d.querySelector('.profile-photos').innerHTML += `<img src="${snapshot.val().photoURL}" alt="photo"/>`;
        }
      });
    }
  }, 100);
  //  <p>${user.uid}</p>
  return `
    <article class="profile content-section u-hide">
      <h2 class="profile-name">${user.displayName}</h2>
      <p class="profile-email">${user.email}</p>
      <img class="profile-avatar" src="${user.photoURL}" alt="Profile avatar"/>
      <h3 class="u-title">Tus fotos</h3>
      <aside class="profile-photos"></aside>
    </article>
  `;
}

export default profile;
