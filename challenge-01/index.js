import fs from 'fs';

const lowerCaseOrDigitRegex = /^[a-z0-9]+$/
const digitRegex = /^[0-9]+$/

function identifyPattern(passwords) {
  let trueCount = 0;
  let falseCount = 0;

  for (let i = 0; i < passwords.length; i++) {
    const password = passwords[i];
    if (!lowerCaseOrDigitRegex.test(password)) {
      falseCount++
      continue;
    }

    const chars = password.split('');
    let hasLetters = false;
    let isCurrentPasswordFalse = false;

    for (let j = 0; j < chars.length; j++) {
      const char = chars[j];

      if (hasLetters && digitRegex.test(char)) {
        falseCount++;
        isCurrentPasswordFalse = true;
        break;
      }

      if (j > 0) {
        const previousChar = chars[j - 1];
        if (digitRegex.test(char)) {
          if (!digitRegex.test(previousChar) || (char < previousChar)) {
            falseCount++;
            isCurrentPasswordFalse = true;
            break;
          }
          continue;
        }

        if (!digitRegex.test(previousChar) && (char < previousChar)) {
          falseCount++;
          isCurrentPasswordFalse = true;
          break;
        }
      }
    }

    !isCurrentPasswordFalse && trueCount++;
  }

  return { trueCount, falseCount }
}

fs.readFile('challenge-01/log.txt', (err, data) => {
  if (err) {
    console.error('Ocurrio un error al intentar leer el archivo \'challenge-01/log.txt\'', err)
  }

  const text = data.toString();

  const { trueCount, falseCount } = identifyPattern(text.split('\r\n'))
  console.log(`${trueCount}true${falseCount}false`)
})


