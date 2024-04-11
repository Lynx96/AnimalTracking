const { BigNumber } = require('bignumber.js');
// Function to generate random animal tracking data
function generateAnimalData() {
    const animalId = new BigNumber((Math.floor(Math.random() * 1000))).toString(); // Generate a random animal ID
    const latitude = new BigNumber(Math.round((Math.random() * 180 - 90))).shiftedBy(15).toString(); // Generate a random latitude between -90 and 90
    const longitude = new BigNumber(Math.round((Math.random() * 360 - 180))).shiftedBy(15).toString(); // Generate a random longitude between -180 and 180
   /*  const timestamp = new Date().toISOString(); // Generate a timestamp for the current time */
  
    return {
      animalId,
      latitude,
      longitude,      
    };
  }

module.exports = { generateAnimalData }
