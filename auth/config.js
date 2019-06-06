var config = {
  apiKey: "AIzaSyDhHwuByDeg-s8QYpdkDlzbg4S9uzv-Yc8",
  authDomain: "flashnotes-test.firebaseapp.com",
  databaseURL: "https://flashnotes-test.firebaseio.com",
  projectId: "flashnotes-test",
  storageBucket: "flashnotes-test.appspot.com",
  messagingSenderId: "902664860264"
};
firebase.initializeApp(config);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

window.addEventListener('DOMContentLoaded', (event) => {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        var user = authResult.user;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        if (isNewUser){
          name = user.displayName;
          email = user.email;
          uid = user.uid;
          var auth_dict = {
            "name": name, "email": email, "uid": uid, "counter": 0
          };
          var db = firebase.firestore();
          db.collection("users").add(auth_dict)
          .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
          console.error("Error adding document: ", error);
          });
        }
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'https://18edir.github.io/edr48.github.io/edr48.github.io-master/interface/homepage.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

});
