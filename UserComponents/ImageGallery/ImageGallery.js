MG.app.UserComponent.define({

    name: "ImageGallery",

    factory: function(init, context) {

        return new ImageGallery(init, context);

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

ImageGallery = function(init, context) {

    this.context = context;

    this.ready = false;

    if (typeof init == "string") {

        try {

            this.settings = JSON.parse(init);

        } catch (e) {

            // init failed

        }

    }

    this.settings = this.settings || {

        type: "primary"

    };

    this.id = guid();

};



ImageGallery.prototype = {



    // This function is called by the framework to get the HTML fragment used to render the user component.
    // For example, to render a button this function would return something similar to this:
    // "<input type='button' value='Push Me' />"
    // Note: this function is optional - certain types of components may not have a persistent UI element,
    // and may not implement this function.

    getHtml: function() {
        var ctx = this.context,
            UUID = this.id;
        var html = (
            '<footer>'+
                '<header id='+UUID+'_ImageGallery>'+
                    '<div class="container">'+
                        '<div class="selected"></div>'+
                        '<div class="gallery"></div>'+
                    '</div>'+
                '</header>'+
            '</footer>'
            )
        return html;

    },



    // This function is called by the framework to get the current value of the user component.
    getValue: function() {},

    // This function is called by the framework when the value for this component has changed,
    // whether it is bound to a property or a variable whose value has changed,
    // or the value was changed by a script ? in any case this will be called.

    onValueChanged: function(newValue) {
      var ctx = this.context;

      if (newValue) {
        console.log(newValue);
        var gallery = document.querySelector('.gallery');
        /*var images = [
          'https://images.pexels.com/photos/86933/pexels-photo-86933.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',"https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-1.jpg",
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',"https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-1.jpg",
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',"https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-1.jpg",
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',"https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-1.jpg",
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb'
        ];*/
        var images = newValue.split(',');

        var mainImage = document.createElement('img');
        var target = document.getElementsByClassName('selected')[0];
        var div = document.createElement('div');
        target.appendChild(div).appendChild(mainImage);
        mainImage.src = images[0];

        target.addEventListener('click', function(event) {
            if (target.style.display = 'flex') {
            target.style.display = 'none';
            };
        });


        var count = 0;
        for (var i = 0 + count; i < images.length + count && i < 520; i++) {
          var pic = document.createElement('img');
          //pic.src = images[i];
          //pic.setAttribute('src', 'base64,' + images[i]);
          pic.setAttribute('src', 'data:image/png;base64,' + images[i]);
          pic.classList.add('pic');
          gallery.appendChild(pic);
          pic.addEventListener('click', function(event) {
              mainImage.src = event.target.src;
              target.style.display = 'flex';
          });
        }

        this.context.userComp.setScrollable(true);
      }
    },



    // This function is called by the framework when the component?s read-only state changes.
    // If a user component accepts user input it should implement this function
    // and disable input when the parameter is true.
    onReadOnlyChanged: function(readOnly) {
    },



    // This function is called by the framework when the component becomes visible or hidden.
    // The user component container will be hidden automatically by the framework
    // so it is not generally necessary for the user component to do anything when this is called,
    // but it may be useful in some scenarios.
    onVisibleChanged: function(visible) {},


    // This function is called by the framework when the component?s caption changes.
    // The developer should add an implementation for this function if they want to handle dynamic caption changes.
    onCaptionChanged: function(caption) {

    },


    // This function is called by the framework to signal that form initialization is complete.
    // Before this is called the user component should not call any of these context function:
    // setValue(), getList() or firePrimaryEvent()
    onFormReady: function() {

    },



    // This is called by the framework to indicate that it is about to synchronize any changes in progress,
    // with the server. Most controls will not need to implement this function, but it may be useful in some scenarios.
    endEdit: function() {},

    // Called by the framework when the user component is removed from a form (because of closing).
    destroy: function() {},


    // Called by the framework after the DOM elements for this component have been created and added to the document.
    // The parameter is the root element corresponding to the first element specified in the string returned by
    // the getHtml() function. Note: if the getHtml() function is not implemented
    // or returns an empty string the rootEl parameter will be undefined.
    onLoaded: function(rootEl) {}

}
MG.app.UserComponent.define({

    name: "ImageGallery",

    factory: function(init, context) {

        return new ImageGallery(init, context);

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

ImageGallery = function(init, context) {

    this.context = context;

    this.ready = false;

    if (typeof init == "string") {

        try {

            this.settings = JSON.parse(init);

        } catch (e) {

            // init failed

        }

    }

    this.settings = this.settings || {

        type: "primary"

    };

    this.id = guid();

};



ImageGallery.prototype = {



    // This function is called by the framework to get the HTML fragment used to render the user component.
    // For example, to render a button this function would return something similar to this:
    // "<input type='button' value='Push Me' />"
    // Note: this function is optional - certain types of components may not have a persistent UI element,
    // and may not implement this function.

    getHtml: function() {
        var ctx = this.context,
            UUID = this.id;
        var html = (
            '<footer>'+
                '<header id='+UUID+'_ImageGallery>'+
                    '<div class="container">'+
                        '<div class="selected"></div>'+
                        '<div class="gallery"></div>'+
                    '</div>'+
                '</header>'+
            '</footer>'
            )
        return html;

    },



    // This function is called by the framework to get the current value of the user component.
    getValue: function() {},

    // This function is called by the framework when the value for this component has changed,
    // whether it is bound to a property or a variable whose value has changed,
    // or the value was changed by a script ? in any case this will be called.

    onValueChanged: function(newValue) {
      var ctx = this.context;

      if (newValue) {
        console.log(newValue);
        var gallery = document.querySelector('.gallery');
        /*var images = [
          'https://images.pexels.com/photos/86933/pexels-photo-86933.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',"https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-1.jpg",
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',"https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-1.jpg",
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',"https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-1.jpg",
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',"https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-1.jpg",
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&auto=compress&cs=tinysrgb',
          'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&auto=compress&cs=tinysrgb'
        ];*/
        var images = newValue.split(',');

        var mainImage = document.createElement('img');
        var target = document.getElementsByClassName('selected')[0];
        var div = document.createElement('div');
        target.appendChild(div).appendChild(mainImage);
        mainImage.src = images[0];

        target.addEventListener('click', function(event) {
            if (target.style.display = 'flex') {
            target.style.display = 'none';
            };
        });


        var count = 0;
        for (var i = 0 + count; i < images.length + count && i < 520; i++) {
          var pic = document.createElement('img');
          //pic.src = images[i];
          //pic.setAttribute('src', 'base64,' + images[i]);
          pic.setAttribute('src', 'data:image/png;base64,' + images[i]);
          pic.classList.add('pic');
          gallery.appendChild(pic);
          pic.addEventListener('click', function(event) {
              mainImage.src = event.target.src;
              target.style.display = 'flex';
          });
        }

        this.context.userComp.setScrollable(true);
      }
    },



    // This function is called by the framework when the component?s read-only state changes.
    // If a user component accepts user input it should implement this function
    // and disable input when the parameter is true.
    onReadOnlyChanged: function(readOnly) {
    },



    // This function is called by the framework when the component becomes visible or hidden.
    // The user component container will be hidden automatically by the framework
    // so it is not generally necessary for the user component to do anything when this is called,
    // but it may be useful in some scenarios.
    onVisibleChanged: function(visible) {},


    // This function is called by the framework when the component?s caption changes.
    // The developer should add an implementation for this function if they want to handle dynamic caption changes.
    onCaptionChanged: function(caption) {

    },


    // This function is called by the framework to signal that form initialization is complete.
    // Before this is called the user component should not call any of these context function:
    // setValue(), getList() or firePrimaryEvent()
    onFormReady: function() {

    },



    // This is called by the framework to indicate that it is about to synchronize any changes in progress,
    // with the server. Most controls will not need to implement this function, but it may be useful in some scenarios.
    endEdit: function() {},

    // Called by the framework when the user component is removed from a form (because of closing).
    destroy: function() {},


    // Called by the framework after the DOM elements for this component have been created and added to the document.
    // The parameter is the root element corresponding to the first element specified in the string returned by
    // the getHtml() function. Note: if the getHtml() function is not implemented
    // or returns an empty string the rootEl parameter will be undefined.
    onLoaded: function(rootEl) {}

}
