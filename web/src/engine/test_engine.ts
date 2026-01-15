// web/src/engine/test_engine.ts
import { calculateState } from './StateEngine.ts';

const testInputs = [
  { dob: "1990-01-01", location: "New York", time: 1700000000000 },
  { dob: "1995-05-15", location: "London", time: 1700000000000 },
  { dob: "1990-01-01", location: "New York", time: 1700000060000 }, // +1 minute
];

testInputs.forEach(input => {
  const state = calculateState(input.dob, input.location, input.time);
  console.log(`Input: ${JSON.stringify(input)}`);
  console.log(`State: `, state);
  console.log('-------------------');
});
