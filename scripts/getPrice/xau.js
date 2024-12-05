async function main() {
  const XAUPriceConsumer = await ethers.getContractFactory("XAUPriceConsumer");
  const xauPriceConsumer = await XAUPriceConsumer.deploy();

  await xauPriceConsumer.deployed();
  console.log("XAUPriceConsumer deployed to:", xauPriceConsumer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
