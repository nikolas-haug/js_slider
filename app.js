const mainContainer = document.querySelector('.main-container');
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const show = 3;
// Currently getting the width from the main container
const width = mainContainer.offsetWidth / show;

function init() {
    setUpSlides();
    addActiveClass();
}

function setUpSlides() {
    slides.forEach((slide, i) => {
        // set slide widths dynamically or use CSS with media queries
        // slide.style.flexBasis = `${width}px`;
        // slide.style.minWidth = `${width}px`;
    
        slide.setAttribute('data-slide-index', i + 1);
        const dot = document.createElement('span');
        dot.setAttribute('class', 'dot');
        dot.setAttribute('data-slide-dot', i + 1);
        dot.addEventListener('click', moveToDot);
        document.querySelector('.slide-navigation').appendChild(dot);
    });
}

function sliderLeft() {
    let firstSlide = document.querySelector('.slide:first-child');
    // set the viewport size here according to media query
    if(window.innerWidth < 650) {
        firstSlide.style.marginLeft = `-100%`;
    } else {
        firstSlide.style.marginLeft = `-${width}px`;
    }
    setTimeout(() => {
        sliderContainer.append(firstSlide);
        firstSlide.style.marginLeft = 0;
        removeActiveClass();
        addActiveClass();
    }, 500);
}

function sliderRight() {
    let firstSlide = document.querySelector('.slide:first-child');
    let lastSlide = document.querySelector('.slide:last-child');
    // set the viewport size here according to media query
    if(window.innerWidth < 650) {
        lastSlide.style.marginLeft = `-100%`;
        sliderContainer.prepend(lastSlide);
        firstSlide.style.marginLeft = `$100%`;
    } else {
        lastSlide.style.marginLeft = `-${width}px`;
        sliderContainer.prepend(lastSlide);
        firstSlide.style.marginLeft = `${width}`;
    }
    firstSlide.style.marginLeft = 0;
    setTimeout(() => {
        lastSlide.style.marginLeft = 0;
        removeActiveClass();
        addActiveClass();
    }, 10);
}

function removeActiveClass() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => {
        dot.classList.remove('active');
    });
}

function addActiveClass() {
    let currentFirstSlide = document.querySelector('.slider-container div:first-child');
    let slideIndex = currentFirstSlide.getAttribute('data-slide-index');
    document.querySelector(`.dot[data-slide-dot="${slideIndex}"]`).classList.add('active');
}

function moveToDot() {
    let dotDataIndex = this.getAttribute('data-slide-dot');
    let currentFirstSlide = document.querySelector('.slider-container div:first-child');
    let slideIndex = currentFirstSlide.getAttribute('data-slide-index');

    let increment = dotDataIndex - slideIndex;

    if(increment < 0) {
        for(let i = 0; i < Math.abs(increment); i++) {
            let lastSlide = document.querySelector('.slide:last-child');
            sliderContainer.prepend(lastSlide);
        }
    } else {
        for(let i = 0; i < increment; i++) {
            let firstSlide = document.querySelector('.slide:first-child');
            sliderContainer.append(firstSlide);
        }
    }
    removeActiveClass();
    addActiveClass();
    animateSlide();
}

function animateSlide() {
    slides.forEach((slide) => {
        slide.classList.add('fade-in');
        setTimeout(() => {
            slide.classList.remove('fade-in');
        }, 250);
    });
}

let timer = setInterval(sliderLeft, 3500);

$('.slider-container').hover(function() {
    clearInterval(timer);
}, function() {
    timer = setInterval(sliderLeft, 3500);
});

$('.slide-navigation').on('mouseenter', '.dot', function() {
    clearInterval(timer);
});
$('.slide-navigation').on('mouseleave', '.dot', function() {
    timer = setInterval(sliderLeft, 3500);
});

$('#prev-btn').hover(function() {
    clearInterval(timer);
}, function() {
    timer = setInterval(sliderLeft, 3500);
});
$('#next-btn').hover(function() {
    clearInterval(timer);
}, function() {
    timer = setInterval(sliderLeft, 3500);
});

prevBtn.addEventListener('click', sliderRight);
nextBtn.addEventListener('click', sliderLeft);

init();