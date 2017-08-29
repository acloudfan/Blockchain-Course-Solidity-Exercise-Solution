var MultiNumberBettingV4 = artifacts.require("./MultiNumberBettingV4.sol");

/**
 * Test Case
 * 1. Create a winner (John) & a loser (Bob)
 * 2. Get last winner info - it should have John
 * 3. Add another winner (Frank)
 * 4. Get last winner info - it should have Frank
 * 5. Check if Bill is winning - should return false
 */

contract('MultiNumberBettingV4', function(accounts) {

  var johns_address = accounts[0];
  var bills_address = accounts[1];
  var franks_address= accounts[2];

  it("should assert true", function() {
    var multi_number_betting_v4;
    return MultiNumberBettingV4.deployed().then(function(instance){
      multi_number_betting_v4 = instance;
      
      // Send a winner guess from John
      multi_number_betting_v4.guess(3,"John Miller",{from:johns_address});
      // Send a losing guess from Bill
      multi_number_betting_v4.guess(8,"Bill Tale",{from:bills_address});
     
      // Get the last winner name
      return multi_number_betting_v4.getLastWinnerInfo.call();

    }).then(function(result){
      // Result is an array: address, name, guess, guessedAt
      console.log(result[0], result[1], result[2].toNumber());

      // Send a winning guess from Frank
      multi_number_betting_v4.guess(9,"Frank Smith",{from:franks_address});
      // Send a winning guess from Bill
      multi_number_betting_v4.guess(10,"Bill Tale",{from:bills_address});
      

      // Get the last winner name
      return multi_number_betting_v4.getLastWinnerInfo.call();

    }).then(function(result){
      // Result is an array: address, name, guess, guessedAt
      console.log(result[0], result[1], result[2].toNumber());

      // Check if Bill has won
      // Get the last winner name
      return multi_number_betting_v4.checkWinning.call(bills_address,{from:bills_address});
    }).then(function(result){
      console.log("Bill Won?  ",result);
    });
  });
});