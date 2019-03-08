 MG.app.UserComponent.define({

  name : "DragDrop",

  factory : function (init, context) {

    return new DragDrop(init, context);

  }

});



DragDrop = function (init, context) {

  this.context = context;

  this.id = guid();

   this.init = init;
   
   this.firstCall = true;
   
   this.oldInputValue = "";

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

function allowDrop(ev) {
     ev.preventDefault();
}

function drag(ev, prevId) {
     console.log("drag start");
     //console.log(prevId);

     ev.dataTransfer.setData("previousCell_id", prevId);
     ev.dataTransfer.setData("trailer_id", ev.target.id);
}

function drop(ev, ctx) {
      console.log("dropped");
      //console.log(ev);
      ev.preventDefault();
      
      var currentTrailer = document.getElementById(ev.dataTransfer.getData("trailer_id"));
      var prevCell = document.getElementById(ev.dataTransfer.getData("previousCell_id"));
      var currentCell;
      
      
      //make sure to set the currentCell to be td and not the span within
      if (ev.target.outerHTML.includes("td")) {
         currentCell = ev.target;
      } else if (ev.target.outerHTML.includes("span")) {
         currentCell = ev.target.parentElement;
      } else {
         console.log("You have dragged to an unsupported area");
         console.log(ev.target);
      }
      //console.log(currentTrailer);
      //console.log(currentCell);
      //console.log(prevCell);
      currentCell.appendChild(currentTrailer);
      
      //if currentCell on tableTop, rotate tooltiptext
      if (currentCell.closest('table').id === 'tableTop' && !currentTrailer.children[3].classList.contains("rotated")) {
         currentTrailer.children[3].className += " rotated";
      } else {
         currentTrailer.children[3].className = currentTrailer.children[3].className.replace(/\b rotated\b/g, "");
      }
      
      //unhide lot id of previous cell
      prevCell.children[0].style.display = 'block';
      
      var obj = JSON.parse(ctx.userComp.startValue);
      //console.log(obj);
      
      //get index of output for current trailer
      function checkTrailerKey(trailer) {
         //console.log(trailer.trailerKey + "=" + currentTrailer.id);
         return trailer.trailerKey === currentTrailer.id;
      }

      var index = obj.output.findIndex(checkTrailerKey);

      //hide Lot Id of current cell
      currentCell.children[0].style.display = "none";

      //update tooltip lot id
      var spanCurrentLot = currentTrailer.children[3].innerHTML.split(",")[2].split(":")[1].trim();
      currentTrailer.children[3].innerHTML = currentTrailer.children[3].innerHTML.replace(spanCurrentLot, currentCell.id);
      
      //update output lot id to mongoose
      obj.output[index].trailerCurrentLot = currentCell.id;
      
      ctx.setValue(JSON.stringify(obj));
      ctx.firePrimaryEvent();
}

DragDrop.prototype = {

   

  getHtml : function(){

      console.log("getHTML");

      

      var id = this.id;
      var tableTopId = 'tableTop-' + id;
      var table1Id = 'table1-' + id;
      var table2Id = 'table2-' + id;

      return (

         '<div id="' + id + '" class="dragdrop-container" align="center">' +
         
           '<div class="dragdrop-top">' +
           
               '<table class="tableTop" id="' + tableTopId + '">' +
               
               '</table>' +
               
           '</div>' +
           
           '<div class="dragdrop-bottom">'  +
           
               '<div class="emptyLot"></div>' +
               
               '<div class="tableBottom">' + 

                   '<div id="left">' +

                       '<table class="table1" id="' + table1Id+ '">' +

                           '<colgroup>' +

                               '<col width="100"/>' +

                           '</colgroup>' +

                           '<tbody>' +

                           '</tbody>' +

                       '</table>' +

                   '</div>' +

                   '<div id="right">' +

                       '<table class="table2" id="'+ table2Id + '" align="right">' +

                           '<colgroup>' +

                               '<col width="100"/>' +

                               '<col width="100"/>' +

                               '<col width="100"/>' +

                               '<col width="100"/>' +

                           '</colgroup>' +

                           '<tbody>' +

                           '</tbody>' +

                       '</table>' +

                   '</div>' +
                   
                '</div>' +
                
             '<div>' +
             
         '</div>'

         )

  },

  

  onFormReady : function(){

      console.log("onFormReady");

      var ctx = this.context;
      var id = this.id;   

  },

   onValueChanged : function(newVal) {
   
     console.log("onValueChanged");
     
     var id = this.id;
     var ctx = this.context;
     
     var tableTopId = 'tableTop-' + id;
     var table1Id = 'table1-' + id;
     var table2Id = 'table2-' + id;
     
     var tableTop = document.getElementById(tableTopId);
     var table1 = document.getElementById(table1Id).getElementsByTagName('tbody')[0];
     var table2 = document.getElementById(table2Id).getElementsByTagName('tbody')[0];
     
     if (newVal) {
     
         try {

            if (this.firstCall) {
               console.log("create table");
               
               //dynamically create table
               var numRows = 12;
               
               for (var i = 0; i < numRows; i++) {
               
                  var tableTopRow = tableTop.insertRow(i);
                  var tableTopCell = tableTopRow.insertCell(0);
                  tableTopCell.id = "SHIPDOOR1" + i;
                  tableTopCell.innerHTML = "<span>SHIPDOOR1" + i + "</span>";
                  tableTopCell.setAttribute("ondragover", "allowDrop(event)");
                  tableTopCell.ondrop = function(ev) {
                     drop(ev, ctx);
                  }
                  
                  if (i >= 4 && i <= 9) {
                     tableTopCell.classList.add("hiddenCell");
                  }
                  
                  var table1Row = table1.insertRow(i);
                  
                  var table1Cell = table1Row.insertCell(0);
                  table1Cell.id = "SHIPDOOR0" + i;
                  table1Cell.innerHTML = "<span>SHIPDOOR0" + i + "</span>";
                  table1Cell.setAttribute("ondragover", "allowDrop(event)");
                  table1Cell.ondrop = function(ev) {
                     drop(ev, ctx);
                  }
                  
                  var table2Row = table2.insertRow(i);
                  
                  var table2Cell0 = table2Row.insertCell(0);
                  table2Cell0.id = "YARD0" + i +"-A";
                  table2Cell0.innerHTML = "<span>YARD0" + i +"-A</span>";
                  table2Cell0.setAttribute("ondragover", "allowDrop(event)");
                  table2Cell0.ondrop =  function(ev) {
                     drop(ev, ctx);
                  }
                  
                  var table2Cell1 = table2Row.insertCell(1);
                  table2Cell1.id = "YARD0" + i +"-B";
                  table2Cell1.innerHTML = "<span>YARD0" + i +"-B</span>";
                  table2Cell1.setAttribute("ondragover", "allowDrop(event)");
                  table2Cell1.ondrop =  function(ev) {
                     drop(ev, ctx);
                  }
                  
               }
            } 
            
        var obj = JSON.parse(newVal);
            //console.log(JSON.stringify(obj.input));
            //console.log(this.oldInputValue);
            
            //if mongoose backend has updated, update UI
            if (JSON.stringify(obj.input) !== this.oldInputValue) {
               console.log("update grid");
               
               if (!this.firstCall) {
                  console.log("not first call");
                  //unhide lot id of previously filled lots
                  console.log(ctx.userComp.startValue);
                  var previousLots = JSON.parse(ctx.userComp.startValue).output;
                  console.log(previousLots);
                  
                  for (var i = 0; i < previousLots.length; i++) {
                        //console.log(previousLots[i].trailerCurrentLot);
                        //console.log(document.getElementById(previousLots[i].trailerCurrentLot));
                        
                        //clear content of previous Lot cells
                        document.getElementById(previousLots[i].trailerCurrentLot).innerHTML = "";
                        
                        //re-add Lot Id
                        document.getElementById(previousLots[i].trailerCurrentLot).innerHTML = '<span>' + previousLots[i].trailerCurrentLot + '</span>';
                        
                  }
               }
               
               //populate table
               for (var i = 0; i < obj.input.length; i++) {
                  
                  var cell = document.getElementById(obj.input[i].trailerCurrentLot);
                  console.log(cell);
                  
                  //contains span lot id
                  if (cell.children[0]) {
                       cell.children[0].style.display = "none";
                  }

                  var div = document.createElement('div');
                  div.id = obj.input[i].trailerKey;
                  div.setAttribute("draggable", "true");
                  div.setAttribute("class", "trailer grey");
                  div.innerHTML =  '<i class="fa fa-arrow-left" style="font-size:24px;color:black;float:left;"></i>' +
                        '<i class="fa fa-clock-o" style="font-size:24px;color:red;"></i>' +
                        '<i class="fa fa-calendar-check-o" style="font-size:24px;color:green; float: right;"></i>' +
                        '<span class="tooltiptext">ID: ' + obj.input[i].trailerKey + ', Name: ' + obj.input[i].trailerName + ', LotID: ' + obj.input[i].trailerCurrentLot + '</span>';
                  div.ondragstart = function(ev) {
                      drag(ev, this.parentElement.id);
                  }
                  
                 //if currentCell on tableTop, rotate tooltiptext
                 if (cell.closest('table').id === tableTopId) {
                    //console.log(div); 
                    div.children[3].className += " rotated";
                 }
                  
                  cell.appendChild(div);
               }
               
               this.oldInputValue = JSON.stringify(obj.input);
               
            } 
            
            this.firstCall = false;
            
      } catch (e) {

        console.log(e);

      }
         
      }

   }

};