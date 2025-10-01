require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x4de50634fc5d8cde46dbf73740426942bbbe5b9a32411449d650b93f98c0d157"]
    }
  }
};
