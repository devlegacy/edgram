import { d } from '../helpers/web';
import { c } from '../helpers/console';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const timeline = () => {
  const dbRef = firebase.database().ref().child('photos');
  // Ejecutar en intervalos hasta que el documento este completo*
  // Para poder usar los script que involucren html dinamico
  const timelineScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(timelineScripts);
      const timelinePhotos = d.querySelector('.timeline-photos');
      function photoTemplate(data) {
        return `
          <figure class="photo">
            <img class="photo-image" src="${data.photoURL}" alt="Profile picture">
            <figcaption class="photo-author">
              <img src="${data.avatar}" class="photo-authoravatar" alt="Avatar picture">
              <p class="photo-authorname">${data.displayName}</p>
            </figcaption>
          </figure>
        `;
      }
      firebase.database().ref('photos').once('value', (snapshot) => {
        // c(snapshot, snapshot.key, snapshot.val());
        // d.querySelector('.profile-photos').innerHTML = '';
        snapshot.forEach(photo => {
          timelinePhotos.insertAdjacentHTML('afterbegin', photoTemplate(photo.val()));
        });
      });
      firebase.database().ref('photos').on('child_added', snapshot => {
        timelinePhotos.insertAdjacentHTML('afterbegin', photoTemplate(snapshot.val()));
      });
    }
  }, 100);

  return `
    <article class="timeline content-section u-show">
      <aside class="timeline-photos"></aside>
    </article>
  `;
}

export default timeline;
