const switchThemeModeBtn = document.querySelector('.mode-switcher')
const curTheme = localStorage.getItem('theme') ?? ''
if (curTheme === 'dark') {
	switchTheme('dark')
}

let interval = null

switchThemeModeBtn.addEventListener('click', function () {

	const curTheme = localStorage.getItem('theme') ?? ''
	if (curTheme === 'dark') {
		switchTheme('light')
	} else {
		switchTheme('dark')
	}
})

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

}

// slider
const sliderSlides = document.querySelectorAll('.slider__slide'),
	sliderLine = document.querySelector('.slider__line'),
	sliderDots = document.querySelectorAll('.slider__dot'),
	sliderCurNumberEl = document.querySelector('.slider__cur-count');

let sliderCount = 0,
	sliderWidth;

// Автоматическое перелистывание слайдов
let timeout = setInterval(nextSlide, 4000);

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

		timeout = setInterval(nextSlide, 4000);
	})
})

// настройки
let options = {
	threshold: 0.9
}

// функция обратного вызова
let callback = function (entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			resetAnimation()
		}
	})
}

// наблюдатель
const observer = new IntersectionObserver(callback, options)
observer.observe(document.querySelector(".features-currencies"))

function resetAnimation() {
	clearInterval(interval)
	currenciesAnimation()
}

function currenciesAnimation() {
	const currenciesItems = document.querySelectorAll('.features-currencies-item')
	const activeEl = [...currenciesItems].filter(item => item.classList.contains('active'))[0] ?? null
	if (activeEl) activeEl.classList.remove('active')

	interval = setInterval(() => {
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
				oneClickAnimation()
			}
		}
	}, 400);
}
function oneClickAnimation() {
	const btn = document.querySelector('.features-oneclick__btn')
	const cursor = document.querySelector('.features-oneclick__cursor')
	btn.classList.remove('anim')
	cursor.classList.remove('anim')

	window.requestAnimationFrame(() => {
		window.requestAnimationFrame(() => {
			btn.classList.add('anim')
			const btnAnim = btn.getAnimations()[0]
			btnAnim.currentTime = 0
			btnAnim.play()

			cursor.classList.add('anim')
			const cursorAnim = cursor.getAnimations()[0]
			cursorAnim.currentTime = 0
			cursorAnim.play()
		})
	})

	interval = setTimeout(() => {
		ratesAnimation()
	}, 2000)

}
function ratesAnimation() {

	let steps = 0
	const allSlides = document.querySelectorAll(".features-rates__item")

	interval = setInterval(() => {
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
			statisticsAnimation()
		}

	}, 700);
}
function statisticsAnimation() {
	const statisticsMsg = document.querySelectorAll('.features-statistics__body .tg-msg')
	const statisticsButtons = [...document.querySelectorAll('.features-statistics__body .tg-action')].slice(0, 3)

	interval = setInterval(function () {
		let curIndex = null;
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
			clearInterval(interval)
			sendAnimation()
			return
		}
		statisticsButtons[curIndex + 1].classList.add('active')
		statisticsMsg[curIndex + 1].classList.add('active')

	}, 1150)

}
function sendAnimation() {
	const notices = document.querySelectorAll(".phone-notice")
	let steps = 0;
	interval = setInterval(() => {

		for (const slide of notices) {
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

		steps++
		if (steps >= 3) {
			clearInterval(interval)
			anonAnimation()
		}

	}, 1300);
}
function anonAnimation() {
	const notices = document.querySelectorAll(".features-anon .tg-msg")
	let steps = 0;
	interval = setInterval(() => {

		for (const slide of notices) {
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

		steps++
		if (steps >= 3) {
			clearInterval(interval)
		}

	}, 1300);
}