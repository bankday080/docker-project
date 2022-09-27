var mqtt = require('mqtt');
const MQTT_SERVER = "127.0.0.1";
const MQTT_PORT = "1883";
//if your sercer dont have username and password let blank
const MQTT_USER = "client";
const MQTT_PASSWORD = "client";
const MQTT_SUB = ["client/mcu01"];

// conmect MQTT
var client = mqtt.connect({
  host: MQTT_SERVER,
  port: MQTT_PORT,
  username: MQTT_USER,
  password: MQTT_PASSWORD,
});

client.on('connect', function () {
  // subcribe any topic
  console.log('Connect MQTT user ${MQTT_USER}');
  //client.
  client.subscribe(MQTT_SUB, function (err) {
    if (err) {
      console.log(err);
    }
  });
});

// Receive Message and print on terminal
client.on('message', function (topic, message) {
  //message is Buffer
  console.log("topic : ", topic);
  console.log("message: ", message.toString());
});

// client/mcu01,
// client/mcu02,

setInterval(() => {
  // sender Message
  // client.publish("receiver-01", "hello from sender-01");
  client.subscribe(
    "client/mcu01",
    `hello from ${MQTT_USER}`,
    { qos: 0, retain: false },
    (error) => {
      if (error) {
        console.error(error)
      }
    }
  );
}, 1000);

setInterval(() => {
  // sender Message
  // client.publish("receiver-01", "hello from sender-01");
  client.subscribe(
    "client/mcu02",
    `hello from ${MQTT_USER}`,
    { qos: 0, retain: false },
    (error) => {
      if (error) {
        console.error(error)
      }
    }
  );
}, 2000);

setInterval(() => {
    // sender Message
    // client.publish("receiver-01", "hello from sender-01");
    client.subscribe(
      "client/mcu*",
      `hello from ${MQTT_USER}`,
      { qos: 0, retain: false },
      (error) => {
        if (error) {
          console.error(error)
        }
      }
    );
  }, 2000);
