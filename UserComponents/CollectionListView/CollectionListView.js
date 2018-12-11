
MG.app.UserComponent.define({
    name: "CollectionListView",
    factory: function(init, context) {
        return new CollectionListView(init, context);
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
  
CollectionListView = function(init, context) {
   this.context = context;
   this.ready = false;
   this.init = init;
   this.id = guid();
};

CollectionListView.prototype = {

    getHtml: function() {
		console.log("getHTML");
		var id = this.id;
	
		return '<div id = ' + this.id + ' style="height: 100%;"><ul class="listview"></ul></div>';
    },
	
    onLoaded: function(rootEl) {
		console.log("onLoaded");
    },
	
	onFormReady: function() {
		console.log("onFormReady");
		var ctx = this.context;
		var id = this.id;
		var prevId = 0;
      
		ctx.getList(function(list) {
			console.log(list);
			for (var i = 0; i < list.length; i++) {

				var values = list[i].split("\t");
				var li = document.createElement('li');
				li.setAttribute("style", "height: 80px;");
			   li.id = i;
				
				var div0 = document.createElement('div');
				div0.className = "item0";
				
				var value0 = document.createTextNode(values[0]);
				div0.appendChild(value0);
				
				li.appendChild(div0);
				
				var div2 = document.createElement('div');
				div2.className = "item1";
				
				var value2 = document.createTextNode(values[2]);
				div2.appendChild(value2);
				
				li.appendChild(div2);
				li.appendChild(document.createElement('br'));
				li.appendChild(document.createElement('br'));
            
				var div1 = document.createElement('div');
				div1.className = "item2";
				
				var value1; 
            if (values[1].length > 30) {
               value1 = document.createTextNode(values[1].substring(0, 25) + "...");
            } else {
               value1 = document.createTextNode(values[1]);
            }
            
				div1.appendChild(value1);
				li.appendChild(div1);
				
				//var div3 = document.createElement('div');
				//div3.className = "item3";
				
				//var value3 = document.createTextNode(values[3]);
				//div3.appendChild(value3);
            
            var img = document.createElement('img');
            img.setAttribute('src', 'data:image/png;base64,' + values[4]);
            img.setAttribute('style', 'width: 20%; float: right');
				li.appendChild(img);
            
            var input = document.createElement('input');
            input.setAttribute("type", "text");
            li.appendChild(input);
            
            li.onclick = function() {
               console.log("item clicked");

               //set the previously selected entry back to its original backgroundColor
               if (prevId % 2 === 0) {
                document.getElementById(prevId).style.backgroundColor = "#FFF";
               } else {
                document.getElementById(prevId).style.backgroundColor = "#efefef";
               }
               
               //set the current entry backgroundColor
               this.style.backgroundColor = "#D9EFF7";
               
               //set the json object to return to mongoose
               var obj = new Object();
               obj.index = this.id;
               console.log(this.children);
               obj.item = this.children[0].innerHTML;
               console.log(this.children[6].value);
               obj.qty = this.children[6].value;
               ctx.setValue(JSON.stringify(obj));
               //ctx.firePrimaryEvent();
               
               //track the current entry
               prevId = this.id;
            }
               
				document.getElementsByClassName("listview")[0].appendChild(li);
            
			}
			
		});
		
	},
	
	onValueChanged: function() {
		console.log("onValueChanged");
	}
}