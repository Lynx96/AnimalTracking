const path = require('path');
require('dotenv').config( { path: path.resolve('../.env')} )
const { ethers } = require("ethers");

const contract = require("../artifacts/contracts/AnimalTracking.sol/AnimalTracking.json");
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Replace with your private key
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;


//provider - alchemy
const alchemyProvider = new ethers.AlchemyProvider(network = "sepolia", API_KEY); // Replace with appropriate endpoint

//signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//contract instance
const animalTrackingContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function sendDataToBlockchain(data) {
  try {
    const tx = await animalTrackingContract.storeCaptureData(data);
    console.log("Transaction sent: ", tx)
    await tx.wait();
    console.log("Transaction confirmed! Animal Data sent was: ");
    
  } catch (error) {
    console.error('Error sending data to blockchain:', error);    
  }  
}

module.exports = {sendDataToBlockchain};

/* sendDataToBlockchain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); */


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
/* const transaction = contract.methods.storeCaptureData(data.animalId, data.latitude, data.longitude);
        const encodedABI = transaction.encodeABI();
        const nonce = await web3.eth.getTransactionCount(account); */
/* tx = {
            nonce: nonce,
            gasPrice: options.gasPrice,
            gasLimit: options.gas,
            to: contractAddress,
            data: encodedABI
        }; */
/*  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        console.log('Transaction hash:', receipt.transactionHash);
    } catch (error) {
        console.error('Error sending data to Alchemy blockchain node provider:', error);
    }

  } */
