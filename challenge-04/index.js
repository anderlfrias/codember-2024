import fs from 'fs';

const isPrime = (number) => {
  if (number < 2) return false;
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }

  return true;
}

const addDigits = (numeroAsString) => {
  const digits = numeroAsString.split('');
  return digits.reduce((acc, current) => acc + parseInt(current, 10), 0)
}

const isCompletelyPrime = (numberAsString) => {
  const number = parseInt(numberAsString, 10);
  if (!isPrime(number)) return false
  if (!isPrime(addDigits(numberAsString))) return false
  return true
}

fs.readFile('challenge-04/nodes.txt', (err, data) => {
  if (err) {
    console.log('Ocurrio un error al intentar leer el archivo.')
  }

  const nodes = data.toString().split(',')
  let nodesCompletelyPrime = []
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (isCompletelyPrime(node)) {
      nodesCompletelyPrime.push(node)
    }
  }
  console.log('results:', nodesCompletelyPrime)
  console.log(`submit ${nodesCompletelyPrime.length}-${nodesCompletelyPrime[2]}`)
})