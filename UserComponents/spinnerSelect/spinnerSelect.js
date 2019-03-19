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
		return ('<ion-nav-view></ion-nav-view> <script id="main.html" type="text/ng-template"> <ion-view view-title="Main"> <ion-content> <div>Selected: {{data.month}}</div> <div style="width:200px; background-color:#eee"> <select-wheel ng-model="data.month" item-height="50" amplitude="2" options="monthOptions"></select-wheel> </div> </ion-content> </ion-view> </script> <script id="select-wheel.html" type="text/ng-template"> <div class="select-wheel"> <div class="select-wheel-sel"></div> <ion-scroll zooming="false" on-refresh="onRefresh()" on-scroll="onScroll(event, scrollTop)" direction="y" scrollbar-y="false"> <div class="select-wheel-list"> <div class="select-wheel-item"> </div> <div class="select-wheel-item" ng-repeat="option in options"> <div ng-class="{\'active\': $index === index}" data-value="option.value">{{option.label}}</div> </div> <div class="select-wheel-item"> </div> </div> </ion-scroll> </div> </script>');
	},
	
	onFormReady : function () {

      $('ion-nav-view').after('<script>"use strict"; angular.module("ionicApp", ["ionic"]) .directive("selectWheel", function($ionicScrollDelegate, $ionicGesture, $window, $timeout) { return { restrict: "E", scope: { itemHeight: "@", amplitude: "@", ngModel: "=", options: "=", index: "=" }, templateUrl: "select-wheel.html", compile: function(element) { var id = "handle-" + Math.random(); element.find("ion-scroll").attr("delegate-handle", id); return function(scope, element) { var _fixed = true, _touched = false, scrollHandle = $ionicScrollDelegate.$getByHandle(id); scope.itemHeight = scope.itemHeight || 50; scope.amplitude = scope.amplitude || 5; scope.index = 0; var resize = function() { scrollHandle.scrollTo(0, scope.index * scope.itemHeight); }; scope.onScroll = function(event, scrollTop) { scrollTop = Math.round(scrollTop); var height = scope.itemHeight, amplitude = scope.amplitude, remainder = scrollTop % height, distance, nearestPos, middle = Math.floor(height / 2), index, minDist = middle - amplitude; if (remainder > middle) { distance = height - remainder; nearestPos = scrollTop + distance; index = Math.floor(scrollTop / height) + 1; } else { distance = remainder; nearestPos = scrollTop - distance; index = Math.floor(scrollTop / height); } if (!_touched && !_fixed) { scrollHandle.scrollTo(0, nearestPos); _fixed = true; scope.index = index; scope.$apply(function() { scope.ngModel = scope.options[index].value; }); } }; angular.element($window).bind("resize", resize); var unWatchModel = scope.$watch("ngModel", function(newVal) { if (newVal && newVal.value) { for (var i = 0, len = scope.options.length; i < len; ++i) { if (scope.options[i].value == scope.ngModel) { scope.index = i; } } } }); $ionicGesture.on("touch", function() { _touched = true; _fixed = false; }, element, {}); $ionicGesture.on("release", function() { _touched = false; }, element, {}); scope.$on("destroy", function() { $ionicGesture.off("touch", element); $ionicGesture.off("release", element); angular.element($window).off("resize", resize); unWatchModel(); }); resize(); }; }, }; }) .config(function($stateProvider, $urlRouterProvider) { $stateProvider .state("main", { url: "/home", templateUrl: "main.html", controller: "MainCtrl" }); $urlRouterProvider.otherwise("/home"); }) .controller("MainCtrl", function($scope) { $scope.data = {}; $scope.data.month = "march"; $scope.monthOptions = [{ label: "Jan", value: "january" }, { label: "Fev", value: "february" }, { label: "Mar", value: "march" }, { label: "Apr", value: "april" }, { label: "May", value: "may" }, { label: "Jun", value: "june" }, { label: "Jul", value: "july" }, { label: "Aug", value: "august" }, { label: "Sep", value: "september" }, { label: "Oct", value: "october" }, { label: "Nov", value: "november" }, { label: "Dec", value: "december" }]; });angular.element(function() { angular.bootstrap(document, ["ionicApp"]); });</script>');
      this.context.getList(function(list) {
         console.log(list);
      });
	},

  onValueChanged : function(newVal) {

  }

};
