MG.app.UserComponent.define({
	name : "googleMaps",
	factory : function (init, context) {
		return new googleMaps(init, context);
	}
});

googleMaps = function (init, context) {
	this.context = context;
	this.id = SohoUtil.generateId();
   this.init = init;
	if (typeof init == "string") {
		try {
			this.settings = JSON.parse(init);
		} catch (e) {
			// init failed
		}
	}
};

googleMaps.prototype = {

	getHtml : function(){
      return '<iframe ' +
              'id="' + this.id + '"' +
         	  'width="100%" ' +
         	  'height="100%" ' +
         	  'frameborder="0" style="border:0" ' +
         	  'allowfullscreen> ' +
         	'</iframe>'
	},
	
	onFormReady : function(){
      
	},
   
   onValueChanged : function(newVal) {
   
      var id = this.id;
      var ctx = this.context;
      var init = this.init;
      
      if (newVal) {
         $('#' + id).attr('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyARtxlbyJtvi_rjWwsaJAB5r0MTmpsjMQM&q=' + newVal);
      } else {
         $('#' + id).attr('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyARtxlbyJtvi_rjWwsaJAB5r0MTmpsjMQM&q=USA');
      }
      
   }
   

};