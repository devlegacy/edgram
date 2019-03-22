import { d, n, w } from '../helpers/web';
import { c, error } from '../helpers/console';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import { progressBar, progressStatus, showProgress, hideProgress } from './upload_progress';
import { errorMsg, successMsg } from "../helpers/messages";
import { savePhotoInDb } from "../helpers/photos_db";

const camera = () => {
  // Ejecutar en intervalos hasta que el documento este completo*
  // Para poder usar los script que involucren html dinamico
  const cameraScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(cameraScripts);
      const cameraApp = d.querySelector('.camera');
      const video = d.getElementById('camera-stream');
      const photo = d.getElementById('photo');
      const startCameraBtn = d.getElementById('start-camera');
      const output = d.querySelector('.camera').querySelector('.progress-output');
      const controls = d.querySelector('.camera-menu');
      const takePhotoBtn = d.getElementById('take-photo');
      const deletePhotoBtn = d.getElementById('delete-photo');
      const uploadPhotoBtn = d.getElementById('upload-photo');
      const downloadPhotoBtn = d.getElementById('download-photo');
      const canvas = d.getElementById('canvas-snap');
      const context = canvas.getContext('2d');

      let snapshot;

      function cameraInit() {
        n.getMedia = (
          n.getUserMedia ||
          n.webkitGetUserMedia ||
          n.mozGetUserMedia ||
          n.msGetUserMedia
        );

        if (!n.getMedia) {
          output.innerHTML = errorMsg('Tu navegador no soporta el uso de la camara del dispositivo', null);
        } else {
          n.getMedia(
            // Restricciones (contraints) *Requerido
            {
              video: true,
              // audio: true
            },
            // Funcion de finalizacion (Succes-Callback) *Requerido
            stream => {

              if ('srcObject' in video) {
                video.srcObject = stream;
              } else if (n.mozGetUserMedia) {
                video.mozSrcObject = stream;
              } else {
                video.src = (w.URL || w.webkitURL).createObjectURL(stream);
              }
              video.play();
              // video.onloadedmetadata = function (e) {
              //   console.log(e);

              // };
            },
            // errorCallback *Opcional
            err => {
              errorMsg(`Ocurrió un error al acceder a la camara de tu dispositivo ${err.mesagge}`, err);
            }
          );
        }
      }

      function takeSnapShot() {
        const width = video.videoWidth;
        const height = video.videoHeight;

        canvas.width = width;
        canvas.height = height;

        context.drawImage(video, 0, 0, width, height);

        return canvas.toDataURL('image/png');
      }

      function cameraReset() {
        snapshot = null;
        // Volver a mostrar y reproducir el video
        video.style.display = 'block';
        video.play();
        // Limpiar snapshot de la imagen dinamica y del enlace de descarga
        photo.style.display = 'none';
        photo.setAttribute('src', '');
        downloadPhotoBtn.querySelector('a').href = '#';
        // Deshabilitar botones de eliminar, subir y descargar
        deletePhotoBtn.classList.add('u-disabled');
        uploadPhotoBtn.classList.add('u-disabled');
        downloadPhotoBtn.classList.add('u-disabled');
      }

      cameraInit();
      canvas.style.display = 'none';
      photo.style.display = 'none';
      startCameraBtn.addEventListener('click', e => {
        e.preventDefault();
        video.style.display = 'block';
        video.play();
        photo.style.display = 'none';
      });

      takePhotoBtn.addEventListener('click', e => {

        e.preventDefault();
        // Pausamos y ocultamos el video
        video.pause();
        video.style.display = 'none';
        // Mostrar la captura de la cámara en una imagen
        snapshot = takeSnapShot();
        photo.style.display = 'block';
        photo.setAttribute('src', snapshot);
        // Asignar imagen capturada a boton de descarga
        downloadPhotoBtn.querySelector('a').href = snapshot;
        // Habilitar botones de eliminar, subir y descargar
        deletePhotoBtn.classList.remove('u-disabled');
        uploadPhotoBtn.classList.remove('u-disabled');
        downloadPhotoBtn.classList.remove('u-disabled');
      });
      deletePhotoBtn.addEventListener('click', e => {
        e.preventDefault();
        cameraReset();
      });
      uploadPhotoBtn.addEventListener('click', e => {
        e.preventDefault();
        const storageRef = firebase.storage().ref().child('photos');
        const dbRef = firebase.database().ref().child('photos');
        const user = firebase.auth().currentUser;

        let photoName = `photo-${Math.floor(Math.random() * 10000000)}`;
        // https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_string
        let uploadTask = storageRef.child(photoName).putString(snapshot, 'data_url');
        // https://firebase.google.com/docs/storage/web/upload-files
        uploadTask.on('state_changed', data => {
          // c(data);
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
              // c('[firebase]: File available at: ', downloadURL);
              output.innerHTML = successMsg('Tú foto se ha subido');
              savePhotoInDb(downloadURL, user);
              hideProgress();
              setTimeout(() => output.innerHTML = '', 3000);
              cameraReset();
            });
        });
      });
    }
  }, 100);

  return `
    <article id="camera-app" class="camera content-section u-hide">
      <video muted  id="camera-stream" class="camera-video"></video>
      <img id="photo" class="camera-photo" src="">
      <nav class="camera-menu">
        <button id="start-camera" title="Iniciar cámara">
          <i class="fas fa-power-off"></i>
        </button>
        <button id="take-photo" title="Tomar foto">
          <i class="fas fa-camera"></i>
        </button>
        <button class="u-disabled" id="delete-photo" title="Borrar foto">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="u-disabled" id="upload-photo" title="Subir foto">
          <i class="fas fa-upload"></i>
        </button>
        <button class="u-disabled" id="download-photo" title="Guardar foto">
          <a href="#" download="selfie_${Math.floor(Math.random() * 10000000)}.png">
            <i class="fas fa-download"></i>
          </a>
        </button>
      </nav>
      <canvas id="canvas-snap"></canvas>
      ${progressBar()}
    </article>
  `;
}

export default camera;
