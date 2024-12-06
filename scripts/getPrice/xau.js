const { ethers } = require("hardhat");

async function main() {
  // Compile the contract
  const PriceConsumer = await ethers.getContractFactory("PriceConsumer");

  console.log("Deploying PriceConsumer...");

  // Deploy without arguments since registry address is hardcoded
  const priceConsumer = await PriceConsumer.deploy();
  
  // For older versions of ethers, use deployed() instead of waitForDeployment()
  await priceConsumer.deployed();

  console.log("PriceConsumer deployed to:", priceConsumer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in deployment:", error);
    process.exit(1);
  });
