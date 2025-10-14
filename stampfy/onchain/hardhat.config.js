require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x863d70a9296ca687acbc51872fe7c528e41ba6f0cc4b51b9c1ffb10c2a209677"]
    }
  }
};
