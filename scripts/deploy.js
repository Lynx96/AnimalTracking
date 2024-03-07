async function main() {
  //const AnimalTracking = await hre.ethers.deployContract("AnimalTracking");
  const AnimalTracking = await ethers.getContractFactory("AnimalTracking");
  
  const animal_tracking = await AnimalTracking.deploy();
  await animal_tracking.waitForDeployment();
  const animal_trackingDeployedAddress = await animal_tracking.getAddress();
  console.log("Contract deployed to address: ", animal_trackingDeployedAddress);

}  
  
 /*  console.log(
    `AnimalTracking deployed to: ${AnimalTracking.target}`
  ); */


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exit(1);
});
