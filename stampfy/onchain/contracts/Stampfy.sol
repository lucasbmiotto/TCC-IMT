// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Stampfy {
    struct Credential {
        string hash;
        string credType;
        string ownerDID;
        string issuerDID;
        uint256 timestamp;
        address issuer;
    }

    Credential[] private credentials;

    function registerCredential(
        string memory hash,
        string memory credType,
        string memory ownerDID,
        string memory issuerDID
    ) public {
        credentials.push(
            Credential(hash, credType, ownerDID, issuerDID, block.timestamp, msg.sender)
        );
    }

    function getAllCredentials() public view returns (Credential[] memory) {
        return credentials;
    }
}
