require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x6c4c0ffcb7f4831515f0932200c697411c89b0f0e5abef7869b77927b053be32"]
    }
  }
};
