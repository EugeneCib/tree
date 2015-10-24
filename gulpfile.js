var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src(['app/storage/storage.js', 'app/storage/*.js','app/list/list.js', 'app/list/*.js', 'app/list-iterative/list-iterative.js', 'app/list-iterative/*.js','app/editor/editor.js', 'app/editor/*.js', 'app/app.js', 'app/app-iterative.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dest/'));
});

gulp.task('default', ['scripts']);


var watcher = gulp.watch('app/**/*.js', ['scripts']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});