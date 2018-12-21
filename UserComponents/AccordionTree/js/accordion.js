/*
 * JSON Format must be {"input": {"MAIN": {"SUB": ["SUBTAB1", "SUBTAB2", "SUBTAB3", ]}, "MAIN2": {"SUB2": ["SUB2TAB2"]}, "output": {}}
 */
MG.app.UserComponent.define({
   name: "Accordion",
   factory: function(init, context) {
      return new Accordion(init, context);
   }
});

// Unique ID Guid Function
function guid() {
   function s4() {
   	return Math.floor((1 + Math.random()) * 0x10000)
   		.toString(16)
   		.substring(1);
   }
   return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
   	s4() + '-' + s4() + s4() + s4();
};

function recurseAccordion(obj, id) {

	console.log(typeof Object.values(obj)[0]);

	//base case - obj value is array of strings and not objects
	if (typeof Object.values(obj)[0] === "string") {
		console.log("base case");
      console.log(obj);

      var headerHTML = "";

      //for every accorder header tab in pane
      for (var i in obj) {
         headerHTML += "<div class=\"accordion-header\"> <a href=\"#\"><span>"  + obj[i] + "</span></a> </div>";
      }

		return headerHTML;

	} else {
		var headerElement;
		var svgElement;
		var linkElement;
		var spanElement;
		var paneElement;
      var headerAndPaneElementHTML = "";

		//recurse for every tab in header
		for (var header in obj) {
			console.log(header);
			console.log(obj[header]);

			//create accordion header with svg
			headerElement = document.createElement('div');
			headerElement.className = 'accordion-header';

			linkElement = document.createElement('a');
			linkElement.setAttribute("href", "#");

			spanElement = document.createElement('span');
			spanElement.textContent = header;

			linkElement.appendChild(spanElement);

         //only add the svg for top level accordion headers
         if (typeof id != 'undefined') {
               svgElement = document.createElement('svg');
      			svgElement.className = 'icon';
      			svgElement.setAttribute("focusable", "false");
      			svgElement.setAttribute("aria-hidden", "true");
      			svgElement.setAttribute("role", "presentation");
      			svgElement.innerHTML = '<use xlink:href="#icon-user"></use>';
               headerElement.appendChild(svgElement);
         }

			headerElement.appendChild(linkElement);

			paneElement = document.createElement('div');
			paneElement.className = 'accordion-pane';

         //recursely append accordion headers to pane
			var res = recurseAccordion(obj[header]);
         //console.log(res);
         paneElement.innerHTML += res;

         headerAndPaneElementHTML = headerAndPaneElementHTML + headerElement.outerHTML + paneElement.outerHTML;
         //console.log(headerElement.outerHTML + paneElement.outerHTML);
		}

	}
   return headerAndPaneElementHTML;
}

Accordion = function(init, context) {
   this.context = context;
   this.id = guid();

   //append svg-launch icon for droplist once
   var bodyEl = $('body');
   if (!bodyEl.hasClass('icon-added')) {
     console.log("add icons");
     bodyEl.addClass('icon-added');
     $('body').prepend('<div style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-icons"><symbol id="icon-caret-down" viewBox="0 0 32 32"> <path d="M24.014 13.684l-1.358-1.357-6.656 6.644-6.655-6.644-1.359 1.357 8.004 7.989.01-.01.011.01z" ></path> </symbol><symbol id="icon-user-profile" viewBox="0 0 18 18"> <path d="M9 0c-4.971 0-9 4.029-9 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm2.501 7.052c0 1.379-1.118 2.5-2.5 2.5s-2.5-1.121-2.5-2.5c0-1.382 1.118-2.5 2.5-2.5s2.5 1.118 2.5 2.5zm-2.5 3.371c2.294 0 4.208 1.554 4.796 3.661-1.254 1.185-2.939 1.916-4.797 1.916-1.856 0-3.541-.731-4.795-1.914.588-2.109 2.501-3.663 4.796-3.663z"></path> </symbol><symbol id="icon-user" viewBox="0 0 18 18"> <path d="M15.95 15.746c0-3.866-3.134-7-7-7s-7 3.134-7 7c0 0 0 1.728 2 1.728h10c2 0 2-1.728 2-1.728m-7-8.221c-1.933 0-3.5-1.567-3.5-3.5 0-1.932 1.567-3.5 3.5-3.5 1.934 0 3.5 1.568 3.5 3.5 0 1.933-1.566 3.5-3.5 3.5"></path> </symbol><symbol id="icon-roles" viewBox="0 0 18 18"> <path d="M15.5 5h-2.5v-1.5c0-1.375-1.125-2.5-2.5-2.5h-3c-1.375 0-2.5 1.125-2.5 2.5v1.5h-2.5c-1.381 0-2.5 1.119-2.5 2.5v7c0 1.381 1.119 2.5 2.5 2.5h13c1.381 0 2.5-1.119 2.5-2.5v-7c0-1.381-1.119-2.5-2.5-2.5zm-8.5-1.5c0-.271.229-.5.5-.5h3c.271 0 .5.229.5.5v1.5h-4v-1.5z"></path> </symbol></svg></div>');
   }

   if (typeof init == "string") {
      try {
         this.settings = JSON.parse(init);
      } catch (e) {
         // init failed
      }
   }
};

Accordion.prototype = {

   getHtml: function() {
      console.log("accordion gethtml");
      var id = this.id;

      //return '<div id="' + id + '" class="accordion panel inverse"> <div class="accordion-header"> <svg class="icon" focusable="false" aria-hidden="true" role="presentation"> <use xlink:href="#icon-user"></use> </svg> <a href="#"><span>Personal</span></a> </div> <div class="accordion-pane"> <div class="accordion-header"> <a href="#"><span>Item 1</span></a> </div> <div class="accordion-header"> <a href="#"><span>Item 2</span></a> </div> </div><div class="accordion-header"> <svg class="icon" focusable="false" aria-hidden="true" role="presentation"> <use xlink:href="#icon-roles"></use> </svg> <a href="#"><span>Position</span></a> </div> <div class="accordion-pane"> <div class="accordion-header"> <a href="#"><span>Item 1</span></a> </div> <div class="accordion-header is-disabled"> <a href="#"><span>Item 2</span></a> </div> <div class="accordion-header"> <a href="#"><span>Item 3</span></a> </div> <div class="accordion-pane"> <div class="accordion-header"> <a href="#"><span>Undergraduate</span></a> </div> <div class="accordion-header"> <a href="#"><span>Graduate</span></a> </div> <div class="accordion-pane"> <div class="accordion-header"> <a href="#"><span>test1</span></a> </div> <div class="accordion-header"> <a href="#"><span>test2</span></a> </div> </div> </div> </div>';
      return '<div id="' + id + '" class="accordion panel inverse"></div>';
   },

   onFormReady: function() {
     console.log("accordion onformready");
     var ctx = this.context;
     var accordionId = this.id;
     var accordionJSON = JSON.parse(ctx.userComp.startValue);
     console.log(accordionJSON);
     console.log(accordionJSON.input);

     var accordionHTML = recurseAccordion(accordionJSON.input, accordionId);
     $('#' + accordionId).html(accordionHTML);
     $('#' + accordionId).accordion();
   },

   onLoaded: function(rootEl) {
      console.log("accordion onloaded");
      var id = this.id;
   }
};
