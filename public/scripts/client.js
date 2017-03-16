var app = angular.module("sampleApp", ["firebase", 'ngRoute']);




// var myApp = angular.module('myApp', ['ngRoute']);
//
// console.log('angular working');
//
app.config(['$routeProvider', function($routeProvider) {
  console.log('routes are doing good');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: 'HomeController',
      controllerAs: 'hc'
    })
    .when('/secrets', {
      templateUrl: '/views/secrets.html',
      controller: 'SecretsController',
      controllerAs: 'sec'
    })
    .otherwise({
      redirectTo: 'home'
    })
}]);//end of myApp

app.controller("SampleCtrl", function($firebaseAuth, $http) {
  console.log("sample controller");
  var auth = $firebaseAuth();
  var self = this;

  // This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code
  auth.$onAuthStateChanged(function(firebaseUser){
    console.log("auth is doing stuff");
    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        console.log("client.js line 27");
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.secretData = response.data;
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }

  });

  // This code runs when the user logs out
  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };
});
