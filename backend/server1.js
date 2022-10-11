// import { db } from "..firebase/";
// import { uid } from "uid";

var firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCXC7ox7q4tS3uvVzzkIc-xLO7MG2XoP_U",
  authDomain: "egg-project-f7924.firebaseapp.com",
  databaseURL:
    "https://egg-project-f7924-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "egg-project-f7924",
  storageBucket: "egg-project-f7924.appspot.com",
  messagingSenderId: "463061130784",
  appId: "1:463061130784:web:8fd0ac2054327566556645",
  measurementId: "G-GV3S7LVRDR",
};

// const app2 = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app2);

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var mqtt = require("mqtt");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var client = mqttClient();

app.get("/", (req, res) => {
  if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig);
  }

  let database = firebase.database();
  database.ref("/").set({ temp: 50 }, function (error) {
    if (error) {
      // The write failed...
      console.log("Failed with error: " + error);
    } else {
      // The write was successful...
      console.log("success");
    }
  });
  const data = JSON.stringify({
    sensor: req.body.sensor,
    status: req.body.status,
  });
  client.publish("client1/mcu01", data, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });

  res.status(201);
  res.json({
    status: 200,
    data: "publish OK ...",
    debug: data,
  });
});

app.post("/setting/", (req, res) => {
  const data = JSON.stringify({
    sensor: req.body.sensor,
    status: req.body.status,
  });
  client.publish("client1/mcu01", data, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });

  res.status(201);
  res.json({
    status: 200,
    data: "publish OK ...",
    debug: data,
  });
});

app.post("/setting/off", (req, res) => {
  const data = JSON.stringify({
    sensor: req.body.sensor,
    status: req.body.status,
  });
  client.publish("client1/mcu02", data, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });

  res.status(201);
  res.json({
    status: 200,
    data: "publish OK ...",
    debug: data,
  });
});

app.put("/setting/:sensor", (req, res) => {
  const data = JSON.stringify({
    sensor: req.params.sensor,
    status: req.body.status,
  });
  client.publish("client1/mcu01", data, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });

  res.status(201);
  res.json({
    status: 200,
    data: "publish OK ...",
    debug: data,
  });
});

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});

function mqttClient() {
  const MQTT_SERVER = "192.168.31.200";
  const MQTT_PORT = "1883";
  //if your server don't have username and password let blank.
  const MQTT_USER = "bank";
  const MQTT_PASSWORD = "password";
  const MQTT_SUB = ["server1/#"];

  var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD,
  });

  client.on("connect", function () {
    // Subscribe any topic
    console.log(`Connect MQTT user ${MQTT_USER}`);
    // client.
    client.subscribe(MQTT_SUB, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });

  // Receive Message and print on terminal
  client.on("message", function (topic, message) {
    // message is Buffer
    // console.log("topic : ", topic)

    if (firebase.apps.length == 0) {
      firebase.initializeApp(firebaseConfig);
    }

    let database = firebase.database();

    if (topic === "server1/mcu01") {
      console.log("Internal ");
      var payload = JSON.parse(message.toString());
      console.log(payload);

      database.ref("internal").set(payload, function (error) {
        if (error) {
          // The write failed...
          console.log("Failed with error: " + error);
        } else {
          // The write was successful...
          console.log("success");
        }
      });
    } else {
      console.log("External");
      var payload = JSON.parse(message.toString());
      console.log(payload);
      database.ref("external/").set(payload, function (error) {
        if (error) {
          // The write failed...
          console.log("Failed with error: " + error);
        } else {
          // The write was successful...
          console.log("success");
        }
      });
    }
  });

  return client;
}
