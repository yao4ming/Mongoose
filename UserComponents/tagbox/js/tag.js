MG.app.UserComponent.define({
	name : "tag",
	factory : function (init, context) {
		return new tag(init, context);
	}
});

tag = function (init, context) {
	this.context = context;
	this.ready = false;
	this.id = SohoUtil.generateId();
	if (typeof init == "string") {
		try {
			this.settings = JSON.parse(init);
		} catch (e) {
			// init failed
		}
	}
};

tag.prototype = {
	
	getHtml : function () {
		return ('<input name="tags" id="{0}">').replace("{0}", this.id);
	},
	
	onFormReady : function () {

		var ctx = this.context;
		var tagID = '#' + this.id;

		//autocomplete list
		ctx.getList(function(list) {
			$(tagID).tagit({
				availableTags : list
			});
		});
		
		//change in tag user component 
		$(tagID).change(function() {
			//console.log("UC called");
			ctx.setValue($(tagID).val());
		});
	},

	onValueChanged : function(newVal) {
		//console.log("edit called");
		var tagID = '#' + this.id;
		var values = newVal.split(",");

		$(tagID).tagit();
        $(tagID).tagit("removeAll");
		
        for (var i = 0; i < values.length; i++) {
        	$(tagID).tagit("createTag", values[i]);
        };
        
	} 

};
