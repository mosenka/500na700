import webpack from "webpack-stream";


export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(webpack({
			mode: app.isDev ? 'development' :'production',
			// output: {
			// 	filename: 'app.min.js'
			// }
			output: {
				// filename: `app.min.js`
				filename: `app.js`
				// filename: `news.js`
			},
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream())
}