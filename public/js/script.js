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

let oneClickInterval
let ratesInterval

currenciesAnimation()

setInterval(() => changeOrder(document.querySelectorAll(".phone-notice"), true), 1300);
setInterval(() => changeOrder(document.querySelectorAll(".features-anon .tg-msg"), true), 1300);
setInterval(statisticsAnim, 1150);


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

function currenciesAnimation() {
	const interval = setInterval(() => {
		let curIndex = null;
		currenciesItems.forEach((item, i) => {
			if (item.classList.contains('active')) {
				curIndex = i
			}
		})

		if (curIndex === null) {
			currenciesItems[0].classList.add('active')

		} else {
			currenciesItems[curIndex].classList.remove('active')

			if (curIndex !== currenciesItems.length - 1) {
				currenciesItems[curIndex + 1].classList.add('active')
			} else {
				clearInterval(interval)
				ratesAnimation()
			}
		}
	}, 400);
}
function oneClickAnimation() {
	
}
function ratesAnimation() {

	let steps = 0
	const allSlides = document.querySelectorAll(".features-rates__item")

	const interval = setInterval(() => {
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
		steps++

		if (steps >= 3) {
			clearInterval(interval)
			fulfill()
		}


	}, 700);
}

function changeOrder(allSlides, reverse = false) {

	if (reverse) {
		for (const slide of allSlides) {
			const order = +slide.dataset.order;
			switch (order) {
				case 1:
					slide.setAttribute("data-order", 3);
					break;
				case 2:
					slide.setAttribute("data-order", 1);
					break;
				case 3:
					slide.setAttribute("data-order", 2);
					break;
			}
		}
	} else {
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


}
const currenciesItems = document.querySelectorAll('.features-currencies-item')
function currenciesAnim(interval) {


}

const statisticsMsg = document.querySelectorAll('.features-statistics__body .tg-msg')
const statisticsButtons = [...document.querySelectorAll('.features-statistics__body .tg-action')].slice(0, 3)
function statisticsAnim() {
	let curIndex;
	statisticsButtons.forEach((btn, i) => {
		if (btn.classList.contains('active')) {
			curIndex = i
		}
	})

	statisticsButtons[curIndex].classList.remove('active')
	statisticsMsg[curIndex].classList.remove('active')

	if (curIndex === statisticsButtons.length - 1) {
		statisticsButtons[0].classList.add('active')
		statisticsMsg[0].classList.add('active')
		return
	}
	statisticsButtons[curIndex + 1].classList.add('active')
	statisticsMsg[curIndex + 1].classList.add('active')
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