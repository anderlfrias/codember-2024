import { MAX_NUMBER, MIN_NUMBER } from "./constants.js";

export function goRight(index, length) {
  return index === (length - 1) ? 0 : index + 1;
};

export function goLeft(index, length) {
  return index === 0 ? (length - 1) : index - 1
}

export function goUp(number) {
  return number === MAX_NUMBER ? MIN_NUMBER : number + 1
}

export function goDown(number) {
  return number === MIN_NUMBER ? MAX_NUMBER : number - 1
}