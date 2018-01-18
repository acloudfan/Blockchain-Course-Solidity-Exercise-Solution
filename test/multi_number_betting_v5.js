var MultiNumberBettingV5 = artifacts.require("./MultiNumberBettingV5.sol");

/**
 * Test Case
 * 1. Lets say John is the dealer - so he is the one running the contract
 * 2. Check the initial ether balance for Frank 
 * 3. Bill puts in a losing guess (8) with 3 ethers
 * 4. Frank puts in a winning bid (3) with 1 ethers
 * 5. Frank should have balance > his initial balance checked in step#2
 * 
 * PS:
 * a. Multiple runs will cause Franks balance to increase
 * b. Frank's balance will not be a full ether caz he is paying for gas
 */

contract('MultiNumberBettingV5', function(accounts) {
  var johns_address = accounts[0];
  var bills_address = accounts[1];
  var franks_address= accounts[2];

  it("should assert true", function() {
    var multi_number_betting_v5;
    return MultiNumberBettingV5.deployed().then(function(instance){
      multi_number_betting_v5 = instance;

      return web3.eth.getBalance(franks_address);
    }).then(function(result){
      // Print contract balance
      console.log(' Frank Initial  balance : ',web3.fromWei(result.toNumber(),'ether'));

      // Send a losing guess from Bill
      var sendValue = web3.toWei(3,'ether');
      multi_number_betting_v5.guess(8,"Bill Tale",{from:bills_address, value:sendValue});
     

      // Send a winning guess from Frank
      var sendValue = web3.toWei(1,'ether');
      multi_number_betting_v5.guess(3,"Frank Smith",{from:franks_address, value:sendValue});

      // Get the last winner name
      return multi_number_betting_v5.getLastWinnerInfo.call();
    }).then(function(result){

      console.log("Last Winner: ", result[1]);
      return web3.eth.getBalance(franks_address);

    }).then(function(result){
      console.log("Franks final balance : ");
      console.log(web3.fromWei(result.toNumber(),'ether'));
    });
  });
});