// const width = '33.3333%';
// const width = '25%';
const mainContainer = document.querySelector('.main-container');
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// from the tutorial TODO: refactor this
const show = 3;
const width = mainContainer.offsetWidth / show;

// $('.slide').css({ flexBasis: width, minWidth: width });
// $('.slider-container').width(slideWidth * sliderLength);


function init() {
    slides.forEach((slide, i) => {
        slide.style.flexBasis = `${width}px`;
        slide.style.minWidth = `${width}px`;
    
        slide.setAttribute('data-slide-index', i);
    
        const dot = document.createElement('span');
        dot.setAttribute('class', 'dot');
        dot.setAttribute('data-slide-dot', i);
    
        document.querySelector('.slide-navigation').appendChild(dot);
    });
    
    addActiveClass();
}

function sliderLeft() {
    let firstSlide = document.querySelector('.slide:first-child');
    firstSlide.style.marginLeft = `-${width}px`;
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

    lastSlide.style.marginLeft = `-${width}px`;

    sliderContainer.prepend(lastSlide);

    firstSlide.style.marginLeft = `${width}`;

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

let timer = setInterval(sliderLeft, 3500);

$('.slider-container').hover(function() {
    clearInterval(timer);
}, function() {
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