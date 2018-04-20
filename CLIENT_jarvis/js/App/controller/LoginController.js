angular.module('myApp')

    .controller('login', function($scope, $http, $window, $rootScope, $cookieStore, $location) {

      console.log("controller login charge");
      $scope.tryToLogin = function(email, password) {
        console.log(email, password);

        var link = 'http://localhost:8000/authentification/profiles';

        $http({
          method: 'POST',
          url: link,
          data: {
            email: email,
            password: password
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log(data.data['message'],'ddddd');
          if (data.data['message'] == 'false') {
            console.log('echouer');
            return false;
          }
          console.log('succes', data);
          var myId = data.data['Id'];
          $cookieStore.put('myId', myId);
          $window.localStorage.setItem('myId',myId);
          console.log(myId);
          $location.path("/dashboard");
        }, function errorCallback(error) {
          console.log('error', error);
        });
      };
    });