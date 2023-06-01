import { RenderBackground } from "./renderBackground.js";
import {
  getRandomNumber,
  getRandomElementOfArray,
  getOneNumberForEachRow,
} from "./common.js";
export class RenderInGameDisplay {
  constructor({ rows }) {
    this.rows = rows;
    this.chosenNumbers = [];
    this.answerNumbers = [];
    this.divNumbers = [];
    this.spanNumbers = [];
  }
  execute() {
    const body = document.querySelector("body");
    const section = document.createElement("section");
    section.setAttribute("id", "in-game");
    const table = this.renderTable();
    const clockAndUndoSymbol = this.renderClockAndUndoSymbol();
    const supportButton = this.renderSupportButton();
    // const slideButton=this.renderSlideButton()
    // const startButton=this.renderStartButton(level,body,section)

    const renderBackground = new RenderBackground([
      clockAndUndoSymbol,
      table,
      supportButton,
    ]);
    const background = renderBackground.execute();
    section.append(background);

    const script = document.querySelector("script");
    body.insertBefore(section, script);
    const questNumbers = this.createNumberForQuest();
    this.answerNumbers = this.creatNumberForAnswers([...questNumbers]);
    console.log("answerNumbers: ", this.answerNumbers);
    this.renderRow([...questNumbers]);
  }

  renderTable() {
    const table = document.createElement("div");
    table.classList.add("table-number");
    return table;
  }

  renderClockAndUndoSymbol() {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("flex", "flex-between", "time-undo");

    const clock = this.renderClock();
    const undoSymbol = this.renderCountUndo();
    parentDiv.append(clock);
    parentDiv.append(undoSymbol);

    return parentDiv;
  }

  renderClock() {
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("flex", "time", "margin-center");

    const timeImgDiv = document.createElement("div");
    timeImgDiv.classList.add("time-img");

    const timeImg = document.createElement("img");
    timeImg.setAttribute("src", "img/chronometer.svg");
    timeImg.setAttribute("alt", "clock-img");

    timeImgDiv.append(timeImg);
    timeDiv.append(timeImgDiv);

    const countTimeDiv = document.createElement("div");
    countTimeDiv.classList.add("count-time");
    countTimeDiv.classList.add("flex");

    const hourDiv = document.createElement("div");
    hourDiv.innerText = 0;

    const colonDiv1 = document.createElement("div");
    colonDiv1.innerHTML = ":";

    const colonDiv2 = document.createElement("div");
    colonDiv2.innerHTML = ":";

    const minuteDiv = document.createElement("div");
    minuteDiv.innerText = "00";

    const secondDiv = document.createElement("div");
    secondDiv.innerText = "00";

    countTimeDiv.append(hourDiv);
    countTimeDiv.append(colonDiv1);
    countTimeDiv.append(minuteDiv);
    countTimeDiv.append(colonDiv2);
    countTimeDiv.append(secondDiv);

    timeDiv.append(countTimeDiv);
    return timeDiv;
  }

  renderCountUndo() {
    const undoDiv = document.createElement("div");
    undoDiv.classList.add("time-img", "flex", "margin-center");

    const undoImgDiv = document.createElement("div");
    undoImgDiv.classList.add("undo-img");

    const undoImg = document.createElement("img");
    undoImg.setAttribute("src", "img/undo.svg");
    undoImg.setAttribute("alt", "undo-img");

    undoImgDiv.append(undoImg);

    const undoCount = document.createElement("div");
    undoCount.classList.add("count-undo");

    undoDiv.append(undoImgDiv);
    undoDiv.append(undoCount);

    return undoDiv;
  }

  renderSupportButton() {
    const supportDiv = document.createElement("div");
    supportDiv.classList.add("flex", "flex-around", "button-support");

    const supportTotalChosenDiv = document.createElement("div");
    supportTotalChosenDiv.classList.add("support");
    supportTotalChosenDiv.setAttribute("id", "plus");

    const supportTotalChosenImgDiv = document.createElement("img");
    supportTotalChosenImgDiv.classList.add("block-support");
    supportTotalChosenImgDiv.setAttribute("src", "img/plus.svg");
    supportTotalChosenImgDiv.setAttribute("alt", "plus-img");

    supportTotalChosenDiv.append(supportTotalChosenImgDiv);

    const supportTotalDiv = document.createElement("div");
    supportTotalDiv.classList.add("support");
    supportTotalDiv.setAttribute("id", "plusAll");

    const supportTotalImgDiv = document.createElement("img");
    supportTotalImgDiv.classList.add("block-support");
    supportTotalImgDiv.setAttribute("src", "img/add.svg");
    supportTotalImgDiv.setAttribute("alt", "plus-all-img");

    supportTotalDiv.append(supportTotalChosenImgDiv);

    supportDiv.append(supportTotalChosenDiv);
    supportDiv.append(supportTotalDiv);
    return supportDiv;
  }

  renderSlideButton() {
    const prev = document.createElement("a");
    prev.classList.add("prev");
    prev.innerHTML = "&#10094;";
    prev.onclick = () => this.plusSlides(-1);

    const next = document.createElement("a");
    next.classList.add("next");
    next.innerHTML = "&#10095;";
    next.onclick = () => this.plusSlides(1);

    return [prev, next];
  }

