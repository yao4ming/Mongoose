//code courtesy of zuraiz from codepen
function initSlider(id) {

   jQuery(document).ready(function ($) {

         var slideCount = $('#slider-' + id + ' ul li').length;
         var slideWidth = $('#slider-' + id + ' ul li').width();
         var slideHeight = $('#slider-' + id + ' ul li').height();
         var sliderUlWidth = slideCount * slideWidth;

         $('#slider').css({ width: slideWidth, height: slideHeight });

         //starting slide is the second slide
         $('#slider-' + id + ' ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
         $('#slider-' + id + ' ul li:last-child').prependTo('#slider-' + id + ' ul');

         function moveLeft() {
             //console.log("moveleft");
             $('#slider-' + id + ' ul').animate({
                 left: + slideWidth
             }, 200, function () {
                 $('#slider-' + id + ' ul li:last-child').prependTo('#slider-' + id + ' ul');
                 $('#slider-' + id + ' ul').css('left', '');
             });
         };

         function moveRight() {
             //console.log("moveRight");
             $('#slider-' + id + ' ul').animate({
                 left: - slideWidth
             }, 200, function () {
                 $('#slider-' + id + ' ul li:first-child').appendTo('#slider-' + id + ' ul');
                 $('#slider-' + id + ' ul').css('left', '');
             });
         };

         $('a.control_prev').click(function () {
             moveLeft();

             //reset interval time
             clearInterval(interval);
             interval = setInterval(moveRight, 6000);
         });

         $('a.control_next').click(function () {
             moveRight();

             //reset interval time
             clearInterval(interval);
             interval = setInterval(moveRight, 6000);
         });

         var interval = setInterval(moveRight, 6000);
   });

}

function resizeElementWidth(element) {
  var width = 0;
  var body = window.document.body;
  if (window.innerWidth) {
      width = window.innerWidth;
  } else if (body.parentElement.clientWidth) {
      width = body.parentElement.clientWidth;
  } else if (body && body.clientWidth) {
      width = body.clientWidth;
  }
  //console.log("window width: " + width);
  //console.log("slider width: " + element.width());
  //element.width(width + "px");
  element.width("auto");
}

var prevHeight = window.innerHeight;
function resizeElementHeight(element) {
  var height = 0;
  var body = window.document.body;
  if (window.innerHeight) {
      height = window.innerHeight;
  } else if (body.parentElement.clientHeight) {
      height = body.parentElement.clientHeight;
  } else if (body && body.clientHeight) {
      height = body.clientHeight;
  }
  //console.log("window height: " + height);
  //console.log("slider height: " + element.height());
  //console.log(height - prevHeight);
  var heightdifference = height - prevHeight;
  element.height(element.height() + heightdifference);
  //console.log("new height: " + element.height());
  prevHeight = height;
}
