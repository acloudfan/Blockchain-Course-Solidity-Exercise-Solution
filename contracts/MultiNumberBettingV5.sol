pragma solidity ^0.4.4;

/**
 * Exercise: V4
 * Section: 7
 * Part of an online course - for more info checkout link below
 * http://acloudfan.com/learn-blockchain
 */
import "./MultiNumberBettingAbstractV1.sol"  ;

// Ex - 1 Part - 3
contract MultiNumberBettingV5 is MultiNumberBettingAbstractV1 {

  uint public  loserCount;
  uint public  winnerCount;

  uint public lastWinnerAt;
  
  address winner;

  // Ex-2 Part 1, 2
  uint public constant MAX_BET = 0.0005 ether;
  uint public constant MIN_BET = 0.000001 ether;
  
  struct Winner {
    address winnerAddress;
    string  name;
    // Ex - 3 Part - 2
    uint    ethersReceived;
    uint    guess;
    uint    guessedAt;
  }
  
  mapping(address=>Winner) winnersMapping;

  uint8[3]  numArray;

  function MultiNumberBettingV5(uint8 num0, uint8 num1, uint8 num2) {
    // constructor
    numArray[0] = num0;
    numArray[1] = num1;
    numArray[2] = num2;
  }

  // Ex - 3 Part - 1, Make guess payable
  function guess(uint8 num, string name) payable returns(bool)  {

    // If num > 10 throw
    if(num > 10) revert();

    // Ex - 4 Part - 1
    uint recvd = msg.value;
    if(recvd < MIN_BET || recvd > MAX_BET)  revert();

    for(uint8 i = 0 ; i < numArray.length ; i++){
      if(numArray[i] == num) {
        // Increase the winner count
        winnerCount++;

        winnersMapping[msg.sender].winnerAddress = msg.sender;
        winnersMapping[msg.sender].name = name;
        winnersMapping[msg.sender].guess = num;
        winnersMapping[msg.sender].guessedAt = now;
        // Ex - 3 Part - 3
        winnersMapping[msg.sender].ethersReceived = msg.value;

        lastWinnerAt = winnersMapping[msg.sender].guessedAt;
        winner=msg.sender;

        // Ex - 4 Part - 2
        // Send the ethers - make sure you address the issue raised in 
        // Ex - 4 Part - 2 a

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

  // Ex - 4 Part - 4
  function getLastWinnerInfo() returns(address winnerAddress, 
                                        string  name, 
                                        uint    guess,
                                        uint    guessedAt,
                                        uint    ethersReceived){
    winnerAddress = winnersMapping[winner].winnerAddress;
    name =  winnersMapping[winner].name;
    guess = winnersMapping[winner].guess;
    guessedAt = winnersMapping[winner].guessedAt;
    ethersReceived= winnersMapping[winner].ethersReceived;
  }

  // Ex - 3 
  function checkWinning(address addr) returns(bool){
    
    return (winnersMapping[addr].guessedAt != 0);

  }
  
}
