MG.app.UserComponent.define({
	name : "googleAnalytics",
	factory : function (init, context) {
		return new googleAnalytics(init, context);
	}
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

googleAnalytics = function (init, context) {
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

googleAnalytics.prototype = {

	getHtml : function(){
      console.log("getHTML");
      return '<div id="ga-container"><div class="column" id="' + this.id + '"></div><div class="column" id="' + this.id + "1" + '"></div><div class="column" id="' + this.id + "2" + '"></div></div>';
	},

	onFormReady : function(){
      console.log("onformready");

      var id = this.id;
      var ga_uid = this.init;
      var head = document.getElementsByTagName('head')[0];

      //insert GA tracking code
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.init;
      script.async = true;

      var secondScript = document.createElement('script');
      secondScript.type = 'text/javascript';
      secondScript.appendChild(document.createTextNode("window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '" + this.init + "');"));

      setTimeout(function() {
         ga('create', ga_uid);
      }, 500);

      //insert GA embed code
      var gaEmbedScript = document.createElement('script');
      gaEmbedScript.type = 'text/javascript';
      gaEmbedScript.appendChild(document.createTextNode("(function(w,d,s,g,js,fjs){ g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(cb){this.q.push(cb)}}; js=d.createElement(s);fjs=d.getElementsByTagName(s)[0]; js.src='https://apis.google.com/js/platform.js'; fjs.parentNode.insertBefore(js,fjs);js.onload=function(){g.load('analytics')}; }(window,document,'script'));"));

      head.prepend(script);
      head.prepend(secondScript);
      head.prepend(gaEmbedScript);

      //insert element containers
      var section1 = document.createElement('section');
      section1.id = "auth-button";

      var section2 = document.createElement('section');
      section2.id = "view-selector";

      var section3 = document.createElement('section');
      section3.id = "timeline";

      var section4 = document.createElement('section');
      section4.id = "view-selector-2";

      var section5 = document.createElement('section');
      section5.id = "dataTable";

      var section6 = document.createElement('section');
      section6.id = "view-selector-3";

      var section7 = document.createElement('section');
      section7.id = "geolocation";

      document.getElementById(id).appendChild(section1);
      document.getElementById(id).appendChild(section2);
      document.getElementById(id).appendChild(section3);

      document.getElementById(id + "1").appendChild(section4);
      document.getElementById(id + "1").appendChild(section5);

      document.getElementById(id + "2").appendChild(section6);
      document.getElementById(id + "2").appendChild(section7);

      //GA track button click
      document.getElementsByClassName("mgThemeClass_testButton")[0].childNodes[0].addEventListener("click", function() {
         console.log("button clicked");
         ga('send', 'event', 'Form', 'button click', 'testButton');
      });


      gapi.analytics.ready(function() {

        // Step 3: Authorize the user.

        var CLIENT_ID = '872189167290-kks5n34ti01o932a5tk98l11ghhaohb0.apps.googleusercontent.com';

        gapi.analytics.auth.authorize({
          container: 'auth-button',
          clientid: CLIENT_ID,
        });

        // Step 4: Create the view selector.

        var viewSelector1 = new gapi.analytics.ViewSelector({
          container: 'view-selector'
        });

        var viewSelector2 = new gapi.analytics.ViewSelector({
          container: 'view-selector-2'
        });

        var viewSelector3 = new gapi.analytics.ViewSelector({
          container: 'view-selector-3'
        });

        // Step 5: Create the timeline chart.

        var dataChart1 = new gapi.analytics.googleCharts.DataChart({
          reportType: 'ga',
          query: {
            'dimensions': 'ga:date',
            'metrics': 'ga:sessions',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
          },
          chart: {
            type: 'LINE',
            container: 'timeline'
          }
        });

        var dataChart2 = new gapi.analytics.googleCharts.DataChart({
          reportType: 'ga',
          query: {
            'dimensions': 'ga:date',
            'metrics': 'ga:sessions,ga:avgSessionDuration',
            'start-date': '7daysAgo',
            'end-date': 'yesterday',
            'ids': "ga:178932900"
          },
          chart: {
            type: 'TABLE',
            container: 'dataTable'
          }
        });

        var dataChart3 = new gapi.analytics.googleCharts.DataChart({
          reportType: 'ga',
          query: {
            'dimensions': 'ga:country',
            'metrics': 'ga:sessions',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
          },
          chart: {
            type: 'GEO',
            container: 'geolocation',
            options: {
              displayMode: 'markers'
            }
          }
        });

        // Step 6: Hook up the components to work together.

        gapi.analytics.auth.on('success', function(response) {
          viewSelector1.execute();
          viewSelector2.execute();
          viewSelector3.execute();
          //dataChart3.execute();
        });

        viewSelector1.on('change', function(ids) {
          dataChart1.set({query: {ids: ids}}).execute();
        });

        viewSelector2.on('change', function(ids) {
          dataChart2.set({query: {ids: ids}}).execute();
        });

        viewSelector3.on('change', function(ids) {
          dataChart3.set({query: {ids: ids}}).execute();
        });
      });
	},

   onValueChanged : function(newVal) {
      console.log("onvaluechanged");

   }


};
