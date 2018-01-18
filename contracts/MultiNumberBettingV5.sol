pragma solidity ^0.4.4;

// Ex-1, Part-3
import "./MultiNumberBettingAbstractV1.sol";
/**
 * Exercise: V5
 * Section: 7
 * Part of an online course - for more info checkout link below
 * http://acloudfan.com/learn-blockchain
 */

// Ex-1, Part-3
contract MultiNumberBettingV5 is MultiNumberBettingAbstractV1 {

  uint public  loserCount;
  uint public  winnerCount;

  uint public   lastWinnerAt;
  
  struct Winner {
    string  name;
    address winnerAddress;
    
    uint    guess;
    uint    guessedAt;
    // Ex-2, Part-2
    uint    ethersReceived;
  }

  address  winner;

  
 
  mapping(address=>Winner) winnersMapping;

  uint8[3]  numArray;

  function MultiNumberBettingV5(uint8 num0, uint8 num1, uint8 num2) payable{
    // constructor
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
  }

  // Ex-3 Part-1 Change to payable
  function guess(uint8 num, string name) public payable returns (bool){

    // If num > 10 revert
    if (num > 10) {
      revert();
    }

    // Ex-4, Part-1
    if (msg.value > MAX_BET || msg.value < MIN_BET) {
      revert();
    }


    for (uint8 i = 0 ; i < numArray.length ; i++){
      if (numArray[i] == num) {
        // Increase the winner count
        winnerCount++;

        winnersMapping[msg.sender].winnerAddress = msg.sender;
        winnersMapping[msg.sender].name = name;
        winnersMapping[msg.sender].guess = num;
        winnersMapping[msg.sender].guessedAt = now;
        // Ex-3, Part-3
        winnersMapping[msg.sender].ethersReceived = msg.value;

        lastWinnerAt = winnersMapping[msg.sender].guessedAt;
        winner = msg.sender;

        // Ex-4, Part-2 b
        // Its not a good practice to do this :)
        // Ideally you should use the withdrawal pattern
        // explained in the patterns section

        uint sendBack = 2*msg.value;
        msg.sender.transfer(sendBack);

        return true;
      }
    }
    loserCount++;
    return false;
  }

  function totalGuesses() returns (uint){
    return (loserCount+winnerCount);
  }

  function daysSinceLastWinning()  returns (uint){
    return (now - lastWinnerAt*1 days);
  }

  function hoursSinceLastWinning() returns (uint){
    return (now - lastWinnerAt*1 hours);
  }

  function  minutesSinceLastWinning() returns (uint){
    return (now - lastWinnerAt*1 minutes);
  }

  function getLastWinnerInfo() returns (address winnerAddress,
                                         string  name, 
                                         uint guess,
                                         uint    guessedAt,
                                         // Ex-3, Part-4
                                         uint    ethersReceived) {
    winnerAddress = winnersMapping[winner].winnerAddress;
    name = winnersMapping[winner].name;
    guess = winnersMapping[winner].guess;
    guessedAt = winnersMapping[winner].guessedAt;
    // Ex-3, Part-4
    ethersReceived = winnersMapping[winner].ethersReceived;
  }

  function checkWinning(address winnerAddress) public returns (address retWinnerAddress, string name, uint guessVal, uint guessedAt) {
    Winner memory winnerLocal = winnersMapping[winnerAddress];
    if (winnerLocal.guessedAt != 0) {
        retWinnerAddress = winnerLocal.winnerAddress;
        name = winnerLocal.name;
        guessVal = winnerLocal.guess;
        guessedAt = winnerLocal.guessedAt;
    }
  }
  
}
