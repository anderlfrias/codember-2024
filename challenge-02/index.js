import fs from 'fs';

const calculateSteps = (inst) => {
  let instructions = inst;
  let steps = 0;
  let pivot = 0; // The current position index
  do {
    steps++;
    const instruction = instructions[pivot]
    instructions[pivot] += 1;
    pivot += instruction;
  } while (pivot < instructions.length && pivot >= 0);

  return steps;
}

fs.readFile('challenge-02/trace.txt', (err, data) => {
  if (err) {
    console.log('Ocurrio un error al intentar leer el archivo.')
  }

  const text = data.toString();
  const stringInstructions = text.split('\r\n');

  let totalSteps = 0;
  let lastSteps = 0;
  for (let i = 0; i < stringInstructions.length; i++) {
    const instructions = stringInstructions[i].split(' ').map( num => parseInt(num))

    const steps = calculateSteps(instructions)
    totalSteps += steps;
    i === stringInstructions.length - 1 && (lastSteps = steps);
  }

  console.log('TotalSteps: ', totalSteps)
  console.log('lastSteps: ', lastSteps)
})
