// Slick slider Управление слайдерами
$('.slider-too-men').slick({
    infinite: true,

});
$('.slider-three-men').slick({
    infinite: true,

});
$('.slider-five-men').slick({
    infinite: true,

});

$('.slider-beach').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-beach',
    arrows: false,
    dots: false,
    centerMode: true,
    focusOnSelect: true
});


//Переход по нажатию на пункт меню.
$(".nav-menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top-20}, 1500);
});


//Переход по нажатию на пункт меню.
$(".room-description").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top-20}, 1500);
});

//Кнопка вернуться на самый верх страницы
window.onscroll = function() {
    var scrollElem = document.getElementById("scrollToTop");
    if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
        scrollElem.style.opacity = "1";
    } else {
        scrollElem.style.opacity = "0";
    }
}
var timeOut;
function goUp() {
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    if(top > 0) {
        window.scrollBy(0,-100);
        timeOut = setTimeout('goUp()',20);
    } else clearTimeout(timeOut);
}

$(document).ready(function() {
    $("#phone").mask("+7 (999) 999-99-99");
});