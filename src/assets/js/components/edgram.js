import header from './header';
import footer from './footer';
import profile from './profile';
import timeline from './timeline';
import uploader from './uploader';
import camera from './camera';

const edgram = () => (`
  ${header()}
  <section class="content">
    ${profile()}
    ${timeline()}
    ${uploader()}
    ${camera()}
  </section>
  ${footer()}
`);

export default edgram;
