import firebase from 'firebase/app';
import 'firebase/auth';
import edgram from './edgram';
import { pwa, isOnline } from "../helpers/init";
import { d } from '../helpers/web';
import { c, error } from '../helpers/console';

const githubSignIn = () => {
  // https://firebase.google.com/docs/auth/web/github-auth?authuser=0
  const provider = new firebase.auth.GithubAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(data => {
      c(`[github signIn]: ${data.user.email}, ha iniciado sesión con github`, data);
    })
    .catch(err => error(`[Error]: ${err.code} - ${err.message}`))
};

const githubSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => c('[signout] - Te has desconectado de github'))
    .catch(err => error('[signout] - ', err));
};

const signIn = () => {
  d.addEventListener('click', e => {
    // https://developer.mozilla.org/es/docs/Web/API/Element/matches
    if ((e.target.parentElement.matches('button') && e.target.parentElement.matches('.sign-button')) || e.target.matches('.sign-button')) {
      c('[click]: .sign-button');
      githubSignIn();
    }
  });

  return `
    <div class="sign">
      <h1 class="sign-title">EDgram</h1>
      <button class="sign-button">
      <i class="fas fa-sign-in-alt"></i>
        entrar con
        <i class="fab fa-github"></i>
      </button>
    </div>
  `;
};

export const signOut = () => {
  d.addEventListener('click', e => {
    // https://developer.mozilla.org/es/docs/Web/API/Element/matches
    if (e.target.parentElement.matches('button') && e.target.parentElement.matches('.logout')) {
      githubSignOut();
    }
  });

  return `
    <button class="logout" title="Salir">
      <i class="fas fa-sign-out-alt"></i>
    </button>
  `;
};

export const isAuth = () => {
  // https://firebase.google.com/docs/auth/web/start?authuser=0#set_an_authentication_state_observer_and_get_user_data
  firebase.auth().onAuthStateChanged(user => {
    c('[user]: ', user);
    const EDgram = d.querySelector('.edgram');
    if (user) {
      // c('[user]: ', user.displayName, ' autenticated');
      EDgram.innerHTML = edgram();
      EDgram.classList.add('u-jc-flex-start');
      pwa();
    } else {
      // c('[user]: ', user, ' not autenticated');
      EDgram.innerHTML = signIn();
      EDgram.classList.remove('u-jc-flex-start');
    }
    isOnline();
  });
};
