const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var mqtt = require('mqtt');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var client = mqttClient();


app.get('/', (req,res) => {
   res.json({status: 201, data: "hello ...."})
})

app.post('/setting/', (req,res) => {
   const data = JSON.stringify({sensor: req.body.sensor, status: req.body.status})
   client.publish("client/*", data
   , { qos: 0, retain: false }, (error) => {
       if (error) {
         console.error(error)
       }
   })

   res.status(201);
   res.json({
    status: 200,
    data: "publish OK ...",
    debug: data
   })

})

app.put('/setting/:sensor', (req,res) => {
    const data = JSON.stringify({sensor: req.params.sensor, status: req.body.status})
    client.publish("client/*", data
    , { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
    })
 
    res.status(201);
    res.json({
     status: 200,
     data: "publish OK ...",
     debug: data
    })
 
})

app.listen(3000, () => {
   console.log('Start server at port 3000.')
})

function mqttClient (){

    const MQTT_SERVER = "54.191.199.50";
    const MQTT_PORT = "1883";
    //if your server don't have username and password let blank.
    const MQTT_USER = "phusit"; 
    const MQTT_PASSWORD = "Password123#@!";
    const MQTT_SUB = ["server/#"]
    
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
    });

    return client;
}
