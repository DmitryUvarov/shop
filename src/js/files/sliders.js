/*
Документация по работе в шаблоне:
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, {Pagination, Autoplay, Thumbs } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.discounts__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.discounts__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Autoplay, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 30,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,


			// Эффекты
			// effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},


			// Пагинация

			pagination: {
				el: '.discounts__slider .pagination',
				clickable: true,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {
				init() {
					this.el.addEventListener('mouseenter', () => {
						this.autoplay.stop();
					});

					this.el.addEventListener('mouseleave', () => {
						this.autoplay.start();
					});
				}
			}
		});
	}
	if (document.querySelector('.main-product__trumb-slider')) { // Указываем скласс нужного слайдера

		for (const mobileSlider of document.querySelectorAll('.main-product__trumb-slider')) {
			if (mobileSlider) {
			  (function () {
				"use strict";

				const breakpoint = window.matchMedia("(min-width:768.98px)");
				let trumbSliderProduct;
				let mainSliderTrumb;

				const createMainSliderTrumb = (sliderTrumb) => {
					const mainSliderTrumb = new Swiper('.main-product__slider', {
						modules: [Thumbs],
						observer: true,
						observeParents: true,
						slidesPerView: 1,
						spaceBetween: 15,
						speed: 800,
						/*
						breakpoints: {
							320: {
								slidesPerView: 1,
								spaceBetween: 0,
								autoHeight: true,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
						},
						*/
						thumbs: {
							swiper: sliderTrumb,
						},
					});
				}

				const enableSwiperMobile = function () {
					trumbSliderProduct = new Swiper('.main-product__trumb-slider', { // Указываем скласс нужного слайдера
						direction: 'horizontal',
						grabCursor: true,
						observer: true,
						observeParents: true,
						slidesPerView: "auto",
						spaceBetween: 12,
						speed: 800,
					});
					createMainSliderTrumb(trumbSliderProduct)
				};
				const enableSwiperPC = function () {
					trumbSliderProduct = new Swiper('.main-product__trumb-slider', { // Указываем скласс нужного слайдера
						direction: 'vertical',
						grabCursor: true,
						observer: true,
						observeParents: true,
						slidesPerView: 4,
						spaceBetween: 12,
						speed: 800,
					});

					createMainSliderTrumb(trumbSliderProduct)
				};

				const breakpointChecker = function () {
					if (breakpoint.matches === true) {
						if (trumbSliderProduct !== undefined) trumbSliderProduct.destroy(true, true);
						if (mainSliderTrumb !== undefined) mainSliderTrumb.destroy(true, true);
						enableSwiperPC()
						return;
					} else if (breakpoint.matches === false) {
						if (trumbSliderProduct !== undefined) trumbSliderProduct.destroy(true, true);
						if (mainSliderTrumb !== undefined) mainSliderTrumb.destroy(true, true);
						return enableSwiperMobile();
					}
				};

				breakpoint.addListener(breakpointChecker);
				breakpointChecker();

			  })();
			}

		  }
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});