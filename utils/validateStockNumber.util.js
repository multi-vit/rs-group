export default function validateStockNumber(stockNumber) {
  return /^[a-z0-9]{10}$/i.test(stockNumber);
}

/* 
In-line tests to check it is working as expected:
console.log(validateStockNumber("1234567890"));
console.log(validateStockNumber("abcde12345"));
console.log(validateStockNumber("1"));
console.log(validateStockNumber("123456789!"));
console.log(validateStockNumber("abcde123456789"));
 */
