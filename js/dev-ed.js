$(document).ready(function() {

  /*
  var headerHeight = $("header#header_include").height();
  var navHeight = $("nav#navigation-bar").height();
  var imageWidth1;
  var imageHeight1;
  var url = $("#section-4").css('background-image').replace('url(', '').replace(')', '').replace("'", '').replace('"', '');
  var bgImg = $('<img />');
  bgImg.hide();
  bgImg.bind('load', function()
  {
      imageHeight1 = $(this).height();
      imageWidth1 = $(this).width();
  });
  $('#section-4').append(bgImg);
  bgImg.attr('src', url);

  //resize header to screen size as well as when orientation is changed.
  $(".dropdown-parent > .collapse").each(function(){
    var collapse = $(this);
    var button = $("[data-target='#" + this.id +"']");
    var offset = button.outerHeight();
    $(collapse).css("max-height", $(window).height()-offset);
    $(window).resize(function(){
      $(collapse).css("max-height", $(window).height()-offset);
    });
  });
  */
  
	//scroll to panel if hash tag is present
  /*if(location.hash != undefined && location.hash != ""){
    scrollToPanel(location.hash);
  }*/

	//when clicking nav buttons scroll to panel
  $('.page-anchor').click(function (e) {      
    scrollToPanel(this);

    var dropdown = $(this).parents(".collapse.in");
    if(dropdown.length > 0) {
      //close dropdown when one has been clicked
      var button = $('[data-target=#' + $(dropdown).attr("id") + "]");
      dropdown.collapse("toggle");
      button.addClass('collapsed');
    }

    //set focus to the elements scrolled to
    e.preventDefault();
  });


  function scrollToPanel(element){
    var target;
    var height = 0;

    if(element && element.nodeType){
      target = $(element).data().target;
      if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && $(window).width() > 760) {
      	height += $(element).outerHeight();
      }
    }else{
      target = element;
    }

    //smoothly scroll to the panel associated with the button clicked
    $(target).animatescroll({
      padding: $("header").outerHeight() + height,
      easing:'easeInOutQuad',
      onScrollEnd: function(){
        if(history.pushState) {
          history.pushState(null, null, target);
        }
        else {
          location.hash = target;
        }
      }
    });
  }

  // Scroll-Action 
  /* Every time the window is scrolled ... */
  $(window).scroll( function(){
    /* Check the location of each desired element */
    $('.scroll-action').each( function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var top_of_object = $(this).offset().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var top_of_window = $(window).scrollTop()

      /* If the object is completely visible in the window, fade it it */
      if( bottom_of_window > top_of_object && top_of_window < bottom_of_object && !$(this).hasClass("action")){
        $(this).addClass('action');

        if($(this).hasClass('knob') && !$(this).hasClass('activated')){
          initCharts(this);
        }

        if($(this).hasClass("count-title")) {
          $(this).countTo();
        }

        if($(this).attr("id") == "section-4"){
          moveBackground(this, top_of_window, top_of_object);
        }
      }else if(( bottom_of_window < top_of_object || top_of_window > bottom_of_object) && $(this).hasClass('action') ){
        $(this).removeClass('action');

        if($(this).hasClass('knob') && $(this).hasClass('activated')){
          $(this).val(0).trigger('change');
          $(this).removeClass('activated');
        }
      }
    }); 
  });
  
  var knobSize;
  if($(window).width() <= 480) {
    knobSize = 150;
  } else if($(window).width() <= 768) {
    knobSize = 114;
  } else {
    knobSize = 200;
  }
  
  $(".knob").knob({
    value: 0,
    readOnly: true,
    width: knobSize,
    height: knobSize,
    dynamicDraw: true,
    thickness: 0.05,
    fontWeight: 400,
    format : function (value) {
     return value + '%';
    }
  });

  function initCharts(element) {
    var value = $(element).data("val"); 
    // documentation: http://rendro.github.io/easy-pie-chart/
    if(!$(element).is(':animated') && $(element).val() != value) {
      $(element).animate({value: value}, {
        duration: 1500,
        progress: function (anim, progress, remain) {   
          $(element).val(Math.ceil(this.value*progress)).trigger('change');
        }
      });
    }
    $(element).addClass('activated');
  }

  function moveBackground(elm, viewTop, divTop) {
    var divHeight = $(elm).outerHeight();
    // minus the height of the header content
    var viewHeight = $(window).height() - (headerHeight + navHeight);
    viewTop = viewTop + (headerHeight + navHeight);

    var bTop = ((((imageHeight1 * ($(elm).width() / imageWidth1)) - divHeight) * (viewTop - divTop + viewHeight)) * -1) / (divHeight + viewHeight);
    $(elm).css("background-position-y", bTop);
  }
});