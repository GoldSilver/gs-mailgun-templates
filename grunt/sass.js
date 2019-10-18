// Takes your SCSS files and compiles them to CSS
module.exports = {
  main: {
    options: {
      style: 'expanded',
    },
    files: {
      'src/css/main.css': 'src/css/scss/main.scss'
    }
  },

  // This task compiles Sass for the browser-baed preview UI.
  // You should not need to edit it.
  preview: {
    options: {
      style: 'compressed',
    },
    files: {
      'preview/css/preview.css': 'preview/scss/preview.scss'
    }
  }
};
