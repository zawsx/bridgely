/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.AdminCompaniesView = Backbone.View.extend({
        template: JST['app/scripts/templates/adminCompanies.ejs'],
        initialize: function() {
          this.collection = new bridgelyApp.Collections.AdminCompaniesCollection();
          this.collection.on('sync', function(collection, resp, options) {
            this.render();
          }, this);
          this.collection.fetch();
          this.unloadCompany();
        },
        events: {
          'click .company' : 'loadCompany',
          'click .btn-company' : 'newCompany'
        },
        render: function() {
          this.$el.html( this.template(this.collection.models) );
          $('#content').html( this.el );
          this.delegateEvents();
          return this.el;
        },
        loadCompany: function(event) {
          event.preventDefault();

          // id of the list-item, eg company-45
          var companyLabel = $(event.target).closest('.company')[0].id;
          var companyId = companyLabel.slice( companyLabel.indexOf('-') + 1 )

          $.ajax({
            method: 'GET',
            url: bridgelyApp.apiUrl + '/admin/companies/' + companyId,
            success: function(companyData) {
              bridgelyApp.session.set('company', companyData);
              bridgelyApp.DirectoryRouter.navigate('directory', {trigger: true});
              new bridgelyApp.Views.AdminCompanyTopbar();
              // TODO add a message and back to admin button to the top of the page
            }
          })

        },
        unloadCompany: function() {
          $('#topbar').empty();
          bridgelyApp.session.set('company', null);
        },
        newCompany: function(event) {
          event.preventDefault();
          bridgelyApp.AdminRouter.navigate('admin/companies/new', {trigger: true});
        }
    });

})();
