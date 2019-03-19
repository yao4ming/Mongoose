MG.app.UserComponent.define({
  name : "spinnerSelectYJ",
  factory : function (init, context) {
    return new spinnerSelectYJ(init, context);
  }
});

spinnerSelectYJ = function (init, context) {
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

spinnerSelectYJ.prototype = {
  
   getHtml : function () {
    return ('<div id="ionicApp' + this.id + '"><ion-nav-view></ion-nav-view><script id="main.html" type="text/ng-template"> <ion-view view-title="Main"> <ion-content> <div>Selected: {{data.month}}</div> <div style="width:200px; background-color:#eee"> <select-wheel id="' + this.id +'" ng-model="data.month" item-height="50" amplitude="2" options="dataOptions" index="index"></select-wheel> </div> </ion-content> </ion-view> </script> <script id="select-wheel.html" type="text/ng-template"> <div class="select-wheel"> <div class="select-wheel-sel"></div> <ion-scroll zooming="false" on-refresh="onRefresh()" on-scroll="onScroll(event, scrollTop)" direction="y" scrollbar-y="false"> <div class="select-wheel-list"> <div class="select-wheel-item"> </div> <div class="select-wheel-item" ng-repeat="option in options"> <div ng-class="{\'active\': $index === index}" data-value="option">{{option}}</div> </div> <div class="select-wheel-item"> </div> </div> </ion-scroll> </div> </script></div>');
  },
  
  onFormReady : function () {
      
      var ctx = this.context;
      var id = this.id;
      initAngular(this.id);
      
      //angular needs a sec to init
      setTimeout(function() {
         ctx.getList(function(list) {
            angular.element($('#' + id)).scope().dataOptions = list;
            angular.element($('#' + id)).scope().$apply();
            angular.element($('#' + id)).scope().$watch('data.month', function(newVal, oldVal) {
               ctx.setValue(newVal);
            });
         });
         
      }, 300);
      
  },

  onValueChanged : function(newVal) {
  
   //var id = this.id;
   //var ctx = this.context;
   
   //make sure angular is initialized
   //if (angular.element($('#' + id)).scope()) {
   //   ctx.getList(function(list) {
   //      for (var i = 0; i < list.length; i++) {
   //         if (newVal === list[i]) {
   //            angular.element($('#' + id)).scope().scrollTo(i, newVal);
   //            angular.element($('#' + id)).scope().$apply();
   //         }
   //      }
   //   });   
   //}
   
  } 

};
