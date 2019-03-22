import { d, w } from '../helpers/web';
import { c } from '../helpers/console';
import firebase from 'firebase/app';
import { signOut } from "./auth";
import { clearProgress } from './upload_progress';
const footer = () => {
  // Ejecutar en intervalos hasta que el documento este completo*
  // Para poder usar los script que involucren html dinamico
  const footerScripts = setInterval(() => {
    if (d.readyState === 'complete') {
      clearInterval(footerScripts);

      const nav = d.querySelector('.footer-menu');
      const sections = d.querySelectorAll('.content-section');
      // c(sections);
      nav.addEventListener('click', e => {
        e.preventDefault();
        w.scrollTo(0, 0);
        if (e.target.parentElement.matches('button')) {
          const btn = e.target.parentElement;
          const btnSection = btn.className.split('-')[0];
          c(`[click]: ${btn}`, btnSection)

          sections.forEach(section => {
            if (section.classList.contains(btnSection)) {
              section.classList.add('u-show', 'u-fadein');
              section.classList.remove('u-hide');
            } else {
              section.classList.add('u-hide');
              section.classList.remove('u-show', 'u-fadein');
            }
          });
          clearProgress();
        }
      });
    }
  }, 100);

  return `
    <footer class="footer u-fixed">
      <nav class="footer-menu">
        <button class="profile-button" title="Perfil">
          <i class="fas fa-user-circle"></i>
        </button>
        <button class="uploader-button" title="Subir foto">
          <i class="far fa-images"></i>
        </button>
        <button class="timeline-button" title="Home">
          <i class="fas fa-home"></i>
        </button>
        <button class="camera-button" title="Cámara">
          <i class="fas fa-camera"></i>
        </button>
        ${signOut()}
      </nav>
    </footer>
  `;
}

export default footer;
