// Function to generate random animal tracking data
function generateAnimalData() {
    const animalId = Math.floor(Math.random() * 1000); // Generate a random animal ID
    const latitude = Math.random() * 90; // Generate a random latitude between -90 and 90
    const longitude = Math.random() * 180; // Generate a random longitude between -180 and 180
    const timestamp = new Date().toISOString(); // Generate a timestamp for the current time
  
    return {
      animalId,
      latitude,
      longitude,
      timestamp
    };
  }

module.exports = { generateAnimalData }
