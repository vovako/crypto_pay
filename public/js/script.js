
// Исходные данные по слайдеру (const)
const sliderSlides = document.querySelectorAll('.slider__slide'),
	sliderLine = document.querySelector('.slider__line'),
	sliderDots = document.querySelectorAll('.slider__dot'),
	sliderCurNumberEl = document.querySelector('.slider__cur-count');

// Переменные    
let sliderCount = 0,
	sliderWidth;

// Адаптивность слайдера
window.addEventListener('resize', showSlide);

// Автоматическое перелистывание слайдов
// let timeout = setInterval(() => {
// 	nextSlide()
// }, 2000);


// Функции ==================
// Задает нужную ширину картинки и sliderLine
function showSlide() {
	sliderWidth = document.querySelector('.slider').offsetWidth;
	sliderLine.style.width = sliderWidth * sliderSlides.length + 'px';
	sliderSlides.forEach(item => item.style.width = sliderWidth + 'px');

	rollSlider();
}
showSlide();

// Перелистывает слайд вперед
function nextSlide() {
	sliderCount++;
	if (sliderCount >= sliderSlides.length) sliderCount = 0;

	animate()
	rollSlider();
	thisSlide(sliderCount);
}

// Перелистывает слайд назад
// function prevSlide() {
// 	sliderCount--;
// 	if (sliderCount < 0) sliderCount = sliderSlides.length - 1;

// 	rollSlider();
// 	thisSlide(sliderCount);
// }

// Задает шаг перемещения слайдов
function rollSlider() {
	sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

// Указывает как слайд по счету активен
function thisSlide(index) {
	sliderDots.forEach(item => item.classList.remove('active-dot'));
	sliderDots[index].classList.add('active-dot');
	sliderCurNumberEl.textContent = `0${index + 1}`
}

function animate() {
	sliderLine.classList.remove('anim')
	setTimeout(() => {
		sliderLine.classList.add('anim')
	})
}

// Вешает клик на dot
sliderDots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		sliderCount = index;
		animate()
		rollSlider();
		thisSlide(sliderCount);

		clearInterval(timeout)

		timeout = setInterval(() => {
			nextSlide()
		}, 2000);
	})
})