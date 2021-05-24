const width = '33.3333%';
const slides = document.querySelectorAll('slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// from the tutorial TODO: refactor this
// const show = 3;
// const slideWidth = $('.slider-container').width() / show;
// const sliderLength = $('.slide').length;

// $('.slide').width(slideWidth);
// $('.slider-container').width(slideWidth * sliderLength);

function sliderLeft() {
    let firstSlide = document.querySelector('.slide:first-child');
    firstSlide.style.marginLeft = `-${width}`;
    setTimeout(() => {
        document.querySelector('.slider-container').append(firstSlide);
        firstSlide.style.marginLeft = 0;
    }, 500);
}

function sliderRight() {
    let firstSlide = document.querySelector('.slide:first-child');
    let lastSlide = document.querySelector('.slide:last-child');

    lastSlide.style.marginLeft = `-${width}`;

    document.querySelector('.slider-container').prepend(lastSlide);

    firstSlide.style.marginLeft = `${width}`;

    firstSlide.style.marginLeft = 0;
    setTimeout(() => {
        lastSlide.style.marginLeft = 0;
    }, 10);

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

prevBtn.addEventListener('click', sliderLeft);
nextBtn.addEventListener('click', sliderRight);