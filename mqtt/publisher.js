const mqtt = require('mqtt');
const Web3 = require('web3');
const fs = require('fs');

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
    } else {
      console.error('Error publishing animal data:', err);
    }

    sendDataToBlockchain()
  });
}, 60000); // Publish every 1 minute (60000 milliseconds)

async function sendDataToBlockchain(){
    try {
        const API_KEY = process.env.API_KEY;
        const PRIVATE_KEY = process.env.PRIVATE_KEY; // Replace with your private key
        const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
        
        const { ethers } = require("ethers");
        const contract = require("../artifacts/contracts/AnimalTracking.sol/AnimalTracking.json");
        
        //provider - alchemy
        const alchemyProvider = new ethers.AlchemyProvider(network="sepolia", API_KEY); // Replace with appropriate endpoint

        //signer - you
        const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

        //contract instance
        const animalTrackingContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

        //async function main(){
          const animalData = await animalTrackingContract.animalData();
          console.log("The animal data sent was the following: " + animalData);

          console.log("Waiting for new data to arrive...");
          //const tx = await animalTrackingContract.storeCaptureData()        
        //}
                
        // Example contract interaction data
        //const web3 = new Web3(alchemyProvider);
        //const abi = JSON.parse(fs.readFileSync('C:\Users\joaoh\Documents\BOLSA\AnimalTracking\AnimalTracking\artifacts\contracts\AnimalTracking.sol\AnimalTracking.json'));
        //const abi = [{ "constant": false, ... }]; // Replace with your contract ABI
        //const contract = new web3.eth.Contract(abi, contractAddress);
        //const account = '0x7B4Cae5555853c323b9842EcB04825f1CfF0375e'; // Replace with your account address
       /*  const options = {
            from: account,
            gasPrice: '20000000000', // Example gas price
            gas: 200000 // Example gas limit
        }; */

        // Example transaction
        const transaction = contract.methods.storeCaptureData(data.animalId, data.latitude, data.longitude, data.timestamp);
        const encodedABI = transaction.encodeABI();
        const nonce = await web3.eth.getTransactionCount(account);
        const tx = {
            nonce: nonce,
            gasPrice: options.gasPrice,
            gasLimit: options.gas,
            to: contractAddress,
            data: encodedABI
        };
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        console.log('Transaction hash:', receipt.transactionHash);
    } catch (error) {
        console.error('Error sending data to Alchemy blockchain node provider:', error);
    }

  }

// Handle errors
client.on('error', function (error) {
  console.error('Error:', error);
});


