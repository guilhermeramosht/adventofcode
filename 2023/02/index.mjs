import fs from "fs";

const colors = ["red", "green", "blue"];

const main = (file, valueToCheck) => {
  const games = cleanUp(file);

  const result = getSumOfPossibleGamesIds(games, valueToCheck);
  const minToBePossibleByGame = getMinToBePossible(games);

  return { result, minToBePossibleByGame };
};

const getSumOfPossibleGamesIds = (games, valueToCheck) => {
  return Object.keys(games).reduce((acc, id) => {
    const subsets = games[id];
    let isValid = true;

    subsets.forEach((subset) => {
      colors.forEach((color) => {
        if (subset[color] && subset[color] > valueToCheck[color])
          isValid = false;
      });
    });

    if (isValid) acc += parseInt(id);
    return acc;
  }, 0);
};

const getMinToBePossible = (games) => {
  const minToBePossibleByGame = {};

  // Get min to be possible by game
  Object.keys(games).forEach((id) => {
    const subsets = games[id];
    if (!minToBePossibleByGame[id]) minToBePossibleByGame[id] = {};

    for (const subset of subsets) {
      colors.forEach((color) => {
        if (!minToBePossibleByGame[id][color]) {
          minToBePossibleByGame[id][color] = subset[color];
        } else if (subset[color]) {
          minToBePossibleByGame[id][color] = Math.max(
            minToBePossibleByGame[id][color],
            subset[color]
          );
        }
      });
    }
  });

  // Sum the power of all min values
  const sumOfThePowerOfAllMinValues = Object.keys(minToBePossibleByGame).reduce(
    (acc, id) => {
      const minByColors = minToBePossibleByGame[id];
      let sum = 0;

      colors.forEach((color) => {
        sum = sum ? minByColors[color] * sum : minByColors[color];
      });

      acc += sum;
      return acc;
    },
    0
  );

  return sumOfThePowerOfAllMinValues;
};

const cleanUp = (file) => {
  const lines = file.split("\n");
  const linesById = {};

  lines.forEach((line) => {
    const [id, games] = line.slice(5).split(": ");
    const gamesByColor = games.split("; ").map((game) => {
      const colorsRaw = game.split(", ");
      const colorsProcessed = {};

      colorsRaw.forEach((color) => {
        const [amountOfCubes, colorName] = color.split(" ");
        colorsProcessed[colorName] = amountOfCubes;
      });

      return colorsProcessed;
    });

    linesById[id] = gamesByColor;
  });

  return linesById;
};

const file = fs.readFileSync("./input.txt", "utf8");
const valueToCheck = { red: 12, green: 13, blue: 14 };
console.log(main(file, valueToCheck));
