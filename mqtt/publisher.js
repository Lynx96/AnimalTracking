const mqtt = require('mqtt');
const Web3 = require('web3');
const fs = require('fs');

const { sendDataToBlockchain } = require("../scripts/sendDataToBlockchain");



// MQTT broker options
const brokerOptions = {
  host: '127.0.0.1', // MQTT broker host
  port: 1883 // MQTT broker port
};

// Connect to the MQTT broker
const client = mqtt.connect(brokerOptions);

// Function to generate random animal tracking data
function generateAnimalData() {
  const animalId = Math.floor(Math.random() * 1000); // Generate a random animal ID
  const latitude = Math.random() * 90; // Generate a random latitude between -90 and 90
  const longitude = Math.random() * 180; // Generate a random longitude between -180 and 180
  const timestamp = new Date().toISOString(); // Generate a timestamp for the current time

  return {
    animalId: animalId,
    latitude: latitude,
    longitude: longitude,
    timestamp: timestamp
  };
}

const animalData = generateAnimalData();
const payload = JSON.stringify(animalData);

// Publish animal tracking data every minute
setInterval(function() {
  //const animalData = generateAnimalData();
  //const payload = JSON.stringify(animalData);
  
  client.publish('animal/data', payload, function (err) {
    if (!err) {
      console.log('Published animal data:', payload);
      return payload;
    } else {
      console.error('Error publishing animal data:', err);
    }

    sendDataToBlockchain(payload)
  });
}, 60000); // Publish every 1 minute (60000 milliseconds)


// Handle errors
client.on('error', function (error) {
  console.error('Error:', error);
});


