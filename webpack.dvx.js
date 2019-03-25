const dvx = require('@devexteam/dvx-wrapper');
dvx
  .js('src/assets/js/app.js', 'public/assets/js')
  .sw('src/assets/js/sw.js')
  .css('src/assets/scss/app.scss', 'public/assets/css')
  .html({
    title: 'EDgram por EDteam',
    meta: {
      description: 'Aplicación Web Progresiva inspirada en Instagram con fines educativos.',
      keywords: 'Progressive Web App, PWA, EDteam, Devexteam, EDgram, Proyecto, HTML, CSS, JavaScript, Firebase'
    },
    template: 'src/views/pug/index.pug',
    excludeAssets: [
      /assets\/css\/.*.js/,
    ],
  }, 'public')
  .favicon('src/assets/img/dist/icons/favicon.png')
  .purifycss([])
  .copy([{ from: 'src/google89be19b268342fc0.html', to: 'public' }]);
