const mqtt = require('mqtt');
const Web3 = require('web3');
const cron = require('node-cron');
const contractABI = require('./AnimalTrackingABI.json'); // Replace with your ABI file

const mqttBrokerUrl = 'mqtt://your-mqtt-broker-url';
const mqttTopic = 'animal-tracking-topic';

const web3 = new Web3('https://sepolia.infura.io/v3/cc5cf625859f4030bca941d5fee94d03'); // Replace with your Infura API key

const contractAddress = '0xYourContractAddress'; // Replace with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    scheduleDataCapture();
});

function scheduleDataCapture() {
    // Schedule the data capture job to run every 3 hours
    cron.schedule('0 */3 * * *', () => {
        console.log('Fetching and processing tracking data...');
        fetchDataAndProcess();
    });
}

function fetchDataAndProcess() {
    // Implement the logic to fetch tracking data from MQTT and process it
    mqttClient.subscribe(mqttTopic);
}

mqttClient.on('message', (topic, message) => {
    // Assuming the message is in JSON format
    const trackingData = JSON.parse(message);

    // Invoke the captureData function in the smart contract
    contract.methods.storeCaptureData(
        trackingData.animalId,
        trackingData.latitude,
        trackingData.longitude
    ).send({
        from: '0xYourSenderAddress', // Replace with your sender address
        gas: 200000 // Set an appropriate gas limit
    }).then((receipt) => {
        console.log('Transaction receipt:', receipt);
    }).catch((error) => {
        console.error('Error sending transaction:', error);
    });
});
