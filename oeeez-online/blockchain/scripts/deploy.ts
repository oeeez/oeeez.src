import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const RADToken = await ethers.getContractFactory("RADToken");
  const radToken = await RADToken.deploy();

  await radToken.deployed();

  console.log("RADToken deployed to:", radToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
