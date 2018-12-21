//initial code courtesy of zuraiz from codepen
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

         // add listener for visibility change
         document.addEventListener("visibilitychange", function() {
           if (document.visibilityState == 'visible') {
             interval = setInterval(moveRight, 6000);
           } else {
             clearInterval(interval);
           }
         });
   });

}
