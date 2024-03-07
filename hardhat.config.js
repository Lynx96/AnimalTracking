/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

//const { API_URL, PRIVATE_KEY} = process.env;
/* console.log(process.env.API_URL); */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",  
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }    
  } 
};



