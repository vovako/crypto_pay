const switchThemeModeBtn = document.querySelector('.mode-switcher')
const curTheme = localStorage.getItem('theme') ?? ''
if (curTheme === 'dark') {
	switchTheme('dark')
}


switchThemeModeBtn.addEventListener('click', function () {

	const curTheme = localStorage.getItem('theme') ?? ''
	if (curTheme === 'dark') {
		switchTheme('light')
	} else {
		switchTheme('dark')
	}
})

setInterval(changeOrder, 700);


function switchTheme(theme) {

	const introPhoneImg = document.querySelector('.intro-phone img')
	if (theme === 'dark') {
		switchThemeModeBtn.querySelector('img').src = 'img/icons/dark-mode.svg';
		localStorage.setItem('theme', 'dark');
		document.body.classList.add('dark-theme');
		introPhoneImg.src = 'img/phone-d.png';
	} else {
		switchThemeModeBtn.querySelector('img').src = 'img/icons/light-mode.svg';
		localStorage.setItem('theme', 'light');
		document.body.classList.remove('dark-theme');
		introPhoneImg.src = 'img/phone.png';
	}

	document.getAnimations().forEach((anim) => {
		anim.effect.target.classList.remove('anim')
	});

	window.requestAnimationFrame(() => {
		window.requestAnimationFrame(() => {
			document.getAnimations().forEach((anim) => {
				anim.effect.target.classList.add('anim')
				anim.currentTime = 0
			});
		})
	})
}

function changeOrder() {
	const allSlides = document.querySelectorAll(".features-rates__item");

	for (const slide of allSlides) {
		const order = +slide.dataset.order;
		switch (order) {
			case 1:
				slide.setAttribute("data-order", 2);
				break;
			case 2:
				slide.setAttribute("data-order", 3);
				break;
			case 3:
				slide.setAttribute("data-order", 1);
				break;
		}
	}
}

// slider
const sliderSlides = document.querySelectorAll('.slider__slide'),
	sliderLine = document.querySelector('.slider__line'),
	sliderDots = document.querySelectorAll('.slider__dot'),
	sliderCurNumberEl = document.querySelector('.slider__cur-count');

let sliderCount = 0,
	sliderWidth;

// Автоматическое перелистывание слайдов
let timeout = setInterval(nextSlide, 2000);

window.addEventListener('resize', showSlide)

// Задает нужную ширину картинки и sliderLine
function showSlide() {
	sliderWidth = document.querySelector('.slider').offsetWidth;
	sliderLine.style.width = sliderWidth * sliderSlides.length + 'px';
	sliderSlides.forEach(item => item.style.width = sliderWidth + 'px');

	rollSlider();
}
showSlide();

function nextSlide() {
	sliderCount++;
	if (sliderCount >= sliderSlides.length) sliderCount = 0;

	animate()
	rollSlider();
	thisSlide(sliderCount);
}

function prevSlide() {
	sliderCount--;
	if (sliderCount < 0) sliderCount = sliderSlides.length - 1;

	rollSlider();
	thisSlide(sliderCount);
}

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
// анимация перехода слайдера
function animate() {
	sliderLine.classList.remove('anim')
	window.requestAnimationFrame(() => {
		window.requestAnimationFrame(() => {
			sliderLine.classList.add('anim')
		})
	})
}

sliderDots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		sliderCount = index;
		animate()
		rollSlider();
		thisSlide(sliderCount);

		clearInterval(timeout)

		timeout = setInterval(nextSlide, 2000);
	})
})