const mqtt = require('mqtt');
const { sendDataToBlockchain } = require('../scripts/sendDataToBlockchain');

// MQTT broker options
const brokerOptions = {
  host: '127.0.0.1', // MQTT broker host
  port: 1883 // MQTT broker port
};

// Connect to the MQTT broker
const client = mqtt.connect(brokerOptions);

// Subscribe to the topic
client.on('connect', function () {
  console.log('Connected to MQTT broker');
  client.subscribe('animal/data', function (err) {
    if (!err) {
      console.log('Subscribed to animal/data topic');
    } else {
      console.error('Error subscribing to topic:', err);
    }
  });
});

// Handle incoming messages
client.on('message', function (topic, message) {
  try {
    const data = JSON.parse(message); 
    const ethereumData = data.ethereumData;
    sendDataToBlockchain(ethereumData);
    console.log('Received message on topic:', topic, ' Message:', message.toString());
  }
  catch (error) {
    console.error("Error parsing message: ", error);
    
  }
  //const {animalId, latitude, longitude} = JSON.parse(message); 
 
  //sendDataToBlockchain(animalId, latitude, longitude);
});

// Handle errors
client.on('error', function (error) {
  console.error('Error:', error);
});
