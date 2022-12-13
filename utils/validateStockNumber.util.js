/*
PLAN

Need a function that is exported 
Take in a stock number
Need to check if stock number is exactly 10 characters
Need to check if it only contains numbers and letters
Return result of validation - Boolean
*/

export default function validateStockNumber(stockNumber) {
  if (stockNumber.length !== 10) {
    return false;
  } else {
    if (/[a-z0-9]/gi.test(stockNumber)) {
      return true;
    } else {
      return false;
    }
  }
}

// TODO Global flag searches for alphanumeric anywhere in the string, can use {} to look for specific amount
// Use that to check length 10

console.log(validateStockNumber("1234567890"));
console.log(validateStockNumber("1"));
console.log(validateStockNumber("123456789!"));
