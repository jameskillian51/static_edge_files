// ==================================================
// * Project Name   :  Ventro - Ecommerce Template
// * File           :  JS Base
// * Version        :  1.0.0
// * Last change    :  06 June 2021
// * Author         :  JThemes (https://themeforest.net/user/jthemes)
// * Developer      :  jThemes
// ==================================================

(function($) {
  "use strict";

  // back to top - start
  // --------------------------------------------------
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.backtotop:hidden').stop(true, true).fadeIn();
    } else {
      $('.backtotop').stop(true, true).fadeOut();
    }
  });
  $(function() {
    $(".scroll").on('click', function() {
      $("html,body").animate({scrollTop: 0}, "slow");
      return false
    });
  });
  // back to top - end
  // --------------------------------------------------

  // preloader - start
  // --------------------------------------------------
  // $(window).on('load', function(){
  //   $('#preloader').fadeOut('slow',function(){$(this).remove();});
  // });
  // preloader - end
  // --------------------------------------------------

  // sticky header - start
  // --------------------------------------------------
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 120) {
      $('.header_section').addClass("sticky")
    } else {
      $('.header_section').removeClass("sticky")
    }
  });
  // sticky header - end
  // --------------------------------------------------

  // tooltip - start
  // --------------------------------------------------
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
  // tooltip - end
  // --------------------------------------------------

  // Offcanvas Sidebar - start
  // --------------------------------------------------
  $(document).ready(function () {
    $('.close_btn, .cart_overlay').on('click', function () {
      $('.cart_sidebar').removeClass('active');
      $('.cart_overlay').removeClass('active');
    });

    $('.cart_btn').on('click', function () {
      $('.cart_sidebar').addClass('active');
      $('.cart_overlay').addClass('active');
    });
  });

  $(document).ready(function () {
    $('.close_btn, .filter_overlay').on('click', function () {
      $('.filter_sidebar').removeClass('active');
      $('.filter_overlay').removeClass('active');
    });

    $('.filter_btn, .filter_btn2').on('click', function () {
      $('.filter_sidebar').addClass('active');
      $('.filter_overlay').addClass('active');
    });
  });

  $(document).ready(function () {
    $('.close_btn, .offcanvas_overlay').on('click', function () {
      $('.offcanvas_menu').removeClass('active');
      $('.offcanvas_overlay').removeClass('active');
    });

    $('.offcanvas_btn').on('click', function () {
      $('.offcanvas_menu').addClass('active');
      $('.offcanvas_overlay').addClass('active');
    });
  });
  // Offcanvas Sidebar - end
  // --------------------------------------------------

  // main search btn - start
  // --------------------------------------------------
  $('.main_search_btn').on('click', function() {
    $(this).toggleClass('active');
  });
  // main search btn - end
  // --------------------------------------------------

  // bg parallax - start
  // --------------------------------------------------
  $('[data-parallax]').parallax({
    speed: .6,
  });
  // bg parallax - end
  // --------------------------------------------------

  // select option - start
  // --------------------------------------------------
  $('select').niceSelect();
  // select option - end
  // --------------------------------------------------

  // popup images & videos - start
  // --------------------------------------------------
  $('.popup_video').magnificPopup({
    type: 'iframe',
    preloader: false,
    removalDelay: 160,
    mainClass: 'mfp-fade',
    fixedContentPos: false
  });

  $('.zoom-gallery').magnificPopup({
    delegate: '.popup_image',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      opener: function(element) {
        return element.find('img');
      }
    }
    
  });
  // popup images & videos - end
  // --------------------------------------------------

  // masoney grid layout - start
  // --------------------------------------------------
  var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    }); 
  });
  // masoney grid layout - end
  // --------------------------------------------------

  // isotope filter - start
  // --------------------------------------------------
  var $grid = $(".element_grid").isotope({
    itemSelector: ".element-item",
    layoutMode: "fitRows"
  });

  var filterFns = {

    numberGreaterThan50: function () {
      var number = $(this).find(".number").text();
      return parseInt(number, 10) > 50;
    },

    ium: function () {
      var name = $(this).find(".name").text();
      return name.match(/ium$/);
    }
  };

  $(".filters-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");

    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  });

  $(".filters-button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
      $buttonGroup.find(".active").removeClass("active");
      $(this).addClass("active");
    });
  });
  // isotope filter - end
  // --------------------------------------------------

  // multy count down - start
  // --------------------------------------------------
  $('.countdown_timer').each(function(){
    $('[data-countdown]').each(function() {
      var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function(event) {
        var $this = $(this).html(event.strftime(''
          + '<li class="days_count"><strong>%D</strong><span>Days</span></li>'
          + '<li class="hours_count"><strong>%H</strong><span>Hours</span></li>'
          + '<li class="minutes_count"><strong>%M</strong><span>Mins</span></li>'
          + '<li class="seconds_count"><strong>%S</strong><span>Secs</span></li>'));
      });
    });
  });
  // multy count down - end
  // --------------------------------------------------

  // main slider - start
  // --------------------------------------------------
  $('.main_slider').slick({
    dots: true,
    fade: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    autoplaySpeed: 6000,
    asNavFor: '.ms_nav_thumbnails',
    prevArrow: ".main_left_arrow",
    nextArrow: ".main_right_arrow"
  });
  $('.ms_nav_thumbnails').slick({
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    verticalSwiping: true,
    asNavFor: '.main_slider',
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    }
    ]
  });

  $('.main_slider').on('init', function (e, slick) {
    var $firstAnimatingElements = $('div.slider_item:first-child').find('[data-animation]');
    doAnimations($firstAnimatingElements);
  });
  $('.main_slider').on('beforeChange', function (e, slick, currentSlide, nextSlide) {
    var $animatingElements = $('div.slider_item[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
    doAnimations($animatingElements);
  });
  var slideCount = null;

  $('.main_slider').on('init', function (event, slick) {
    slideCount = slick.slideCount;
    setSlideCount();
    setCurrentSlideNumber(slick.currentSlide);
  });
  $('.main_slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setCurrentSlideNumber(nextSlide);
  });

  function setSlideCount() {
    var $el = $('.slide_count_wrap').find('.total');
    if (slideCount < 10) {
      $el.text('' + slideCount);
    } else {
      $el.text(slideCount);
    }
  }

  function setCurrentSlideNumber(currentSlide) {
    var $el = $('.slide_count_wrap').find('.current');
    $el.text(currentSlide + 1);
  }

  function doAnimations(elements) {
    var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    elements.each(function () {
      var $this = $(this);
      var $animationDelay = $this.data('delay');
      var $animationType = 'animated ' + $this.data('animation');
      $this.css({
        'animation-delay': $animationDelay,
        '-webkit-animation-delay': $animationDelay
      });
      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
    });
  }

  var $timer = 6000;
  function progressBar() {
    $(".slick-progress").find("span").removeAttr("style");
    $(".slick-progress").find("span").removeClass("active");
    setTimeout(function () {
      $(".slick-progress").find("span").css("transition-duration", $timer / 1000 + "s").addClass("active");
    }, 100);
  }

  progressBar();
  $('.main_slider').on("beforeChange", function (e, slick) {
    progressBar();
  });
  // main slider - end
  // --------------------------------------------------

  // common carousel 1 col - start
  // --------------------------------------------------
  $('.common_carousel_1col').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    pauseOnHover: true,
    autoplaySpeed: 6000,
    prevArrow: ".cc1c_left_arrow",
    nextArrow: ".cc1c_right_arrow"
  });

  $('.common_carousel_1col2').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    pauseOnHover: true,
    autoplaySpeed: 6000,
    prevArrow: ".cc1c2_left_arrow",
    nextArrow: ".cc1c2_right_arrow"
  });
  // common carousel 1 col - end
  // --------------------------------------------------

  // common carousel 2 col - start
  // --------------------------------------------------
  $('.common_carousel_2col').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: ".cc2c_left_arrow",
    nextArrow: ".cc2c_right_arrow",
    responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    }
    ]
  });
  // common carousel 2 col - end
  // --------------------------------------------------

  // common carousel 3 col - start
  // --------------------------------------------------
  $('.common_carousel_3col').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: ".cc3c_left_arrow",
    nextArrow: ".cc3c_right_arrow",

    responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    }
    ]
  });

  $('.common_carousel_3col2').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: ".cc3c2_left_arrow",
    nextArrow: ".cc3c2_right_arrow",

    responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    }
    ]
  });

  $('.common_carousel_3col3').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: ".cc3c3_left_arrow",
    nextArrow: ".cc3c3_right_arrow",

    responsive: [
    {
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    }
    ]
  });

  $('.common_carousel_3col4').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: ".cc3c4_left_arrow",
    nextArrow: ".cc3c4_right_arrow",

    responsive: [
    {
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    }
    ]
  });

  $('.common_carousel_3col5').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: ".cc3c5_left_arrow",
    nextArrow: ".cc3c5_right_arrow",

    responsive: [
    {
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    }
    ]
  });

  $('.common_carousel_3col6').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: ".cc3c6_left_arrow",
    nextArrow: ".cc3c6_right_arrow",

    responsive: [
    {
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    }
    ]
  });
  // common carousel 3 col - end
  // --------------------------------------------------

  // common carousel 4 col - start
  // --------------------------------------------------
  $('.common_carousel_4col').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: ".cc4c_left_arrow",
    nextArrow: ".cc4c_right_arrow",

    responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    }
    ]
  });
  // common carousel 4 col - end
  // --------------------------------------------------

  // shop details image carousel - start
  // --------------------------------------------------
  $('.sd_carousel_wrap').slick({
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.sd_carousel_thumbnail'
  });
  $('.sd_carousel_thumbnail').slick({
    dots: false,
    arrows: false,
    vertical: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    verticalSwiping: true,
    asNavFor: '.sd_carousel_wrap',
    responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 3,
      }
    }
    ]
  });
  // shop details image carousel - end
  // --------------------------------------------------

  // brand carousel - start
  // --------------------------------------------------
  $('.brand_carousel').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    prevArrow: ".bc_left_arrow",
    nextArrow: ".bc_right_arrow",
    responsive: [
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      }
    }
    ]
  });
  // brand carousel - end
  // --------------------------------------------------

  // testimonial carousel 3col - start
  // --------------------------------------------------
  $('.testimonial_carousel_3col').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 6000,
    prevArrow: ".tc3c_left_arrow",
    nextArrow: ".tc3c_right_arrow",
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    }
    ]
  });
  // testimonial carousel 3col - end
  // --------------------------------------------------

  // lookbook carousel - start
  // --------------------------------------------------
  $('.lookbook_carousel').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.lookbook_carousel_thumbnail',
  });

  $('.lookbook_carousel_thumbnail').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.lookbook_carousel',
    prevArrow: ".lbct_left_arrow",
    nextArrow: ".lbct_right_arrow",
  });
  // lookbook carousel - end
  // --------------------------------------------------

  // google map - start
  // --------------------------------------------------
  if ( $('#mapBox').length ){
    var $lat = $('#mapBox').data('lat');
    var $lon = $('#mapBox').data('lon');
    var $zoom = $('#mapBox').data('zoom');
    var $marker = $('#mapBox').data('marker');
    var $info = $('#mapBox').data('info');
    var $markerLat = $('#mapBox').data('mlat');
    var $markerLon = $('#mapBox').data('mlon');
    var map = new GMaps({
      el: '#mapBox',
      lat: $lat,
      lng: $lon,
      scrollwheel: false,
      scaleControl: true,
      streetViewControl: false,
      panControl: true,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      zoom: $zoom,
    });
    map.addMarker({
      lat: $markerLat,
      lng: $markerLon,
      icon: $marker,    
      infoWindow: {
        content: $info
      }
    })
  }
  // google map - end
  // --------------------------------------------------

  // price range - start
  // --------------------------------------------------
  if($("#slider-range").length){
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 10000,
      values: [ 0, 4000.00 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  }

  $('.ar_top').on('click', function () {
    var getID = $(this).next().attr('id');
    var result = document.getElementById(getID);
    var qty = result.value;
    $('.proceed_to_checkout .update-cart').removeAttr('disabled');
    if( !isNaN( qty ) ) {
      result.value++;
    }else{
      return false;
    }
  });
  // price range - end
  // --------------------------------------------------

  // quantity - start
  // --------------------------------------------------
    $(document).on('click', '.input_number_decrement, .input_number_increment', function (e) {
      var target = $(e.target),
      qty = $(this).parent().find('input.input_number'),
      min, max, step, value;
      
      if (qty.length) {
        min = qty.attr('min') || 0;
        max = qty.attr('max') || 0;
        step = qty.attr('step') || 1;
        min = parseInt(min);
        max = parseInt(max);
        step = parseInt(step);
        value = parseInt(qty.val());
        
        // console.log(target);

        if (target.is('.input_number_increment, .fa-plus')) {
          value += step;
        } else {
          value -= step;
        }
        
        value = Math.max(min, value);
        if (max) {
          value = Math.min(max, value);
        }
        
        qty.val(value).change();
      }
    });
  
  // quantity - end
  // --------------------------------------------------

  // chart bar - start
  // --------------------------------------------------
  var ctx = document.getElementById("revenue_chart");
  if(ctx){
    var myChart = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ["JAN", "FEB", "MAC", "APR", "MEY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        datasets: [{
          label: 'Invest',
          data: [80, 30, 100, 60, 70, 90, 85, 95, 20, 75, 99, 110],
          backgroundColor: "#3385da"
        }, {
          label: 'Revenue',
          data: [100, 60, 130, 90, 50, 120, 70, 110, 40, 80, 125, 135],
          backgroundColor: "#07c8fa"
        }]
      }
    });
  }
  // chart bar - end
  // --------------------------------------------------

  // chart pie - start
  // --------------------------------------------------
  var BAChartDataValue = [5, 20, 25, 50];
  var BAChartDataLabel = [
  "Recent Order",
  "Recived Payment",
  "Mexican Wave",
  "Pending Payment"
  ];
  var BAChartJobErrColors = [
  "#ff9801",
  "#7cb31a",
  "#fec107",
  "#01a1ff"
  ];

  var BAChartCountTotal = 0;
  if (BAChartDataValue.length > 0) {
    BAChartCountTotal = BAChartDataValue.reduce(function (
      acc,
      currentVal,
      currentIdx,
      arr
      ) {
      return acc + currentVal;
    },
    0);
  }

  window.addEventListener("load", function () {
    var BAChartCtx = document.getElementById("overall_sale_chart");
    if(BAChartCtx) {
      var BAChartJobErr = new Chart(BAChartCtx.getContext("2d"), {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: BAChartDataValue,
              backgroundColor: BAChartJobErrColors,
              borderColor: "#fff",
              borderWidth: 1
            }
          ],
          labels: BAChartDataLabel
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          title: {
            display: true,
            position: "top",
            fontSize: 12,
            fontColor: "#000",
            fontStyle: "bold",
            padding: 24,
            text: "Title"
          },
          plugins: {
            labels: [
              {
                render: "label",
                fontColor: "#000",
                position: "outside"
              },
              {
                render: "percentage",
                fontColor: "#fff"
              }
            ],
            doughnutlabel: {
              labels: [
                {
                  text: "Total: " + BAChartCountTotal
                }
              ]
            }
          },
          legend: {
            display: false
          }
        }
      });
    }
  });
  // chart pie - end
  // --------------------------------------------------

})(jQuery);