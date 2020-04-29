function string2Number(string, decimal) {
  if (arguments.length < 2) decimal = 10;
  var letters = ['a', 'b', 'c', 'd', 'e', 'f'];
  var chars = string.toLowerCase().split('');
  var flag = chars.includes('-');
  var number = 0;
  var i = 0;

  while (
    i < chars.length &&
    chars[i] !== '.' &&
    !letters.includes(chars[i])
  ) {
    number *= decimal;
    number += chars[i].codePointAt() - '0'.codePointAt();
    i++;
  }
  if (chars[i] === '.') i++;
  var fraction = 1;
  while (
    decimal === 10 &&
    i < chars.length &&
    chars[i] !== 'e' &&
    chars[i] !== '+' &&
    chars[i] !== '-'
  ) {
    fraction /= decimal;
    number += (chars[i].codePointAt() - '0'.codePointAt()) * fraction;
    i++;
  }
  if (decimal === 10 &&
    chars[i] === '-' ||
    chars[i] === '+' ||
    chars[i] === 'e'
  ) i++;
  var index = 0;
  while (decimal === 10 && i < chars.length) {
    index *= decimal;
    index += convertStringToNumber(chars[i]);
    if (flag) number /= decimal ** index
    else number *= decimal ** index
    i++;
  }
  while (decimal === 16 && letters.includes(chars[i])) {
    number *= decimal;
    number += chars[i].codePointAt() - 87;
    i++;
  }
  return number;
}

function number2String(number, radix = 10) {
  let integer = Math.floor(number)
  let fraction = String(number).match(/\.\d+$/)
  if (fraction) {
    fraction = fraction[0].replace('.', '')
  }
  let string = ''
  while (integer > 0) {
    string = String(integer % radix) + string
    integer = Math.floor(integer / radix)
  }
  return fraction ? `${string}.${fraction}` : string
}