require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0xb6929f8d8fac3093eda530b3df80a4175eaafd32af9e81ef86a79b6d2f9febdb"]
    }
  }
};
