import { d } from '../helpers/web';
import { c, error } from '../helpers/console';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import { progressBar, progressStatus, showProgress, hideProgress } from './upload_progress';
import { errorMsg, successMsg } from "../helpers/messages";
import { savePhotoInDb } from "../helpers/photos_db";
const uploader = () => {
  // Ejecutar en intervalos hasta que el documento este completo*
  // Para poder usar los script que involucren html dinamico
  const uploaderScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(uploaderScripts);
      // https://firebase.google.com/docs/storage/web/create-reference
      // const storage = firebase.storage();
      // const bucket = storage.ref();
      const storageRef = firebase.storage().ref().child('photos');
      const dbRef = firebase.database().ref().child('photos');
      const user = firebase.auth().currentUser;
      const uploader = d.getElementById('uploader');
      const form = d.getElementById('upload');
      const output = d.querySelector('.uploader').querySelector('.progress-output');
      uploader.addEventListener('change', e => {
        // c(e.target.files);
        Array.from(e.target.files).forEach(file => {
          // c(file);
          output.innerHTML = '';
          if (file.type.match('image.*')) {
            output.innerHTML = successMsg('Tu archivo es valido', null);
            let uploadTask = storageRef.child(file.name).put(file);
            // https://firebase.google.com/docs/storage/web/upload-files
            uploadTask.on('state_changed', data => {
              c(data);
              showProgress();
              progressStatus(data);
            }, err => {
              error(err, err.code, err.message)
              output.innerHTML = errorMsg(`${err.message}`, err);
            }, () => {
              // Upload completed successfully, now we can get the download URL
              uploadTask
                .snapshot
                .ref
                .getDownloadURL()
                .then((downloadURL) => {
                  c('[firebase]: File available at: ', downloadURL);

                  output.insertAdjacentHTML('afterbegin', `
                  ${successMsg('Tu foto se ha subido')}
                  <img src="${downloadURL}" title="${file.name}"/>
                  `);
                  savePhotoInDb(downloadURL, user);
                  hideProgress();
                });
            });
            // output.innerHTML = successMsg('Tu foto se ha subido', null);
          } else {
            output.innerHTML = errorMsg('Tu archivo debe ser una imagen', null);
          }
        });

        form.reset();
      });

    }
  }, 100);

  return `
    <article class="uploader content-section u-hide">
      <h2 class="u-title">Sube tus fotos</h2>
      <form action="" id="upload">
        <input type="file" name="uploader" id="uploader" multiple />
        <label for="uploader"><i class="fas fa-cloud-upload-alt" title="Subir foto(s)"></i></label>
      </form>
      ${progressBar()}
    </article>
  `;
}

export default uploader;
