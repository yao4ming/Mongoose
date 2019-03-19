MG.app.UserComponent.define({
   name : "googleMap",
   factory : function (init, context) {
      return new googleMap(init, context);
   }
});

googleMap = function (init, context) {
   this.context = context;
   this.id = SohoUtil.generateId();
};

googleMap.prototype = {

   getHtml : function(){
      return '<input id="autocomplete" placeholder="Enter a city" type="text" style="width:100%;"/>' +
             '<div id="map" style="width:100%; height:100%"></div>'
   },

   onFormReady : function(){

      var id = this.id;
      var ctx = this.context;

      //dynamically generate the googleMap script tag
      var tag = document.createElement('script');
      tag.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyARtxlbyJtvi_rjWwsaJAB5r0MTmpsjMQM&libraries=places&callback=initMap";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      

      //continuously listen for school marker queries
      var varLocations, temp;
      setInterval(function() {
         
         if (markers.length) {

            varLocations = "";

            for (var i = 0; i < markers.length; i++) {
               if (i == markers.length - 1)
                  varLocations = varLocations + markers[i].placeResult.name + "&" + markers[i].placeResult.vicinity;
               else 
                  varLocations = varLocations + markers[i].placeResult.name + "&" + markers[i].placeResult.vicinity + ";";
            }
            if (varLocations !== temp) {
               console.log(temp);
               console.log(varLocations);
               ctx.setValue(varLocations);
               ctx.firePrimaryEvent();
            }   
               
            temp = varLocations;
         }
      }, 1000);
   }

}

