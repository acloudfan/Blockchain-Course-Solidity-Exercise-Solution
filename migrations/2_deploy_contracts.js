
var MultiNumberBettingV1 = artifacts.require("./MultiNumberBettingV1.sol");
var MultiNumberBettingV2 = artifacts.require("./MultiNumberBettingV2.sol");
var MultiNumberBettingV3 = artifacts.require("./MultiNumberBettingV3.sol");
var MultiNumberBettingV4 = artifacts.require("./MultiNumberBettingV4.sol");
var MultiNumberBettingV5 = artifacts.require("./MultiNumberBettingV5.sol");
var MultiNumberBettingV6 = artifacts.require("./MultiNumberBettingV6.sol");

module.exports = function(deployer) {
  // Number passed to constructor 1,3,9
  deployer.deploy(MultiNumberBettingV1,1,3,9);
  deployer.deploy(MultiNumberBettingV2,1,3,9);
  deployer.deploy(MultiNumberBettingV3,1,3,9);
  deployer.deploy(MultiNumberBettingV4,1,3,9);
  deployer.deploy(MultiNumberBettingV5,1,3,9);
  // V6 deployment occurs with account[0] as from
  // which is referred to as John's account in test code
  deployer.deploy(MultiNumberBettingV6,1,3,9);
};
