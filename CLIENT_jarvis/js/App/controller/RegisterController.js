angular.module('myApp')

    .controller('register', function($scope, $http, $window, $rootScope) {

      console.log("controller register charge");

      $scope.tryToSignup = function(name, lastname, password, email, file) {
        if (file) {
          var photo = 'data:' + file.filetype + ';base64,' + file.base64;
          var data = { name: name, lastname: lastname, password: password, email: email, photo: photo }
        } else {
          var data = { name: name, lastname: lastname, password: password, email: email }
        }

        // var link = 'http://127.0.0.1:8000/add/users/' + name + '/' + lastname + '/' + password + '/' + email + '/' + photo;

        console.log(data);

        var link = 'http://localhost:8000/add/profiles';
        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });
      };
    });