// Function to generate random animal tracking data
function generateAnimalData(){
  const precision =  1000000; // 10^6 decimal precision
  const trackingData = [];

  for (let i = 1; i <= 10; i++){
    const animalId = i; //animals id from 1 to 10
    const latitude = Math.floor(Math.random() * (180 + 1) * precision) - 90 * precision; // Generate a random latitude between -90 and 90
    const longitude = Math.floor(Math.random() * (360 + 1) * precision) -   180 * precision; // Generate a random longitude between -180 and 180 
    let time = new Date().getTime();
    const timestamp = new Date(time).toString();

    trackingData.push({
      animalId,
      latitude,
      longitude,
      timestamp
    });

  }
  return trackingData;
}

module.exports = { generateAnimalData };

/* function generateAnimalData() {
  const precision =  1000000; // 10^6 decimal precision
  const animalId = Math.floor(Math.random() * 1000).toString(); // Generate a random animal ID
  const latitude = Math.floor(Math.random() * (180 + 1) * precision) - 90 * precision; // Generate a random latitude between -90 and 90
  const longitude = Math.floor(Math.random() * (360 + 1) * precision) -   180 * precision; // Generate a random longitude between -180 and 180 
  let time = new Date().getTime();
  const timestamp = new Date(time).toString();

  return {
    animalId,
    latitude,
    longitude,  
    timestamp    
  };
}

module.exports = { generateAnimalData } */

