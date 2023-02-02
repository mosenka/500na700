import  eslint from "gulp-eslint";

export const lintJS = () => {
	return app.gulp.src(app.path.src.js)
		.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: "JS lint",
					message: "Error: <%= error.message %>"
				})
			)
		)
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.format())
		.pipe(
			app.plugins.if(
				file => file.eslint && file.eslint.fixed, app.gulp.dest('.')
			)
		)
}
