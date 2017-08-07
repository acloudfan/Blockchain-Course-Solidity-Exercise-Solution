
var MultiNumberBettingV1 = artifacts.require("./MultiNumberBettingV1.sol");

contract('MultiNumberBettingV1', function(accounts) {
  it("should assert true", function() {
    var multi_number_betting_v1;
    return MultiNumberBettingV1.deployed().then(function(instance){
      multi_number_betting_v1 = instance;
      // Get the total guesses
      return multi_number_betting_v1.totalGuesses.call();
    }).then(function(result){
      console.log("Total Guesses=",result.toNumber());
      // Make a guess
      multi_number_betting_v1.guess(4);
      return multi_number_betting_v1.totalGuesses.call();
    }).then(function(result){
      console.log("Total Guesses=",result.toNumber());
      assert.isTrue(result.toNumber() == 1);
    });
  });
});