const dvx = require('@devexteam/dvx-wrapper');
dvx
  .js('src/assets/js/app.js', 'public/assets/js')
  .css('src/assets/scss/app.scss', 'public/assets/css')
  .html({
    title: 'EDgram por EDteam',
    meta: {
      description: 'Aplicación Web Progresiva inspirada en Instagram con fines educativos.',
      keywords: 'Progressive Web App, PWA, EDteam, Devexteam, EDgram, Proyecto, HTML, CSS, JavaScript, Firebase'
    },
    google_verification_token: '6La4n8BkKC2dlcN7g_lHuIZBH1tsuyg',
    ga_traking_id: 'UA-127843454-1',
    template: 'src/views/pug/index.pug'
  }, 'public')
  .copy([{ from: 'src/google89be19b268342fc0.html', to: 'public' }]);
