const mqtt = require('mqtt');
const { generateAnimalData } = require("./generateAnimalData")


// MQTT broker options
const brokerOptions = {
  host: '127.0.0.1', // MQTT broker host
  port: 1883 // MQTT broker port
};

// Connect to the MQTT broker
const client = mqtt.connect(brokerOptions);



// Publish animal tracking data every minute
setInterval(function () {
  const animalData = generateAnimalData();
  console.log(animalData);
  const payload = JSON.stringify(animalData);
  
  client.publish('animal/data', payload, function (err) {
    if (!err) {
      console.log('Published animal data:', payload);     
    } else {
      console.error('Error publishing animal data:', err);
    }

  });
}, 5000); // Publish every 1 minute (60000 milliseconds)


// Handle errors
client.on('error', function (error) {
  console.error('Error:', error);
});


