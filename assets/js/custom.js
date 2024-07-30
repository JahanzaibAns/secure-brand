new WOW().init();

$(document).ready(function () {
    $("li:first-child").addClass("first");
    $("li:last-child").addClass("last");

    $('[href="#"],[href=""]').attr("href", "javascript:;");

    var len = $('.menu > li'), str;
    $(".menu-Bar").click(function () {
        $(this).toggleClass("open");
        $(".menuWrap, .sticky").toggleClass("open");
        $("body").toggleClass("ovr-hiddn");
        for (var i = 1; i < len.length; i++) {
            str = (300 + 100 * (i - 1)) + "ms";
            len.eq(i).css('animation-delay', str).css('opacity', '1');
        }
    });

    $(".loginUp").click(function () {
        $(".LoginPopup").fadeIn();
        $(".overlay").fadeIn();
    });

    $(".signUp").click(function () {
        $(".signUpPop").fadeIn();
        $(".overlay").fadeIn();
    });

    $(".closePop,.overlay").click(function () {
        $(".popupMain").fadeOut();
        $(".overlay").fadeOut();
    });

    $(".menu .menu-item-has-children").addClass("dropdown-nav");
    $(".menu .menu-item-has-children ul.sub-menu").addClass("dropdown");

    $('.dropdown-nav').prepend('<span class="toggle_submenu"><i class="fal fa-plus"></i></span>');

    $('.toggle_submenu').click(function () {
        $('ul.dropdown').slideUp();
        $('.toggle_submenu').removeClass('active');

        if ($(this).parent().find('ul.dropdown').is(':visible')) {
            $(this).removeClass('active');
            $(this).parent().find('ul.dropdown').slideUp();
        } else {
            $(this).addClass('active');
            $(this).parent().find('ul.dropdown').slideDown();
        }
    });
    $(".sec_3_slider").slick({
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: 2,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    adaptiveHeight: true,
                }
            },
        ]
    });
});

$(".accordions .acc_title").click(function () {
    $('.accordions li').removeClass('active')
    $('.acc_desc').slideUp();
    $(this).parent('li').addClass('active')
    if (!$(this).next('.acc_desc').is(':visible')) {
        $(this).next('.acc_desc').slideDown();
    } else {
        $('.accordions li').removeClass('active')
    }
});
$("[data-targetit]").on("click", function (e) {
    $(this).addClass("active");
    $(this)
        .siblings()
        .removeClass("active");
    var target = $(this).data("targetit");
    $("." + target)
        .siblings('[class^="box-"]')
        .hide();
    $("." + target).fadeIn();
    $(".tabViewList").slick("setPosition", 0);
});