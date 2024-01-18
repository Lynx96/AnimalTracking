const mqtt = require('mqtt');
const Web3 = require('web3');
const cron = require('node-cron');
const contractABI = require('./artifacts/build-info/contracts/AnimalTracking.sol/AnimalTracking.json'); // Replace with your ABI file
 
const mqttBrokerUrl = 'mqtt://test.mosquitto.org';
const mqttTopic = 'data/tracking';

const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/45zltduN9c6fEVfiSVeUp0v8SXsm7K52'); // Replace with your Alchemy API key

const contractAddress = '0x7B4Cae5555853c323b9842EcB04825f1CfF0375e'; // Replace with your contract address
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
        from: '0x96d6b6e1Eccae2D96A331eA7017F3b33Ed5DDB53', // Replace with your sender address
        gas: 200000 // Set an appropriate gas limit
    }).then((receipt) => {
        console.log('Transaction receipt:', receipt);
    }).catch((error) => {
        console.error('Error sending transaction:', error);
    });
});
