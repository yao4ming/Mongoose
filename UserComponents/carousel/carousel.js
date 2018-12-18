MG.app.UserComponent.define({
    name : "IDMCarousel",
    factory : function (init, context) {
        return new IDMCarousel(init, context);
    }
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

IDMCarousel = function (init, context) {
    this.context = context;
    this.id = guid();
    if (typeof init == "string") {
        try {
            this.settings = JSON.parse(init);
        } catch (e) {
            // init failed
        }
    }
};

var carouselContent;

function setCarouselContent(idm, id) {
  console.log(idm);

  //dynamicaly add slides
  for (var i = 0; i < idm.length; i++) {
     $("#carouselId").append('<li id="slide' + i + '"><img src="' + idm[i].image + '" width="100%" height="100%"/></li>');
  }

  $("#carouselId").click(function() {

      //get slide index
      var i = $('#carouselId li:nth-child(2)').attr('id').substr(-1);
      console.log(idm[i].doc);
      window.open(idm[i].doc, "_blank");

  });

  //set width and height for carousel
  $('#slider-' + id + ' ul li').width($('#slider-' + id).width());
  $('#slider-' + id + ' ul li').height($('#slider-' + id).parent().height());

  initSlider(id);

  $(window).resize(function() {
      console.log("resizing");
      resizeElementWidth($("#slider-" + id));
      setTimeout(function() {
         $('#slider-' + id + ' ul li').width(document.getElementById('slider-' + id).clientWidth);
      }, 400);

      $('#carouselId').css("margin-left", "0px");
      /*
      resizeElementHeight($('#slider'));
      $('#slider-' + id + ' ul li').height($('#slider-' + id).height());
      */
  });
}

IDMCarousel.prototype = {

  getHtml : function() {
     var id = this.id;
     return ('<div id="slider-' + id + '">' +
              '<a href="#" class="control_next"><img width="40px" src="https://metdevap.mongoose.awsdev.infor.io/WsWebClient/dynamic/metadata/$app/images/arrowright.png" /></a>' +
              '<a href="#" class="control_prev"><img width="40px" src="https://metdevap.mongoose.awsdev.infor.io/WsWebClient/dynamic/metadata/$app/images/arrowleft.png" /></a>' +
              '<ul id="carouselId"></ul>' +
           '</div>');
  },

  onFormReady : function() {

     var sliderId = '#slider-' + this.id;
     var css = sliderId + ' { position: relative; overflow: hidden; margin: 0px auto 0 auto; border-radius: 4px; } ' + sliderId + ' ul { position: relative; margin: 0; padding: 0; height: 200px; list-style: none; } ' + sliderId + ' ul li { cursor: pointer; position: relative; display: block; float: left; margin: 0; padding: 0; background: #ccc; text-align: center; line-height: 300px; } ' + sliderId + ':hover > a.control_next { display: block; } ' + sliderId + ':hover > a.control_prev { display: block; } @media screen and (min-width: 320px) and (max-width: 645px) { a.control_prev { top: 80px; } a.control_next { top: 80px; } ' + sliderId + ' { height: 229px !important; } ' + sliderId + ' ul li { height: 229px !important; } } @media screen and (min-width: 646px) and (max-width: 1008px) { a.control_prev { top: 350px; } a.control_next { top: 350px; } ' + sliderId + ' { height: 810px !important; } ' + sliderId + ' ul li { height: 810px !important; } }',
     head = document.head || document.getElementsByTagName('head')[0],
     style = document.createElement('style');

     style.type = 'text/css';

     if (style.styleSheet){
       style.styleSheet.cssText = css;
     } else {
       style.appendChild(document.createTextNode(css));
     }
     head.appendChild(style);

     var id = this.id;
     var ctx = this.context;
     var carouselContent = ctx.userComp.startValue;
     console.log(ctx.userComp.startValue);

     setCarouselContent(JSON.parse(carouselContent), id);

  },

  onValueChanged : function(newVal) {
     //var ctx = this.context;
     //console.log("carousel new value: " + newVal);
     //if (newVal && !carouselContent) {
     //   console.log("newVal");
     //   carouselContent = newVal;
     //   setCarouselContent(JSON.parse(carouselContent));
     //}
  }


};
