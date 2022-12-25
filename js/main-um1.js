var landing = {
  init: function () {
    this.formSubmit();
    //this.getPrice();
  },
  formSubmit: function () {
    $(".order-form").submit(function (event) {
      var $size = $(this)
        .closest(".card-info")
        .find(".sizes .size.active")
        .text();

      if ($size.length > 0 && $size !== undefined) {
        $(this)
          .find("input[name=comment]")
          .val("Размер: " + $size);
      }

      var $prodId = $(this)
        .closest(".card-info")
        .find(".colors .color.active")
        .data("id");

      if ($prodId !== undefined) {
        $(this).find("input[name=product_id]").val($prodId);
      }

      console.log($(this).find("input[name=comment]").val());
    });
  },
  // getPrice: function() {
  // 	$('.prices').each(function () {
  // 		var priceEl = $(".new-price", this);
  // 		var oldPrice = $(".old-price", this);

  // 		var p = parseInt(priceEl.text());

  // 		console.log(p)

  // 		var currency = $("body").data("currency");
  // 		p = p * 100 / (100 - $("body").data("discount"));
  // 		p2 = Math.ceil(p);

  // 		oldPrice.text(p2 + ' ' + currency);
  // 	});

  // },
};

$(document).ready(function () {
  landing.init();
});
