//имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());




const buildFolder = "./dist";
const srcFolder = "./src"; 

export const path = {
    build: {
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
	},
    src: {
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/sass/*.sass`,
		// js: `${srcFolder}/js/news.js`,
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
		files: `${srcFolder}/files/**/*.*`,
	},
    watch: {
		html: `${srcFolder}/**/*.html`,
		// scss: `${srcFolder}/scss/**/*.scss`,
		scss: `${srcFolder}/sass/**/*.sass`,
		js: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
		files: `${srcFolder}/files/**/*.*`,
	},
    clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ''
}