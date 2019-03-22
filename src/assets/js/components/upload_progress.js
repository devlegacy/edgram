import { d } from '../helpers/web';
import { c, error } from '../helpers/console';

import firebase from 'firebase/app';
import 'firebase/storage';

export const progressBar = () => (`
  <div class="progress u-hide">
    <progress value="0" max="100" class="progress-bar"></progress>
    <span class="progress-advance"></span>
  </div>
  <div class="progress-output"></div>
`);

export const progressStatus = (data) => {
  // https://firebase.google.com/docs/storage/web/upload-files#monitor_upload_progress
  const progress = d.querySelectorAll('.progress');
  const progressBar = d.querySelectorAll('.progress-bar');
  const progressAdvance = d.querySelectorAll('.progress-advance');
  const progressOutput = d.querySelectorAll('.progress-output');

  progress.forEach(progress => {
    const advance = Math.floor((data.bytesTransferred / data.totalBytes) * 100);
    c(`Upload is ${advance} % done`);
    progress.querySelector('.progress-bar').value = advance;
    progress.querySelector('.progress-advance').innerHTML = `Avance ${advance} %`;

    switch (data.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        c('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        c('Upload is running');
        break;
    }
  });
};

export const showProgress = () => d.querySelectorAll('.progress').forEach(bar => bar.classList.remove('u-hide'));

export const hideProgress = () => d.querySelectorAll('.progress').forEach(bar => bar.classList.add('u-hide'));

export const clearProgress = () => {
  d.querySelectorAll('.progress-output').forEach(output => output.innerHTML = '');
  d.querySelectorAll('.progress-bar').forEach(bar => bar.value = 0);
  d.querySelectorAll('.progress-advance').forEach(advance => advance.innerHTML = '');
};
