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

     //make sure to set the currentCell to be td and not the div containing the lotid
     if (ev.target.outerHTML.includes("td")) {
        currentCell = ev.target;
     } else if (ev.target.outerHTML.includes("div")) {
        currentCell = ev.target.parentElement;
     } else {
        console.log("You have dragged to an unsupported area");
        console.log(ev.target);
     }
     //console.log(currentTrailer);
     //console.log(currentCell);
     //console.log(prevCell);
     currentCell.appendChild(currentTrailer);

     if (currentCell.closest('table').className !== 'tableTop') {
        currentTrailer.children[0].className = "trailerTypeStatus";
        currentTrailer.children[1].className += " trailerServiceStatus";
        currentTrailer.children[2].className = "trailerStatus";
     } else {
        console.log("in tableTop");
        currentTrailer.children[0].className = "";
        currentTrailer.children[1].className = currentTrailer.children[1].className.replace("trailerServiceStatus", "");
        currentTrailer.children[2].className = "";
     }

     //unhide lot id of previous cell
     prevCell.children[0].style.display = 'block';

      //hide Lot Id of current cell
     currentCell.children[0].style.display = "none";

     //update tooltip lot id
     var spanCurrentLot = currentTrailer.children[3].innerHTML.split(",")[2].split(":")[1].trim();
     currentTrailer.children[3].innerHTML = currentTrailer.children[3].innerHTML.replace(spanCurrentLot, currentCell.id);

     var obj = JSON.parse(ctx.userComp.startValue);
     //console.log(obj);

     //get index of output for current trailer
     function checkTrailerKey(trailer) {
        //console.log(trailer.trailerKey + "=" + currentTrailer.id);
        return trailer.trailerKey === currentTrailer.id;
     }

     //update output lot id to mongoose
     var index = obj.output.findIndex(checkTrailerKey);
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

              //only one row for tableTop
              var tableTopRow = tableTop.insertRow(0);

              for (var i = 0; i < numRows; i++) {

                 var tableTopCell = tableTopRow.insertCell(0);
                 tableTopCell.id = "SHIPDOOR1" + i;
                 tableTopCell.innerHTML = '<div class="topLot">SHIPDOOR1' + i + '</div>';
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
                 table1Cell.innerHTML = "<div>SHIPDOOR0" + i + "</div>";
                 table1Cell.setAttribute("ondragover", "allowDrop(event)");
                 table1Cell.ondrop = function(ev) {
                    drop(ev, ctx);
                 }

                 var table2Row = table2.insertRow(i);

                 var table2Cell0 = table2Row.insertCell(0);
                 table2Cell0.id = "YARD0" + i +"-A";
                 table2Cell0.innerHTML = "<div>YARD0" + i +"-A</div>";
                 table2Cell0.setAttribute("ondragover", "allowDrop(event)");
                 table2Cell0.ondrop =  function(ev) {
                    drop(ev, ctx);
                 }

                 var table2Cell1 = table2Row.insertCell(1);
                 table2Cell1.id = "YARD0" + i +"-B";
                 table2Cell1.innerHTML = "<div>YARD0" + i +"-B</div>";
                 table2Cell1.setAttribute("ondragover", "allowDrop(event)");
                 table2Cell1.ondrop =  function(ev) {
                    drop(ev, ctx);
                 }

              }
           }

       var obj = JSON.parse(newVal);
           console.log(obj);
           //console.log(JSON.stringify(obj.input));
           //console.log(this.oldInputValue);

           //if mongoose backend has updated, update UI
           if (JSON.stringify(obj.input) !== this.oldInputValue) {
              console.log("update grid");

              if (!this.firstCall) {
                 console.log("not first call");
                 //unhide lot id of previously filled lots
                 var previousLots = JSON.parse(ctx.userComp.startValue).output;
                 console.log(previousLots);

                 for (var i = 0; i < previousLots.length; i++) {
                       //console.log(previousLots[i].trailerCurrentLot);
                       //console.log(document.getElementById(previousLots[i].trailerCurrentLot));

                       //clear content of previous Lot cells
                       document.getElementById(previousLots[i].trailerCurrentLot).innerHTML = "";

                       //re-add Lot Id
                       document.getElementById(previousLots[i].trailerCurrentLot).innerHTML = '<div>' + previousLots[i].trailerCurrentLot + '</div>';

                 }
              }

              //populate table
              for (var i = 0; i < obj.input.length; i++) {

                 var cell = document.getElementById(obj.input[i].trailerCurrentLot);
                 //console.log(cell);

                 //contains span lot id
                 if (cell.children[0]) {
                      cell.children[0].style.display = "none";
                 }

                 var div = document.createElement('div');
                 div.id = obj.input[i].trailerKey;
                 div.setAttribute("draggable", "true");
                 div.setAttribute("class", "trailer");
                 div.ondragstart = function(ev) {
                     drag(ev, this.parentElement.id);
                 }

                 //TRAILER TYPE STATUS
                 var trailerTypeStatus = document.createElement('img');
                 trailerTypeStatus.style.width = "25pt";
                 if (obj.input[i].trailerTypeStatus === "Loaded") {
                    trailerTypeStatus.src = "../WSWebClient/dynamic/metadata/$app/images/Yard_Loaded.png";
                 } else if (obj.input[i].trailerTypeStatus === "Unloaded") {
                    trailerTypeStatus.src = "../WSWebClient/dynamic/metadata/$app/images/Yard_Unloaded.png";
                 } else if (obj.input[i].trailerTypeStatus === "Empty") {
                    trailerTypeStatus.src = "../WSWebClient/dynamic/metadata/$app/images/Yard_Empty.png";
                 } else {
                    console.log("Invalid trailerTypeStatus - " + obj.input[i].trailerTypeStatus);
                 }

                 //TRAILER SERVICE STATUS
                 var trailerServiceStatus = document.createElement('i');
                 trailerServiceStatus.className = "fa fa-clock-o";
                 trailerServiceStatus.style.color = obj.input[i].trailerServiceStatus;

                 //TRAILER STATUS
                 var trailerStatus = document.createElement('img');
                 trailerStatus.style.width = "25pt";
                 if (obj.input[i].trailerStatus === "Pending Move") {
                    trailerStatus.src = "../WSWebClient/dynamic/metadata/$app/images/Yard_MovePending.png";
                 }

                 //ADD STYLES FOR TRAILERS NOT IN TOP LOT
                 if (cell.closest('table').className !== 'tableTop') {
                    trailerTypeStatus.className = "trailerTypeStatus";
                    trailerServiceStatus.className += " trailerServiceStatus";
                    trailerStatus.className = "trailerStatus";
                 }

                 //TOOLTIP
                 var toolTip = document.createElement('span');
                 toolTip.className = "tooltiptext";
                 toolTip.innerHTML = 'ID: ' + obj.input[i].trailerKey + ', Name: ' + obj.input[i].trailerName + ', LotID: ' + obj.input[i].trailerCurrentLot;

                 div.appendChild(trailerTypeStatus);
                 div.appendChild(trailerServiceStatus);
                 div.appendChild(trailerStatus);
                 div.appendChild(toolTip);

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
