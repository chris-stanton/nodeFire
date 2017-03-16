app.controller('HomeController', function($firebaseAuth, $http){
  console.log("home controller is running!");
  var self = this;
  var auth = $firebaseAuth();
  self.newMessage = {};
  self.testMessage = "home controller working!";
  //self.secretObject = {};


  //button will trigger this function
  self.sendNewMessage = function (secretObject){
    console.log(self.newMessage);
    auth.$onAuthStateChanged(function(firebaseUser){
      firebaseUser.getToken().then(function(idToken){
        console.log("auth is doing stuff");
        // firebaseUser will be null if not logged in
        if(firebaseUser) {
          // This is where we make our call to our server
          console.log("authPost token");
          $http({
            method: 'POST',
            url: '/privateData',
            data: secretObject,
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            self.newMessage = response.data;
            console.log(".then");
          });
        } else {
          console.log('Not logged in or not authorized.');
          //self.newMessage = [];
        }
      });//end of firebaseUser.getToken()
    });
  }//end of self.someTrigger
});//end of app.controller
