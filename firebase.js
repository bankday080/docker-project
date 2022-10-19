var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKEY.json");
const { query } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://egg-project-f7924-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

