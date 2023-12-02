import fs from "fs";

const overlappingNumbers = {
  oneight: "18",
  threeight: "38",
  eightwo: "82",
  twone: "21",
};

const spelledNumbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const spelledNumbersRegex = new RegExp(
  Object.keys(spelledNumbers).join("|"),
  "g"
);

console.log("spelledNumbersRegex", spelledNumbersRegex);

function main(data) {
  const lines = data.split("\n");

  const numbers = lines.map((line) => {
    const convertedLine = convertSpelledNumbersToActualNumbers(line); // Required for step 2
    return convertedLine.match(/\d/g);
  });

  const result = numbers.reduce((acc, curr) => {
    if (!curr || !curr.length) return;

    const firstNumber = curr[0];
    const lastNumber = curr[curr.length - 1];

    return acc + parseInt(firstNumber + lastNumber);
  }, 0);

  return result;
}

function convertSpelledNumbersToActualNumbers(line) {
  let convertedLine = line;

  Object.keys(overlappingNumbers).forEach((key) => {
    convertedLine = convertedLine.replace(
      new RegExp(key, "g"),
      overlappingNumbers[key]
    );
  });

  Object.keys(spelledNumbers).forEach((key) => {
    convertedLine = convertedLine.replace(
      new RegExp(key, "g"),
      spelledNumbers[key]
    );
  });

  console.log(`${line} -> ${convertedLine}`);
  return convertedLine;
}

const data = fs.readFileSync("input.txt", "utf8");
console.log(main(data));
