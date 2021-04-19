/******** MOBILE MENU ********/
$('[role="menu-opener"]').click(function(){
  const dt = $($(this).data("target"));

  if($(this).hasClass('open')) {
    $(this).removeClass('open');
    $(dt).removeClass('open');
    $('body').removeClass('open-menu');
    window.history.go(-1);
  } else {
    $(this).addClass('open');
    $(dt).addClass('open');
    $('body').addClass('open-menu');
    window.history.replaceState({open_menu: 1, target: $(this).data("target")}, '', '');
    window.history.pushState({}, '', '');

    //Zamykanie po kliknieciu
    $(dt).find('.menu-scroll').click(function(){
      $(dt).removeClass('open');
      $('[role="menu-opener"]').removeClass('open');
      $('body').removeClass('open-menu');
    });
  }
});

window.onpopstate = function(event) {
  if (event.state && typeof event.state.open_menu !== 'undefined') {
    $('[role="menu-opener"]').removeClass('open');
    $(event.state.target).removeClass('open');
    $('body').removeClass('open-menu');
  }
};

$('#topMenu').onePageNav({
  currentClass: 'current',
  scrollThreshold: 0,
  scrollSpeed : 1000,
  changeHash: true,
});

/******** SUBMENU MOBILE ********/
$(document).on('click', '[role="submenu-opener"]', function(e){
  const dt = $($(this).data("target"));
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(dt).removeClass('open');
  } else {
    $(this).addClass('active');
    $(dt).addClass('open');
    $(window).scrollTo(dt, 400, {offset:-40});
  }
});

$(window).scroll(function(){
  const header = $('header.header'),
    scroll = $(window).scrollTop();

  if (scroll >= 300) header.addClass('fixed-header');
  else header.removeClass('fixed-header');
});

if ($(window).scrollTop() > 300) {
  $('header.header').addClass('fixed-header');
} else {
  $('header.header').removeClass('fixed-header');
}

$(document).ready(function(){

  $('.carousel-box').slick({
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    centerPadding: "0px",
    slidesToShow: 3,
    focusOnSelect: true
  });

  /******** WINDOW SCROLL ********/
  const checkWindowScroll = function() {
    if ($(window).scrollTop() > 500) {
      $('#icoGoTop').show();
    }else {
      $('#icoGoTop').hide();
    }
  };
  checkWindowScroll();

  $(window).bind('scroll', function() {
    checkWindowScroll();
  });

});

/* VALIDATE MESSAGES */
$.extend(
  $.validator.messages, {
    required: "This field is required.",
  },
  $.validator.setDefaults({
    focusInvalid: false,
    invalidHandler: function(form, validator) {

      if (!validator.numberOfInvalids())
        return;

      $('html, body').animate({
        scrollTop: $(validator.errorList[0].element).offset().top -100
      }, 300);

    }
  })
);