app.controller('SecretsController', function($firebaseAuth, $http){
  console.log("secrets controller is running!");
  var self = this;
  var auth = $firebaseAuth();
  self.newMessage = {};
  self.testMessage = "secrets home controller working!";

});
