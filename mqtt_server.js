var mqtt = require('mqtt');
const MQTT_SERVER = "54.191.199.50";
const MQTT_PORT = "1883";
//if your server don't have username and password let blank.
const MQTT_USER = "phusit"; 
const MQTT_PASSWORD = "Password123#@!";
const MQTT_SUB = ["server/#"]

// Connect MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});

client.on('connect', function () {
    // Subscribe any topic
    console.log(`Connect MQTT user ${MQTT_USER}`);
    // client.
    client.subscribe(MQTT_SUB, function (err) {
        if (err) {
            console.log(err);
        }
    });
});

client.on('connect', function () {
    // Subscribe any topic
    console.log("MQTT Connect");
    client.subscribe('server/mcu01', function (err) {
    console.log
        if (err) {
            console.log(err);
        }
    });
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
});

setInterval(() => {
    // Sender Message
    client.publish("client/mcu01", 
    `{
        "sensor": "A",
        "status": "off"
    }`, { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
    })

}, 5000);

setInterval(() => {
    // Sender Message
    client.publish("client/mcu02", 
    `{
        "sensor": "B",
        "status": "on"
    }`
    , { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
    })

}, 5000);
///kuy
///511

setInterval(() => {
    // Sender Message
    client.publish("client/mcu*", 
    `{
        "sensor": "AB",
        "status": "on"
    }`
    , { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
    })

}, 5000);