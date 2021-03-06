/*global bridgelyApp, Backbone, JST*/

bridgelyApp.Views = bridgelyApp.Views || {};

(function () {
    'use strict';

    bridgelyApp.Views.newQuestionView = Backbone.View.extend({

        template: JST['app/scripts/templates/newQuestion.ejs'],
        el: $('<form />'),

        render: function() {
          this.delegateEvents();
          this.$el.html( this.template );
          $('#content').html( this.el );
          this.$("textarea").limiter(160, $("#chars"));

          if( !bridgelyApp.session.get('company') ) {
            this.$('button[type=submit]').prop('disabled', true).text('Select a company first...');
          }

          return this.el;
        },
        events: {
          'submit' : 'sendQuestion',
          'click #success-button' : 'next',
          'click .cancel' : 'cancel'
        },
        sendQuestion: function(event) {
          event.preventDefault();
          this.$('button[type=submit]').prop('disabled', true);

          var recipients = bridgelyApp.session.get('new_message_employee_ids');
          if( recipients !== 'all' ) {
            recipients = recipients.join();
          }

          $.ajax({
            type: 'POST',
            url: bridgelyApp.apiUrl + '/questions',
            data: {
              question: {
                title: this.$('#question-title').val(),
                response_tag: this.$('#question-title').val(),
                message: {
                  body: this.$('textarea').val(),
                  employee_ids: recipients,
                  company_id: bridgelyApp.session.get('company').id
                }
              }
            },
            success: function() {
              console.log('question sent successfully')
              bridgelyApp.session.resetNewMessageEmployeeIds();
              $('#successModal').modal({
                backdrop: 'static',
                keyboard: false
              });
            },
            error: function() {
              //TODO: Error screen
              console.log('question send failed!!')
              bridgelyApp.session.resetNewMessageEmployeeIds();
            }
          })
        },
        next: function() {
          this.$('#successModal').on('hidden.bs.modal', function () {
            bridgelyApp.MessageRouter.navigate('message-history', {trigger: true});
          })
          this.$('#successModal').modal('hide');
        },
        cancel: function() {
          event.preventDefault();
          bridgelyApp.DirectoryRouter.navigate('directory',{trigger:true});
        }
    });

})();
