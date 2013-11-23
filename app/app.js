
/**
 * ------------------------------------------------------------------------
 * Main Application Module
 * ------------------------------------------------------------------------
 */

angular.module("AngularFireChat", ['firebase'])

  // Chat Controller
  .controller('ChatCtrl', function($scope, angularFire) {

    // Define basic model for messaging.
    $scope.chat = {
      messages: []
    };

    // New message.
    $scope.message = null;

    // Message broadcasting.
    $scope.talk = function() {
      if ($scope.message) {
        $scope.chat.messages.push({
          time: (new Date()).getTime(),
          text: $scope.message
        });
        $scope.message = null;  
      }
    }

    // Firebase source.
    var ref = new Firebase("https://angularfire-chat.firebaseio.com/chat");

    // Bind the variable "chat" of $scope to the reference.
    angularFire(ref, $scope, 'chat');

  })

  // Simple reverse filter for repeats.
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })

  // Simple date parser
  .filter('parseDate', function() {
    return function(value) {
      var date = new Date(value);

      return  ('00' + date.getUTCHours()).slice(-2) + ':' + 
              ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
              ('00' + date.getUTCSeconds()).slice(-2);
    }
  });