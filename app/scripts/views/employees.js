/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.EmployeesView = Backbone.View.extend({

        initialize: function() {
          // TODO: Filter this to one company_id => the user's company id or the company the admin is viewing
          this.collection = new bridgelyApp.Collections.EmployeesCollection(),

          this.listenTo(this.collection, "change add", this.render);

          this.collection.fetch();
        },
        columns: [{
            name: 'selected',
            label: '',
            cell: 'boolean',
            sortable: false,
            editable: false,
          }, {
            name: "name",
            label: "Name",
            cell: "string",
            editable: false
          }, {
            name: "phone",
            label: "Phone",
            cell: "string",
            editable: false
          }, {
            name: "data",
            label: "Tags",
            cell: "string",
            editable: false,
            sortable: false
        }],
        employeesGrid: function() {
          return new Backgrid.Grid({
            className: 'table table-hover table-condensed backgrid',
            columns: this.columns,
            collection: this.collection
          })
        },
        render: function() {

          // Initialize the paginator
          var paginator = new Backgrid.Extension.Paginator({
            collection: this.collection
          });

          var $sendButton = $('<a href="#message" />').text(' Send SMS Message').prepend($('<span class="glyphicon glyphicon-send" />')).addClass('btn btn-lg btn-primary');

          var $layout = $('<div class=backgrid-container />').append(
            this.employeesGrid().render().$el
            .add( paginator.render().$el )
            .add( $sendButton )
          )
          this.$el.html( $layout );
          $('#content').html( this.el );
          return this.el;

        }


    });

})();
