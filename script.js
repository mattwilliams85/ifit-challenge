let leftOrigin = true,
    lastX = 0

function parallax() {
  let depth, i, layer, layers, len, movement, translate3d, topDistance;
  topDistance = this.pageYOffset;
  layers = $('*[data-type="parallax"]');
  for (i = 0, len = layers.length; i < len; i++) {
    layer = layers[i];
    depth = layer.getAttribute('data-depth');
    movement = -(topDistance * depth);
    translate3d = 'translate3d(0,  ' + movement + 'px, 0)';
    layer.style['-webkit-transform'] = translate3d;
    layer.style['-moz-transform'] = translate3d;
    layer.style['-ms-transform'] = translate3d;
    layer.style['-o-transform'] = translate3d;
    layer.style.transform = translate3d;
  }
}

function slideInCards() {
  let topDistance = this.pageYOffset,
      windowHeight = $(window).height()
      bottomDistance = topDistance + windowHeight,
      cardArray = []

  $('.card:not(.active)').each((i, card) => {
    let offset = $(card).offset().top + 200
    if (bottomDistance > offset) cardArray.push((card))
  })

  if (cardArray.length) leftOrigin = !leftOrigin

  $(cardArray).each((i, card) => {
    if (leftOrigin) $(card).addClass('slideRight')
    $(card).addClass('active')
  })
}

$(window).on('scroll', () => {
  $('.card').addClass('disabled')
  parallax()
  slideInCards()
});

// Prevent hover on scroll
$('body').on('mousemove', (event) => {
  if (event.screenX !== lastX) {
    $('.card').removeClass('disabled')
  }
  lastX = event.screenX
})

// Activate cards in view
$(window).ready(() => {
  slideInCards()
})

// Slider
$('#slider').unslider({
  arrows: false,
  autoplay: true,
  delay: 5000,
  speed: 1000
})

// Search Bar
$('#search img').click(function(){
    $(this).parent().toggleClass("active");
    $(this).siblings('input').focus().val('')
});
