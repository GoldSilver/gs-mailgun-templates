// Clean your /dist folder
module.exports = {
  clean: ['!<%= paths.dist %>/.gitkeep', '!<%= paths.example %>/.gitkeep', '<%= paths.dist %>/**/*', '<%= paths.example %>/**/*']
};
