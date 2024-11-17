
import { goDown, goLeft, goRight, goUp } from "./moves.js";

const input = '528934712834 URDURUDRUDLLLLUUDDUDUDUDLLRRRR';
const [number, moves] = input.split(' ');

function unlockAcces(numbers, moves) {
  let response = numbers;
  let currentIndexNumbers = 0;

  moves.forEach(move => {
    switch (move) {
      case 'R':
        currentIndexNumbers = goRight(currentIndexNumbers, numbers.length)
        break;
      case 'L':
        currentIndexNumbers = goLeft(currentIndexNumbers, numbers.length)
        break;
      case 'U':
        response[currentIndexNumbers] = goUp(response[currentIndexNumbers])
        break;
      case 'D':
        response[currentIndexNumbers] = goDown(response[currentIndexNumbers])
        break
      default:
        break;
    }
  });
  return response.join('')
}
const accesKey = unlockAcces(
  number.split('').map(number => (parseInt(number, 10))),
  moves.split('')
)
console.log('solucion: ', accesKey);

