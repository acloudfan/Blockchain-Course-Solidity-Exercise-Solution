var MultiNumberBettingV5 = artifacts.require("./MultiNumberBettingV6.sol");

/**
 * Test Case
 * 1. Lets say John is the dealer - so he is the one who owns the contract
 * 2. Fund the contract with John's account - since MAX_BET is 5 we will
 *    need to send at least 15+ so that players can play with max bet...so
 *    lets send 20 Ethers
 * 3. Withdraw 2 Ether with John's account   [Sunny day test]
 * 4. Check the contract balance - it should be 18
 * 
 * 5. Change the account in#3 to Bill's account <<< should throw exception
 * 
 * PS:
 * a. Multiple runs will cause John's balance to decrease
 * b. John's balance will not be a full ether caz he is paying for gas
 * c. Every test run creates a new instance of the contract
 */

contract('MultiNumberBettingV6', function(accounts) {
  var johns_address = accounts[0];
  var bills_address = accounts[1];
  var franks_address= accounts[2];

  it("should assert true", function() {
    var multi_number_betting_v6;
    return MultiNumberBettingV5.deployed().then(function(instance){
      multi_number_betting_v6 = instance;

      // #2
      var sendValue = web3.toWei(20,'ether');
      web3.eth.sendTransaction({from:johns_address,to:multi_number_betting_v6.address, value:sendValue});

      return web3.eth.getBalance(johns_address);
    }).then(function(result){
      // Print contract balance
      console.log('John balance after initial send : ',web3.fromWei(result.toNumber(),'ether'));
      
      return web3.eth.getBalance(multi_number_betting_v6.address);
    }).then(function(result){
      console.log('Contract balance after initial send : ',web3.fromWei(result.toNumber(),'ether'));

      var receiveValue = web3.toWei(2,'ether');
      // #3 If this is called with any address othe than John - it will throw excep
      return multi_number_betting_v6.ownerWithdraw(receiveValue, {from:johns_address});

    }).then(function(){ 
      // Now get the balance for John
      return web3.eth.getBalance(johns_address);
    }).then(function(result){
      console.log("Johns final balance : ",web3.fromWei(result.toNumber(),'ether'));
      // Now get the balance for Contract
      return web3.eth.getBalance(multi_number_betting_v6.address);
    }).then(function(result){
      console.log("Contracts final balance : ",web3.fromWei(result.toNumber(),'ether'));
    });
  });
});