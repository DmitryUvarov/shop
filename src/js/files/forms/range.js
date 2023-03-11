// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	const priceSliders = document.querySelectorAll('[gata-range]');
	if (priceSliders) {
		priceSliders.forEach(priceSlider => {
			let textValuesInputs = priceSlider.closest('.range').querySelectorAll('input[gata-value]')
			let textValuesSpans = priceSlider.closest('.range').querySelectorAll('span[gata-value]')

			const minValue = priceSlider.closest('.range').querySelector('[data-min]').dataset.min
			const maxValue = priceSlider.closest('.range').querySelector('[data-max]').dataset.max
			const startValue = priceSlider.closest('.range').querySelector('[data-start]').dataset.start
			const endValue = priceSlider.closest('.range').querySelector('[data-end]').dataset.end


			noUiSlider.create(priceSlider, {
				start: [Number(startValue), Number(endValue)],
				connect: true,
				range: {
					'min': [Number(minValue)],
					'max': [Number(maxValue)]
				},

			});

			priceSlider.noUiSlider.on('update', function (values, handle) {
				textValuesInputs[handle].value = Math.floor(values[handle])
				textValuesSpans[handle].innerHTML = Math.floor(values[handle])
			})

			/*
			const priceStart = document.getElementById('price-start');
			const priceEnd = document.getElementById('price-end');
			priceStart.addEventListener('change', setPriceValues);
			priceEnd.addEventListener('change', setPriceValues);
			*/
			function setPriceValues() {
				let priceStartValue;
				let priceEndValue;
				if (priceStart.value != '') {
					priceStartValue = priceStart.value;
				}
				if (priceEnd.value != '') {
					priceEndValue = priceEnd.value;
				}
				priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
			}
		})

	}
}
rangeInit();
