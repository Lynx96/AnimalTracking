const express = require('express');
const mqtt = require('mqtt');
const Web3 = require('web3');
const fs = require('fs');

const app = express();
const mqttBrokerUrl = '127.0.0.1:1883'; // Assuming Mosquitto is running locally
const mqttClient = mqtt.connect(mqttBrokerUrl);
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/45zltduN9c6fEVfiSVeUp0v8SXsm7K52');
const contractAddress = '0x7B4Cae5555853c323b9842EcB04825f1CfF0375e';
const abi = JSON.parse(fs.readFileSync('C:\Users\joaoh\Documents\BOLSA\AnimalTracking\AnimalTracking\artifacts\contracts\AnimalTracking.sol\AnimalTracking.json'));

const animals = ['lion', 'tiger', 'elephant', 'giraffe', 'zebra', 'bear', 'wolf', 'fox', 'cheetah', 'rhino'];

function generateLocation() {
    return {
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180
    };
}

app.get('/publishData', async (req, res) => {
    let data = [];
    mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
        mqttClient.subscribe('animal/ack', (err) => {
            if (!err) {
                animals.forEach(animal => {
                    const location = generateLocation();
                    const dataPoint = {
                        animal: animal,
                        location: location
                    };
                    mqttClient.publish('animal/location', JSON.stringify(dataPoint));
                    data.push(dataPoint);
                    console.log(`Published data for ${animal}: ${JSON.stringify(dataPoint)}`);
                });
            }
        });
    });

    mqttClient.on('message', (topic, message) => {
        if (topic === 'animal/ack') {
            console.log('Received acknowledgment from MQTT broker:', message.toString());
            sendDataToBlockchain();
            res.json(data);
        }
    });
});


async function sendDataToBlockchain() {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();

    animals.forEach(async (animal, index) => {
        const location = generateLocation();
        const tx = await contract.methods.storeLocation(animal, location.latitude, location.longitude).send({
            from: accounts[0],
            gas: 2000000 // Adjust gas value as needed
        });
        console.log(`Transaction hash for ${animal}:`, tx.transactionHash);
        
        if (index === animals.length - 1) {
            console.log('All data sent to blockchain successfully.');
            process.exit(0);
        }
    });
}

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





/* const mqtt = require('mqtt');
const Web3 = require('web3');
const cron = require('node-cron');
const contractABI = require('./artifacts/build-info/contracts/AnimalTracking.sol/AnimalTracking.json'); // Substituir pelo abi file correto
 
const mqttBrokerUrl = 'mqtt://test.mosquitto.org';
const mqttTopic = 'data/tracking';

const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/45zltduN9c6fEVfiSVeUp0v8SXsm7K52'); // substituir pelo Alchemy API key

const contractAddress = '0x7B4Cae5555853c323b9842EcB04825f1CfF0375e'; // Endereço do contrato
const contract = new web3.eth.Contract(contractABI, contractAddress);

const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    scheduleDataCapture();
});
 */

 //function scheduleDataCapture() {
    // controla os dados para serem gerados de 3 em 3 horas
 //   cron.schedule('0 */3 * * *', () => {
  //      console.log('Fetching and processing tracking data...');
 //       fetchDataAndProcess();
  //  });
//} 
/* 
function fetchDataAndProcess() {
    // Implementa a logica e consolida os dados de rastreio do protocolo mqtt para processa-lo
    mqttClient.subscribe(mqttTopic);
}

mqttClient.on('message', (topic, message) => {
    // recebe o dado e transforma para JSON
    const trackingData = JSON.parse(message);

    // chama a função de captura no smart contract
    contract.methods.storeCaptureData(
        trackingData.animalId,
        trackingData.latitude,
        trackingData.longitude
    ).send({
        from: '0x96d6b6e1Eccae2D96A331eA7017F3b33Ed5DDB53', // endereço de envio 
        gas: 200000 // Set an appropriate gas limit
    }).then((receipt) => {
        console.log('Transaction receipt:', receipt);
    }).catch((error) => {
        console.error('Error sending transaction:', error);
    });
});

 */