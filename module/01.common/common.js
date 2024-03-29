export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getOneNumberForEachRow = (questNumbers, numbers) => {
  if (questNumbers.length === 0) {
    return numbers;
  }

  const index = getRandomNumber(0, questNumbers.length);
  numbers.push(questNumbers[index]);
  questNumbers = questNumbers.filter(
    (item) =>
      !(item.x === questNumbers[index].x || item.y === questNumbers[index].y)
  );
  return getOneNumberForEachRow(questNumbers, numbers);
};

export const getRandomElementOfArray = (number, array, elements, max) => {
  if (elements.length === number) {
    return elements;
  }
  const index = getRandomNumber(0, array.length);

  const sameRow = elements.filter((ele) => ele.x === array[index].x);
  const sameColumn = elements.filter((ele) => ele.y === array[index].y);
  const isDuplicated = elements.some(
    (ele) => ele.y === array[index].y && ele.x === array[index].x
  );

  if (
    sameRow.length === max - 1 ||
    sameColumn.length === max - 1 ||
    isDuplicated
  ) {
    return getRandomElementOfArray(number, array, elements, max);
  }
  elements.push(array[index]);
  array.splice(index, 1);
  return getRandomElementOfArray(number, array, elements, max);
};

export const getTimeMinuteSencond = (numberOfSecond) => {
  const hour = Math.floor(numberOfSecond / 3600);
  const minute = Math.floor((numberOfSecond - hour * 3600) / 60);
  const second = numberOfSecond - hour * 3600 - minute * 60;
  return { hour, second, minute };
};
