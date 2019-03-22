// Initialize Firebase
import firebase from 'firebase/app';
import { w, n, d } from '../helpers/web';
import { c } from "../helpers/console";
const config = {
  apiKey: "AIzaSyDoDsasOqgBfspxBhQjIODcDvBky30SiTg",
  authDomain: "edgram-1b61e.firebaseapp.com",
  databaseURL: "https://edgram-1b61e.firebaseio.com",
  projectId: "edgram-1b61e",
  storageBucket: "edgram-1b61e.appspot.com",
  messagingSenderId: "1049750649734"
};

export const init = () => firebase.initializeApp(config);

export const pwa = () => {

  // Registrar SW
  if ('serviceWorker' in n) {
    // w.addEventListener('load', () => {
    n
      .serviceWorker
      .register(`${PUBLIC_PATH.root}sw-dvx.js`)
      .then(registration => {
        c(`[sw]: Registered successfully`, registration);
      })
      .catch(e => error(`[sw]: Register failed ${e}`));
    // });
  }

  // Activar notificaciones
  if (w.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(status => {
      c(`Notification: ${status}`);
      try {
        let n = new Notification('Title', {
          body: 'Notification',
          badge: `${PUBLIC_PATH.root}android-chrome-192x192.png`,
          icon: `${PUBLIC_PATH.root}android-chrome-192x192.png`
        });
      } catch (e) {
        c(`No es posible crear la notificación`);
      }
    });
  }

  // Background sync
  if ('serviceWorker' in n && 'SyncManager' in w) {
    function registerBGSync() {
      n
        .serviceWorker
        .ready
        .then(registration => {
          return registration
            .sync
            .register('github')
            .then(() => c('[sw]: Background sync registered'))
            .catch(err => error('[sw]: Background sync error', err));
        })
        .catch(err => error('[sw]: Background sync error', err));
    }

    registerBGSync();
  }
};


export const isOnline = () => {

  // Estado de la conexión
  const header = d.querySelector('.header');
  const footer = d.querySelector('.footer');

  const metaThemeColor = d.querySelector('meta[name=theme-color]');
  const connection = d.querySelector('.connection');
  const connectionMessage = d.querySelector('.connection__message');
  const status = d.querySelector('.connection__status.far');
  // .
  let networkStatusTimer;
  function networkStatus(e) {

    if (e) {
      c(e, e.type);
    }
    if (n.onLine) {
      metaThemeColor.setAttribute('content', '#2279d7');
      header.classList.remove('u-offline');
      footer.classList.remove('u-offline');

      connection.classList.remove('hide', 'offline');
      connection.classList.add('online');

      status.classList.remove('fa-times-circle');
      status.classList.add('fa-check-circle');
      connectionMessage.innerHTML = 'Conexión recuperada';

      alert('Conexión recuperada :)');

      networkStatusTimer = setTimeout(() => {
        footer.classList.remove('is-offline');
        connection.classList.add('hide');
        connection.classList.remove('online');
      }, 1950);
    } else {
      // c(networkStatusTimer);
      clearTimeout(networkStatusTimer);

      metaThemeColor.setAttribute('content', '#666');
      header.classList.add('u-offline');
      footer.classList.add('u-offline', 'is-offline');

      connection.classList.remove('hide', 'online');
      connection.classList.add('offline');

      status.classList.add('fa-times-circle');
      status.classList.remove('fa-check-circle');
      connectionMessage.innerHTML = 'Conexión perdida';
      alert('Conexión perdida :(');
    }
  }

  // d.addEventListener('DOMContentLoaded', e => {
  if (!n.onLine) {
    networkStatus();
  }
  w.addEventListener('online', networkStatus);
  w.addEventListener('offline', networkStatus);
  // });

};

export const ga = () => {
  // <!-- Global site tag (gtag.js) - Google Analytics -->
  // <script async src="https://www.googletagmanager.com/gtag/js?id=UA-127843454-1"></script>
  // <script>
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag(){dataLayer.push(arguments);}
  //   gtag('js', new Date());

  //   gtag('config', 'UA-127843454-1');
  // </script>

  // const _gaq = _gaq || [];
  // _gaq.push(['_setAccount', 'UA-127843454-1']);
  // //https://devlegacy.github.io/edgram/
  // _gaq.push(['_setDomainName', 'devlegacy.github.io/edgram']);
  // _gaq.push(['_trackPageview']);

  // (function () {
  //   let ga = d.createElement('script');
  //   ga.type = "text/javascript";
  //   ga.async = true;
  //   ga.src = `${'https:' === d.location.protocol ? 'https://www.googletagmanager.com/gtag/js?id=UA-127843454-1' : ''}`;

  //   const s = d.getElementsByTagName('script')[0];
  //   s.parentNode.insertBefore(ga, s);
  // })();
  // (function (i, s, o, g, r, a, m) {
  //   i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
  //     (i[r].q = i[r].q || [])
  //       .push(arguments)
  //   }, i[r].l = new Date(); a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  //   a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  // })(w, d, 'script',
  //   'https://www.google-analytics.com/analytics.js', 'ga');

  // ga('create', 'UA-127843454-1', 'auto');
  // ga('send', 'pageview');
  // (function () {
  //   let ga = d.createElement('script');
  //   ga.type = "text/javascript";
  //   ga.async = true;
  //   ga.src = `${'https:' === d.location.protocol ? 'https://www.googletagmanager.com/gtag/js?id=UA-127843454-1' : ''}`;
  //   const s = d.getElementsByTagName('script')[0];
  //   s.parentNode.insertBefore(ga, s);
  // })();
  // w.dataLayer = w.dataLayer || [];
  // function gtag() { dataLayer.push(arguments); }
  // gtag('js', new Date());

  // gtag('config', 'UA-127843454-1');
};
