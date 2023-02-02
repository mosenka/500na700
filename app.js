import Inputmask from 'inputmask/lib/inputmask.js';
import * as flsFunctions from './vendor/functions.js';
import {throttle} from './vendor/throttle.js';
import 'lazysizes';
import Swiper, {Navigation} from 'swiper';
// import Inputmask from "inputmask";

flsFunctions.isWebp();

if (navigator.userAgent.indexOf('Firefox') >= 0) {
	let elms = document.querySelectorAll('link[rel=preload][as=style]');
	for (let i = 0; i < elms.length; i++) {
		elms[i].rel = 'stylesheet';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body');
	const questionsArr = document.querySelectorAll('.question__subtitle');
	const menuButton = document.querySelector('.menu__button');
	const menu = body.querySelector('.menu');
	const menuItem = menu.querySelectorAll('.menu__link');

	const inputPhone = document.querySelector('.input-phone');

	const newsList = body.querySelector('.news__slider');

	questionsArr.forEach((question) => {
		question.addEventListener('click', function () {
			questionsArr.forEach((elem) => elem.classList.remove('is-active'));
			this.classList.add('is-active');
		});
	});

	const im = new Inputmask('+7 (999) 999-99-99');
	im.mask(inputPhone);

	const swiper = new Swiper('.banners', {
		modules: [Navigation],
		loop: true,
		initialSlide: 1,
		slidesPerView: 1,
		centeredSlides: true,
		speed: 400,
		spaceBetween: 20,
		navigation: {
			nextEl: '.banners__nav--next',
			prevEl: '.banners__nav--prev',
		},
	});

	menuButton.addEventListener('click', function () {
		this.classList.toggle('is-open');
		body.classList.toggle('is-fixed');
		menu.classList.toggle('is-open');
	});

	menuItem.forEach((item) => {
		item.addEventListener('click', function (event) {
			const submenu = this.parentElement.querySelector('.submenu');
			if (submenu) {
				event.preventDefault();
				submenu.classList.toggle('is-open');
				submenu.querySelectorAll('.submenu__link').forEach((elem) => {
					elem.addEventListener('click', () => {
						menuButton.classList.remove('is-open');
						body.classList.remove('is-fixed');
						menu.classList.remove('is-open');
						submenu.classList.remove('is-open');
					});
				});
			}
		});
	});

	const newsSlider = new Swiper(newsList, {
		slideClass: 'article',
		slidesPerView: 1,
		centeredSlides: true,
		spaceBetween: 20,
		loop: true,
		draggable: true,
	});

	const destroySlider = (slider) => {
		slider.destroy(true, true);
		const wrapper = newsList.querySelector('.swiper-wrapper');
		if (wrapper) {
			wrapper.removeAttribute('style');
		}

		const slidersArr = wrapper
			? wrapper.querySelectorAll('.swiper-slide')
			: false;

		if (slidersArr && slidersArr.length > 0) {
			slidersArr.forEach((slide) => {
				slide.removeAttribute('style');
			});
		}
	};

	const udateSlider = (slider) => {
		slider.init();
		slider.update();
	};

	if (window.innerWidth >= 576) {
		destroySlider(newsSlider);
	} else {
		newsSlider.init();
	}

	const resize = throttle(
		window.addEventListener(
			'resize',
			() => {
				if (window.innerWidth < 576) {
					udateSlider();
				} else {
					destroySlider(newsSlider);
				}
			},
			'500',
		),
	);
});
