const mqtt = require('mqtt');
const { sendDataToBlockchain } = require('../scripts/sendDataToBlockchain');

// MQTT broker options
const brokerOptions = {
  host: '127.0.0.1', // MQTT broker host
  port: 1883 // MQTT broker port
};

// Connect to the MQTT broker
const client = mqtt.connect(brokerOptions);

// Queue to hold incoming data
let dataQueue = [];

//Flag to indicate if the queue is being processed
let isProcessingQueue = false;

// Function to process the queue
async function processQueue(){
  if (isProcessingQueue || dataQueue.length === 0){
    return;
  }

  isProcessingQueue = true;
  while (dataQueue.length > 0){
    const animalData = dataQueue.shift();
    const {animalId, latitude, longitude, timestamp} = animalData;

    try{
      await sendDataToBlockchain(animalId, latitude, longitude, timestamp);
      console.log("Data sent to ethereum blockchain:", animalData);

    }catch (error){
      console.error("Error sending data to blockchain:", error);
      // If there is an error, requeue the data and stop processing
      dataQueue.unshift(animalData);
      break;
    }
    
    // Wait for 2 minutes before processing the next data
    await new Promise(resolve => setTimeout(resolve, 120000));

  }

  isProcessingQueue = false;

}

// Subscribe to the topic
client.on('connect', function () {
  console.log('Connected to MQTT broker');
  client.subscribe('animal/data', function (err) {
    if (!err) {
      console.log('Subscribed to animal/data topic. Waiting for data...');
    } else {
      console.error('Error subscribing to topic:', err);
    }
  });
});

// Handle incoming messages
client.on('message', function (topic, message) {
  if(topic === 'animal/data'){
    try {
      const animalData = JSON.parse(message); 
      dataQueue.push(animalData);
     /*  const {animalId, latitude, longitude, timestamp} = animalData;       
      sendDataToBlockchain(animalId, latitude, longitude, timestamp); */
      console.log('Received message on topic:', topic, ' Message:', message.toString());
      console.log('Data sent to ethereum blockchain:', animalData)
      processQueue();

    } catch (error) {
      console.error("Error parsing message: ", error);
      
    } 
  }

});

// Handle errors
client.on('error', function (error) {
  console.error('Error:', error);
});
