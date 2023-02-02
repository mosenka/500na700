import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number"; 
import imgRetina  from "gulp-img-retina"; 
import { transform, htmlSrcset}  from "gulp-html-transform"; 


var retinaOpts = {
	suffix: {1: '', 2: '@2x'}
};

const transformer = async $ => {
	let src = $('source').attr('srcset');
	let reg = src.match(/(.*)\.webp$/i)[1];
	let x1 = src + ' 1x,';
	let x2 = reg + '@2x.webp';
	$('source[type="image/webp"]').attr('srcset', x1 + ' '+ x2 + ' 2x')
}

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			})
			)
		)
		.pipe(fileinclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)
		// .pipe(
		// 	app.plugins.if( 
		// 		app.isBuild,
		// 		imgRetina(retinaOpts)
		// 	)
		// )
		// .pipe(app.plugins.if(
		// 		app.isBuild,
		// 		transform(transformer)
		// 	)
		// )
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
					'value' : '%DT%',
					'append' : {
						'key' : '_v',
						'cover' : 0,
						'to' : [
							'css',
							'js'
						]
					},
					'output' : {
						'file' : 'gulp/version.json'
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream())
}