var MultiNumberBettingV5 = artifacts.require("./MultiNumberBettingV5.sol");

/**
 * Test Case
 * 1. Lets say John is the dealer - so he is the one running the contract
 * 2. Bill puts in a losing guess (8) with 5 ethers
 * 3. Check the ether balance of the contract
 * 4. Frank puts in a winning bid (3) with 1 ethers
 * 5. Check if Frank receieved an 0.0002  (obviiously he will lose some due to fee in calling guess)
 * TEST CASE IS A WORK IN PROGRESS - ITS Failing
 * Can you fix it?
 */

contract('MultiNumberBettingV5', function(accounts) {
  var johns_address = accounts[0];
  var bills_address = accounts[1];
  var franks_address= accounts[2];

  it("should assert true", function() {
    var multi_number_betting_v5;
    return MultiNumberBettingV5.deployed().then(function(instance){
      multi_number_betting_v5 = instance;
      
      // Send a losing guess from Bill
      var sendValue = web3.toWei(3,'ether');
      multi_number_betting_v5.guess(8,"Bill Tale",{from:bills_address, value:sendValue});
     
      // Get the last winner name
      return multi_number_betting_v5.getLastWinnerInfo.call();

    }).then(function(result){
      // Result is an array: address, name, guess, guessedAt
      console.log(result[0], result[1], result[2].toNumber());

      // Send a winning guess from Frank
      var sendValue = web3.toWei(1,'ether');
      multi_number_betting_v5.guess(3,"Frank Smith",{from:franks_address, value:sendValue});

      // Get the last winner name
      return multi_number_betting_v5.getLastWinnerInfo.call();

    }).then(function(result){
      // Result is an array: address, name, guess, guessedAt
      console.log(result[0], result[1], result[2].toNumber());

      // Check if Bill has won
      // Get the last winner name
      return web3.eth.getBalance(franks_address)
    }).then(function(result){
      console.log("Contract balance:");
      console.log(result);
    });
  });
});