MG.app.UserComponent.define({
	name : "redipsDrag",
	factory : function (init, context) {
		return new redipsDrag(init, context);
	}
});

redipsDrag = function (init, context) {
	this.context = context;
	this.id = guid();
   this.init = init;
	if (typeof init == "string") {
		try {
			this.settings = JSON.parse(init);
		} catch (e) {
			// init failed
		}
	}
};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

redipsDrag.prototype = {

	getHtml : function(){
      console.log("getHTML");
      
      var id = this.id;
      
      return (
         '<div id="redips-drag" class="redips-drag-container">' +
             '<div id="left">' +
                 '<table id="table1">' +
                     '<colgroup>' +
                         '<col width="100"/>' +
                     '</colgroup>' +
                     '<tbody>' +
                         '<tr>' +
                             '<td class="redips-trash">Trash</td>' +
                         '</tr>' +
                         '<tr>' +
                             '<td class="redips-mark rightContainer">' +
                                 '<div id="a" class="redips-drag grey"><i class="fa fa-arrow-left" style="font-size:24px;color:black;float:left;"></i><i class="fa fa-clock-o" style="font-size:24px;color:red;"></i><i class="fa fa-calendar-check-o" style="font-size:24px;color:green; float: right;"></i></div>' +
                                 '<div id="b" class="redips-drag grey"><i class="fa fa-minus-square" style="font-size:24px;color:black;float:left;"></i><i class="fa fa-clock-o" style="font-size:24px;color:red;"></i><i class="	fa fa-calendar-o" style="font-size:24px;color:blue; float: right;"></i></div>' +
                                 '<div id="c" class="redips-drag grey"><i class="fa fa-arrow-left" style="font-size:24px;color:black;float:left;"></i><i class="fa fa-clock-o" style="font-size:24px;color:red;"></i><i class="fa fa-calendar-minus-o" style="font-size:24px;color:black; float: right;"></i></div>' +
                                 '<div id="d" class="redips-drag grey"><i class="fa fa-arrow-left" style="font-size:24px;color:black;float:left;"></i><i class="fa fa-clock-o" style="font-size:24px;color:red;"></i><i class="	fa fa-calendar-plus-o" style="font-size:24px;color:orange; float: right;"></i></div>' +
                                 '<div id="e" class="redips-drag grey"><i class="fa fa-minus-square" style="font-size:24px;color:black;float:left;"></i><i class="fa fa-clock-o" style="font-size:24px;color:red;"></i><i class="	fa fa-calendar-times-o" style="font-size:24px;color:red; float: right;"></i></div>' +
                             '</td>' +
                         '</tr>' +
                     '</tbody>' +
                 '</table>' +
             '</div>' +

             '<div id="right">' +
                 '<table id="table2">' +
                     '<colgroup>' +
                         '<col width="100"/>' +
                         '<col width="100"/>' +
                         '<col width="100"/>' +
                         '<col width="100"/>' +
                     '</colgroup>' +
                     '<tbody>' +
                         '<tr><td></td><td></td><td></td><td></td></tr>' +
                         '<tr><td></td><td></td><td></td><td></td></tr>' +
                         '<tr><td></td><td></td><td></td><td></td></tr>' +
                         '<tr><td></td><td></td><td></td><td></td></tr>' +
                         '<tr><td></td><td></td><td></td><td></td></tr>' +
                         '<tr><td></td><td></td><td></td><td></td></tr>' +
                     '</tbody>' +
                 '</table>' +
             '</div>' +
         '</div>'
         )
	},
	
	onFormReady : function(){
      console.log("onFormReady");
         
      // reference to the REDIPS.drag library
      var rd = REDIPS.drag;
       // initialization
       rd.init();
       // dragged elements can be placed to the empty cells only
   	rd.dropMode = 'single';
       // set hover color
       rd.hover.colorTd = '#9BB3DA';
   	 // when DIV element is double clicked return it to the left table
   	 rd.event.dblClicked = function () {
   	    var id = rd.obj.id, // set dblclicked DIV id
           pos = rd.getPosition(); // get element position
           // move element if source position is second (right) table
           if (pos[0] === 1) {
               // move DIV element to the left table
               rd.moveObject({
                   id: id, // DIV element id
                   target: [0, 1, 0] // target position (first table, second row, first cell)
               });
           }
   	 };
	},
   
   onValueChanged : function(newVal) {
     console.log("onValueChanged " + newVal);
     if (newVal) {
      document.getElementById('a').children[0].style.color = "blue";
     }
   }
   

};