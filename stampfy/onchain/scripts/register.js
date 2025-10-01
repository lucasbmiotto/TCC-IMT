const { ethers } = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x8c09d34c3712e8a260C6D76D2FF5758A50FBbeB5"; 
  const contract = await ethers.getContractAt("Stampfy", CONTRACT_ADDRESS);

  const [deployer] = await ethers.getSigners();

  console.log("Registrando credencial com:", deployer.address);

  const tx = await contract.registerCredential(
    "hash123",
    "Diploma",
    "did:owner:lucas",
    "did:issuer:imt"
  );

  await tx.wait();

  console.log("Credencial registrada!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
