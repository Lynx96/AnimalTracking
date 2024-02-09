const mqtt = require('mqtt');
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

function scheduleDataCapture() {
    // controla os dados para serem gerados de 3 em 3 horas
    cron.schedule('0 */3 * * *', () => {
        console.log('Fetching and processing tracking data...');
        fetchDataAndProcess();
    });
}

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
