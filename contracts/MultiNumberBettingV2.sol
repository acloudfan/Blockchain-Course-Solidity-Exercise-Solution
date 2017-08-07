pragma solidity ^0.4.4;

/**
 * Exercise: V2 
 * Section: 7
 * Part of an online course - for more info checkout link below
 * http://acloudfan.com/learn-blockchain
 */

contract MultiNumberBettingV2 {

  uint  loserCount;
  uint  winnerCount;

  // Ex-1  Part-1
  string lastWinnerName ;

  uint8[3]  numArray;

  function MultiNumberBettingV2(uint8 num0, uint8 num1, uint8 num2) {
    // constructor
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
  }

  // Ex-1 Part-2
  function guess(uint8 num, string name) returns (bool){
    for(uint8 i = 0 ; i < numArray.length ; i++){
      if(numArray[i] == num) {
        // Increase the winner count
        winnerCount++;
        lastWinnerName = name;
        return true;
      }
    }
    loserCount++;
    return false;
  }

  function totalGuesses() returns (uint){
    return (loserCount+winnerCount);
  }


  // Ex-3
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
  
}
