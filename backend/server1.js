var firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyD_zTHNTeAlwzSEFe370QLMLKmuwslHTtg",
  authDomain: "inclubator-7dcb5.firebaseapp.com",
  databaseURL: "https://inclubator-7dcb5-default-rtdb.firebaseio.com",
  projectId: "inclubator-7dcb5",
  storageBucket: "inclubator-7dcb5.appspot.com",
  messagingSenderId: "64537825910",
  appId: "1:64537825910:web:df698cee4f1525eef34557",
  measurementId: "G-RS2REGP3YX"
};

// const app2 = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app2);

const express = require("express");
// const chalk = require('chalk');
const debug = require("debug")("app");
const app = express();
var bodyParser = require("body-parser");
var mqtt = require("mqtt");
// const { default: chalk } = require("chalk");
// const port = 3000;

// + chalk.red(" : "+port)

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
/*   client.publish("client1/mcu01", data, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });

  res.status(201);
  res.json({
    status: 200,
    data: "publish OK ...",
    debug: data,
  }); */
});

app.post("/setting/temp", (req, res) => {
  const data = JSON.stringify({
    sensor: req.body.sensor,
    status: req.body.status,
  });
  console.log("Ok001",req.body);
  client.publish("client1/mcu01",data, { qos: 0, retain: false }, (error) => {
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

app.post("/setting/humid", (req, res) => {
  const data = JSON.stringify({
    sensor: req.body.sensor,
    status: req.body.status,
  });
  console.log("Ok001",req.body);
  client.publish("client1/mcu02",data, { qos: 0, retain: false }, (error) => {
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

app.post("/setting/turn", (req, res) => {
  const data = JSON.stringify({
    sensor: req.body.sensor,
    status: req.body.status,
  });
  console.log("Ok001",req.body);
  client.publish("client1/mcu03",data, { qos: 0, retain: false }, (error) => {
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

app.post("/setting/start", (req, res) => {
  const data = JSON.stringify({
    sensor: req.body.sensor,
    status: req.body.status,
  });
  console.log("Ok001",req.body);
  client.publish("client1/mcu04",data, { qos: 0, retain: false }, (error) => {
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

app.post("/setting/number", (req, res) => {
  const data = JSON.stringify({
    sensor: req.body.sensor,
    status: req.body.status,
  });
  console.log("Ok001",req.body);
  client.publish("client1/mcu05",data, { qos: 0, retain: false }, (error) => {
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



/* app.put("/setting/:sensor", (req, res) => {
  const data = JSON.stringify({
    sensor: req.params.sensor,
    status: req.body.status,
  });
  client.publish("client1/mcu01",`{
    
      "sensor": "AA",
      "status": "OOFF"
  
  }`, data, { qos: 0, retain: false }, (error) => {
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
}); */


app.listen(3000, () => {
  console.log("Start server at port 3000." );
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

      database.ref("internal/").set(payload, function (error) {
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