  renderRow(questNumbers) {
    console.log("questNumbers2: ", questNumbers);
    const table_number = document.querySelector(".table-number");
    const width = this.getWidthForNumberSpan();
    const fontSize = this.getFontSizeForNumberSpan();
    const totalColums = this.getTotalOfNumberColumns();
    const totalRows = this.getTotalOfNumberRows();

    const row2 = document.createElement("div");
    row2.classList.add("flex", "row");
    for (let i = 0; i < this.rows; i++) {
      const row1 = document.createElement("div");
      row1.classList.add("flex", "row");
      for (let j = 0; j < this.rows; j++) {
        const div_number = this.createNumberDiv(
          fontSize,
          this.getNumber(i, j, questNumbers),
          width,
          false
        );
        row1.append(div_number);
      }

      const div_sum = this.createNumberDiv(fontSize, totalRows[i], width, true);
      row1.appendChild(div_sum);
      table_number.append(row1);
    }
    // render dòng tổng cuối

    for (let i = 0; i < this.rows; i++) {
      const div_sum = this.createNumberDiv(
        fontSize,
        totalColums[i],
        width,
        true
      );
      row2.appendChild(div_sum);
    }
    console.log("table_number", table_number);
    table_number.appendChild(row2);
  }

  createNumberForQuest() {
    const questNumbers = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows; j++) {
        questNumbers.push({ x: i, y: j, value: getRandomNumber(1, 10) });
      }
    }
    console.log("questNumbers1: ", questNumbers);
    return questNumbers;
  }

  getNumber(x, y, questNumbers) {
    return questNumbers.find((item) => item.x === x && item.y === y);
  }

  creatNumberForAnswers(questNumbers) {
    const firstNumbers = getOneNumberForEachRow([...questNumbers], []);
    const { min, max } = this.getMinAndMaxNumberOfAnswer();
    const amountOfNumber = getRandomNumber(min, max);
    const answerNumbers = getRandomElementOfArray(
      amountOfNumber,
      [...questNumbers],
      firstNumbers,
      this.rows
    );
    return answerNumbers;
  }

  getTotalOfNumberColumns() {
    return this.getTotalOfNumbers("y");
  }

  getTotalOfNumberRows() {
    return this.getTotalOfNumbers("x");
  }

  getTotalOfNumbers(field) {
    const totalOfNumbers = [];
    for (let i = 0; i < this.rows; i++) {
      const numbers = this.answerNumbers.filter((item) => item[field] === i);
      const total = numbers.reduce((sum, item) => {
        return sum + item.value;
      }, 0);
      totalOfNumbers.push(total);
    }
    console.log(`totalOfNumbers ${field}: `, totalOfNumbers);
    return totalOfNumbers;
  }

  getMinAndMaxNumberOfAnswer() {
    switch (this.rows) {
      case 4:
        return { min: 6, max: 10 };

      case 6:
        return { min: 15, max: 24 };

      default:
        return { min: 30, max: 42 };
    }
  }

  getWidthForNumberSpan() {
    switch (this.rows) {
      case 4:
        return 80;

      case 6:
        return 60;

      default:
        return 40;
    }
  }

  getFontSizeForNumberSpan() {
    switch (this.rows) {
      case 4:
        return 45;

      case 6:
        return 35;

      default:
        return 25;
    }
  }

  createNumberDiv(fontSize, item, width, isTotal) {
    const span_number = this.createNumberSpan(fontSize, item);
    const div_number = document.createElement("div");
    div_number.classList.add("number");
    if (isTotal) {
      div_number.classList.add("sum");
    } else {
      div_number.onclick = () => this.handleChose(div_number, item);
    }
    div_number.style.width = `${width}px`;
    div_number.style.height = `${width}px`;
    div_number.append(span_number);
    this.divNumbers.push(div_number);
    this.spanNumbers.push(span_number);
    return div_number;
  }

  createNumberSpan(fontSize, item) {
    const span_number = document.createElement("span");
    span_number.innerText = typeof item === "object" ? item.value : item;
    span_number.classList.add("number-span");
    span_number.style.fontSize = `${fontSize}px`;
    return span_number;
  }

  handleChose(div_number, item) {
    if (typeof item === "object") {
      const index = this.chosenNumbers.findIndex(
        (element) => element.x === item.x && element.y === item.y
      );
      div_number.classList.toggle("background-chose");
      if (index !== -1) {
        this.chosenNumbers.splice(index, 1);
      } else {
        this.chosenNumbers.push(item);
      }
      if (this.checkWin()) {
        this.finishGame();
      }
    }
    console.log("chosenNumbers: ", this.chosenNumbers);
  }

  checkWin() {
    const coordinatesOfAnswers = this.chosenNumbers.map(
      (item) => `${item.x};${item.y}`
    );
    return this.answerNumbers.every((item) =>
      coordinatesOfAnswers.includes(`${item.x};${item.y}`)
    );
  }

  finishGame() {
    let time = 0;
    for (let i = 0; i < this.divNumbers.length; i++) {
      ++time;
      this.changeColorForDivNumber(index, time);
    }
  }

  changeColorForDivNumber(index, time) {
    const { divClass, spanClass } = this.getClassForDivAndSpan(index);
    setTimeout(() => {
      this.spanNumbers[index].classList.add(spanClass);
      this.divNumbers[index].classList.add(divClass);
    }, time * 100);
  }

  getClassForDivAndSpan(index) {
    if (this.divNumbers[index].classList.contains("sum")) {
      return {
        divClass: "win-background-sum",
        spanClass: "win-color-number-notChose",
      };
    } else if (this.divNumbers[index].classList.contains("background-chose")) {
      return {
        divClass: "win-background-number",
        spanClass: "win-color-number-chose",
      };
    } else {
      return {
        divClass: "win-background-number",
        spanClass: "win-color-number-notChose",
      };
    }
  }
}
