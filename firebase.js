
/*----------------------------------------part1----------------------------------------*/
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKEY.json");
const { query } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://egg-project-f7924-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();


delete documents
db.collection("Cutomer").doc("0").delete().then(res => {
    console.log("document deleted succrsffuly")
});



