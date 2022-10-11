// var firebase = require('firebase')

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// var firebaseConfig = {
//   apiKey: "AIzaSyCXC7ox7q4tS3uvVzzkIc-xLO7MG2XoP_U",
//   authDomain: "egg-project-f7924.firebaseapp.com",
//   projectId: "egg-project-f7924",
//   storageBucket: "egg-project-f7924.appspot.com",
//   messagingSenderId: "463061130784",
//   appId: "1:463061130784:web:8fd0ac2054327566556645",
//   measurementId: "G-GV3S7LVRDR"
// };

// firebase.initializeApp(firebaseConfig)
// let database = firebase.database()

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// database.ref("customPath").set(obj, function(error) {
//     if (error) {
//       // The write failed...
//       console.log("Failed with error: " + error)
//     } else {
//       // The write was successful...
//       console.log("success")
//     }
// })

// database.ref('customPath').once('value')
// .then(function(snapshot) {
//     console.log( snapshot.val() )
// })