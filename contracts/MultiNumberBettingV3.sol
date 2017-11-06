pragma solidity ^0.4.4;

/**
 * Exercise: V3 
 * Section: 7
 * Part of an online course - for more info checkout link below
 * http://acloudfan.com/learn-blockchain
 */

contract MultiNumberBettingV3 {

  // Ex-1 Part-1
  // Added public to generate the getters
  uint public  loserCount;
  uint public  winnerCount;

  uint public lastWinnerAt;
  string lastWinnerName ;
  // Ex-3
  address winner;

  uint8[3]  numArray;

  function MultiNumberBettingV3(uint8 num0, uint8 num1, uint8 num2) {
    // constructor
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
  }

  
  function guess(uint8 num, string name) returns (bool){

    // Ex-4 If num > 10 throw; replace throw with revert()
    if(num > 10) revert();

    for(uint8 i = 0 ; i < numArray.length ; i++){
      if(numArray[i] == num) {
        // Increase the winner count
        winnerCount++;
        lastWinnerName = name;
        lastWinnerAt = now;

        // Ex-3
        winner=msg.sender;

        return true;
      }
    }
    loserCount++;
    return false;
  }

  function totalGuesses() returns (uint){
    return (loserCount+winnerCount);
  }


  
  function getLastWinner() returns (string){

    bytes memory nameBytes = bytes(lastWinnerName);
    // If no winner send "***"
    if(nameBytes.length == 0) return "***";

    string memory retString = new string(3);

    bytes memory toReturn =  bytes(retString);

    // 2nd check to cover a winner name less than 3 bytes
    for(uint i=0; (i < 3) && (i < nameBytes.length) ; i++){
      toReturn[i] = nameBytes[i];
    }

    return string(toReturn);
  }

  /** Ex-2 functions **/
  function daysSinceLastWinning()  returns (uint){
    return (now - lastWinnerAt*1 days);
  }

  function hoursSinceLastWinning() returns (uint){
    return (now - lastWinnerAt*1 hours);
  }

  function  minutesSinceLastWinning() returns (uint){
    return (now - lastWinnerAt*1 minutes);
  }

  function timeSinceLastWinner() private constant returns(uint) {
    uint timeSince = now - lastWinnerAt * 1 seconds;

    timeSince < now ? lastWinnerAt : 0;
  }
  
}
