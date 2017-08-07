pragma solidity ^0.4.4;

/**
 * Exercise: V5
 * Section: 7
 * Part of an online course - for more info checkout link below
 * http://acloudfan.com/learn-blockchain
 */

// Ex - 1 Part - 1, 2
contract MultiNumberBettingAbstractV1 {

  uint public constant MAX_BET=0.005

  function guess(uint8 num, string name) returns (bool);

  function totalGuesses() returns (uint);
  
  function daysSinceLastWinning()  returns (uint);

  function hoursSinceLastWinning() returns (uint);

  function  minutesSinceLastWinning() returns (uint);

  function getLastWinnerInfo() returns (address winnerAddress,
                                         string  name,
                                         uint    guess,
                                         uint    guessedAt);
                                         
  function checkWinning(address addr) returns(bool);
}
