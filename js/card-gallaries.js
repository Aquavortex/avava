var card = $(".card-gallery-inner");
var cardMain = $(".card-main-image");

function addProdGal (select, index, select2) {
    $(select).slick({
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

    $(select2).slick({
        dots: false,
        arrows: false,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // $('.card-gallery-btn.next').click(function(){
    //     card.slick('slickNext');
    // });
    //
    // $('.card-gallery-btn.prev').click(function(){
    //     card.slick('slickPrev');
    // });
}

$(document).ready(function() {
    card.each(function(index, item) {
        console.log($(item))

        $(item).addClass('card-gallery-inner--' + (index + 1));
        $(".card-main-image").addClass('card-main-image--' + (index + 1));

        addProdGal(".card-gallery-inner--" + (index + 1), index, ".card-main-image--" + (index + 1));
        // $(item).addClass("owl-carousel")

        // --------------------------------------

        // $('.card-gallery-inner--' + (index + 1)).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        //
        //     console.log(44444)
        //     $(select2).slick('slickGoTo', nextSlide);
        //
        // });
        //
        // $(select2).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        //     $(select).slick('slickGoTo', nextSlide);
        // });
    })
});
