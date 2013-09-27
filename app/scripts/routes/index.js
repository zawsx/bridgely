/*global bridgelyApp, Backbone*/

bridgelyApp.Routers = bridgelyApp.Routers || {};

(function () {
    'use strict';

    bridgelyApp.Routers.IndexRouter = Backbone.Router.extend({
      routes: {
        '' : 'index',
        'settings' : 'settings'
        // '*catch' : 'index'
      },
      index: function() {
        console.log('index route!!');
        $('body').html(bridgelyApp.appView.render())
      },
      settings: function() {
        console.log('settings route!!');
      }

    });

})();
