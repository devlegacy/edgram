// import '@babel/polyfill';
import { w, n, d } from './helpers/web';
import { c, error, consoleUserWarning } from './helpers/console';
import hmr from './helpers/hrm';

import { init, ga } from "./helpers/init";
import { isAuth } from "./components/auth";
init();
const app = `
  <main class="edgram">
    ${isAuth() || ''}
  </main>
`;
if (ENV === 'production') consoleUserWarning();
c('[app]: Start');
d.getElementById('root').innerHTML = app;
ga();
hmr(module);
