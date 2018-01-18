var MultiNumberBettingV7 = artifacts.require("./MultiNumberBettingV7.sol");

/**
 * Test Case
 * 1. Lets say John is the dealer - so he is the one who owns the contract
 * 2. Fund the contract with John's account - lets send 20 Ethers
 * 3. Send a winning/losing bet & check event
 * 
 * You may use #3 implementation to write a test case for the losing bet
 * 
 * PS:
 * a. Multiple runs will cause John's balance to decrease
 * b. John's balance will not be a full ether caz he is paying for gas
 * c. Every test run creates a new instance of the contract
 */

contract('MultiNumberBettingV7', function(accounts) {
  var johns_address = accounts[0];
  var bills_address = accounts[1];
  var franks_address= accounts[2];

  it("should assert true", function() {
    var multi_number_betting_v7;
    return MultiNumberBettingV7.deployed().then(function(instance){
      multi_number_betting_v7 = instance;

      // #2
      var sendValue = web3.toWei(20,'ether');
      web3.eth.sendTransaction({from:johns_address,to:multi_number_betting_v7.address, value:sendValue});

      // #3
      // Send a winning/losing guess from Frank
      var sendValue = web3.toWei(1,'ether');
      var guessNumber=1; // Change this 2,4,5,6,7,8,10 to see a losing event
      return multi_number_betting_v7.guess(guessNumber,"Frank Smith",{from:franks_address, value:sendValue});
    }).then(function(result){
      console.log('Received Event: ',
                  result.logs[0].event,
                  'From: ',
                  result.logs[0].args.name,
                  ', Bet Amount: ',
                  web3.fromWei((result.logs[0].args.amount).toNumber(),'ether'), 'Ether');
    });
  });
});