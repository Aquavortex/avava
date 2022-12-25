var galOwl = $(".gallery .gallery-inner");
var overviewOwl = $(".overview-gallery-inner");
var card = $(".card-gallery .items");
var cardMain = $(".card-main-image");
var reviewsLeft = $(".review-slider-left");
var reviewsRight = $(".review-slider-right");
var about = $(".about-items");

function movingHeadline() {
    if ($(window).width() < 992) {
        $(".card-info .card-headline").each(function (index, item) {
            var currentCard = $(item).closest(".card");
            currentCard.prepend($(item))
        })
    } else {
        $(".card .card-headline").each(function (index, item) {
            var currentCard = $(item).closest(".card");
            var cardInfo = $(this).closest(".card").find(".card-info");
            cardInfo.prepend($(item))
        })
    }
}

$(document).ready(function() {

    // $(".card-info").find(".card-headline").append($(this).closest(".card"))

    movingHeadline();

    $(window).resize(function () {
        movingHeadline();
    })

    $("a[href*='#']").click(function(e) {
        e.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1200);

        if ($(this).attr("href") === "#order" && $(window).width() <= 1366) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $($(this).attr("href")).offset().top - $(window).height() + $($(this).attr("href")).outerHeight()
            }, 1200);
        }
    });

    promotionEndDate(3);

    // ----------------------------------------------------------

    if ($(window).width() < 576) {
        initGalSlises();
        initAboutSlises();
    }

    $(window).resize(function () {
        if ($(window).width() < 576) {
            console.log(2)

            initGalSlises();
            initAboutSlises()
        } else {

            console.log(3)
            initGalSlises();
            galOwl.slick('unslick');

            initAboutSlises();
            about.slick('unslick');
        }
    });

    function initGalSlises() {
        galOwl.not('.slick-initialized').slick({
            dots: true,
            infinite: true,

            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
        });
    }

    function initAboutSlises() {
        about.not('.slick-initialized').slick({
            dots: true,
            infinite: true,

            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
        });
    }

    // ----------------------------------------------------------

    var reviewLeftHtml = $(".review", reviewsLeft);

    reviewLeftHtml.each(function (index, item) {
        var newReview = $(item).clone();

        if (!index == 0) {
            reviewsRight.append(newReview);
        } else {
            reviewFirst = item;
            console.log(reviewFirst)
        }
    });

    // console.log();

    reviewsLeft.slick({
        dots: true,
        infinite: true,

        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
    });

    reviewsRight.slick({
        dots: false,
        infinite: true,

        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
    });

    reviewsLeft.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        reviewsRight.slick('slickGoTo', nextSlide);
    });

    reviewsRight.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        reviewsLeft.slick('slickGoTo', nextSlide);
    });

    // -------------------------------------------------------


    overviewOwl.slick({
        dots: true,
        arrows: false,
        infinite: true,

        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,

    });

    $(".overview-gallery-btns .prev").click(function () {
        overviewOwl.slick('slickPrev');
    });

    $(".overview-gallery-btns .next").click(function () {
        overviewOwl.slick('slickNext');
    });

    // -------------------------------------------------------

    $(".slick-dots button").each(function (index, item) {
        $(item).text(pad($(item).text()));
    });

    // -------------------------------------------------------


    if ($(window).width() > 1199) {

        // card slick sliders

        card.slick({
            arrows: false,
            dots: false,
            slidesToShow: 3,
            centerPadding: "10px",
            draggable: false,
            infinite: true,
            swipe: false,
            touchMove: false,
            vertical: true,
        });

        cardMain.slick({
            dots: false,
            arrows: false,
            infinite: true,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        });

        card.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            console.log(currentSlide)
            console.log($(event.target).closest(".card-product").find(".card-main-image"));
            $(event.target).closest(".card-product").find(".card-main-image").slick('slickGoTo', nextSlide);
        });

        cardMain.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            console.log($(event.target).closest(".card-product").find(".card-gallery-inner"));
            $(event.target).closest(".card-product").find(".card-gallery-inner").slick('slickGoTo', nextSlide);
        });

        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        $('.card-gallery-btn.next').click(function(){
            $(this).closest(".card-gallery").find(".card-gallery-inner").slick('slickNext');
            // card.slick('slickNext');
        });

        $('.card-gallery-btn.prev').click(function(){
            $(this).closest(".card-gallery").find(".card-gallery-inner").slick('slickPrev');
        });

        // card slick sliders end
    }


    $(".card").click(function (e) {
        var color =  $(e.target).closest(".color");

        if (color.length > 0) {
            $(".color").removeClass("active");
            color.addClass("active");

            $(".card-product", this).removeClass("active");
            $(".card-product--" + color.data("color"), this).addClass("active");
        }
    });

    $(".sizes-box").click(function (e) {
        var currentSize = $(e.target).closest(".size");
        var currentSizeText = currentSize.data("size");

        if (currentSize.length > 0) {
            $(".size", this).removeClass("active");
            currentSize.addClass("active");
            $(".current-size", this).text(currentSizeText);
        }
    })


    $(".current-size").text($(".sizes-box", this).find(".size.active").data("size"));

    // ------------------------------------------------------

    $(".gallery-magn").each(function(_, item) {
        $(item).magnificPopup({
            delegate: "a",
            type: "image",
            fixedContentPos: true,
            gallery: {
                enabled: true,
                tCounter: "",
            },
            callbacks: {
                open: function() {
                    var mfpEl = document.querySelector(".mfp-container");
                    mfpEl.addEventListener("dragstart", function(e) {
                        e.preventDefault();
                    });

                    if (!mfpEl.mfpHammer) {
                        mfpEl.mfpHammer = new Hammer(mfpEl,{
                            recognizers: [[Hammer.Swipe, {
                                direction: Hammer.DIRECTION_HORIZONTAL
                            }]]
                        });
                        mfpEl.mfpHammer.on("swipeleft", function() {
                            $.magnificPopup.instance.next();
                        });
                        mfpEl.mfpHammer.on("swiperight", function() {
                            $.magnificPopup.instance.prev();
                        });
                    }
                },
            }
        });
    });
});

function pad(num) {
    return ("0" + num).substr(-2);
}

function promotionEndDate(countDays) {
    const date = new Date(Date.now() + (86400000 * countDays));

    $(".js-sale-date").html(pad(date.getDate()) + "." + pad(date.getMonth() + 1) + "." + pad(date.getFullYear()));
}