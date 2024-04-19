// Function to generate random animal tracking data
function generateAnimalData() {
  const precision =  1000000; // 10^6 decimal precision
  const animalId = Math.floor(Math.random() * 1000).toString(); // Generate a random animal ID
  const latitude = Math.floor(Math.random() * (180 + 1) * precision) - 90 * precision; // Generate a random latitude between -90 and 90
  const longitude = Math.floor(Math.random() * (360 + 1) * precision) -   180 * precision; // Generate a random longitude between -180 and 180 
 /*  const timestamp = new Date().toISOString(); // Generate a timestamp for the current time */
  return {
    animalId,
    latitude,
    longitude,      
  };
}

module.exports = { generateAnimalData }
