var mqtt = require('mqtt');
const MQTT_SERVER = "192.168.31.200";
const MQTT_PORT = "1883";
//if your server don't have username and password let blank.
const MQTT_USER = "server"; 
const MQTT_PASSWORD = "server";
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


// Receive Message and print on terminal
client.on('message', function (topic, message) {
    // message is Buffer
    // console.log("topic : ", topic)
    if(topic === "server/mcu01" ){
        console.log("is server/mcu01 ....")
        var payload = JSON.parse(message.toString())
        console.log(payload)
    } else{
        console.log("is server/mcu02 ....")
        var payload = JSON.parse(message.toString())
        console.log(payload)
    }
}, 5000);


setInterval(() => {
    // Sender Message
    client.publish("client/mcu01", 
    `{
        "sensor": "AA",
        "status": "OOFF"
    }`
    , { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
    })

}, 5000);