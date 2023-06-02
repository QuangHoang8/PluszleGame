import { RenderBackground } from "./renderBackground.js";
import {
  getRandomNumber,
  getRandomElementOfArray,
  getOneNumberForEachRow,
} from "./common.js";
import {RenderEndGameDisplay} from './renderEndGameDisplay.js'
export class RenderInGameDisplay {
  constructor({ rows }) {
    this.rows = rows;
    this.chosenNumbers = [];
    this.questNumbers = [];
    this.answerNumbers = [];
    this.divNumbers = [];
    this.divNumberHasTotalDivs = [];
    this.spanNumbers = [];
    this.spanNumberHasTotalDivs = [];
    this.spanTotalDivs = [];
    this.numberOfUndo=0
    this.numberOfClickPlus=0
    this.numberOfClickPlusAll=0
    this.undoCountDiv={}
    this.numberOfSecond=0
    this.timeDiv=[]
    this.intervalId=0
    this.body={}
    this.section={}

  }
  execute() {
    const body = document.querySelector("body");
    this.body=body
    const section = document.createElement("section");
    this.section=section
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
    this.questNumbers=questNumbers

    this.answerNumbers = this.creatNumberForAnswers([...questNumbers]);
    console.log("answerNumbers: ", this.answerNumbers);
    this.renderRow([...questNumbers]);
    this.countTime()
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

  countTime(){   
    this.intervalId=setInterval(()=>{
      this.numberOfSecond+=1;
      const time=Math.floor(this.numberOfSecond/3600)
      const minute=Math.floor((this.numberOfSecond-time*3600)/60)
      const second=this.numberOfSecond-time*3600-minute*60
      this.timeDiv[0].innerText=time
      this.timeDiv[1].innerText=minute.toString().padStart(2,'0')
      this.timeDiv[2].innerText=second.toString().padStart(2,'0')
    },1000)
    console.log("this.intervalId: ",this.intervalId)
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
    colonDiv1.innerText = ":";

    const colonDiv2 = document.createElement("div");
    colonDiv2.innerText = ":";

    const minuteDiv = document.createElement("div");
    minuteDiv.innerText = "00";

    const secondDiv = document.createElement("div");
    secondDiv.innerText = "00";

    countTimeDiv.append(hourDiv);
    countTimeDiv.append(colonDiv1);
    countTimeDiv.append(minuteDiv);
    countTimeDiv.append(colonDiv2);
    countTimeDiv.append(secondDiv);

    this.timeDiv.push(...[hourDiv,minuteDiv,secondDiv])

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
    undoCount.innerText=this.numberOfUndo
    this.undoCountDiv=undoCount

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
    supportTotalChosenDiv.onmousedown=()=>this.handlePlusChosenMouseDown()
    supportTotalChosenDiv.onmouseup=()=>this.handleMouseUp()

    const supportTotalChosenImgDiv = document.createElement("img");
    supportTotalChosenImgDiv.classList.add("block-support");
    supportTotalChosenImgDiv.setAttribute("src", "img/plus.svg");
    supportTotalChosenImgDiv.setAttribute("alt", "plus-img");

    supportTotalChosenDiv.append(supportTotalChosenImgDiv);

    const supportTotalDiv = document.createElement("div");
    supportTotalDiv.classList.add("support");
    supportTotalDiv.setAttribute("id", "plusAll");
    supportTotalDiv.onmousedown=()=>this.handlePlusAllMouseDown()
    supportTotalDiv.onmouseup=()=>this.handleMouseUp()


    const supportTotalImgDiv = document.createElement("img");
    supportTotalImgDiv.classList.add("block-support");
    supportTotalImgDiv.setAttribute("src", "img/add.svg");
    supportTotalImgDiv.setAttribute("alt", "plus-all-img");

    supportTotalDiv.append(supportTotalChosenImgDiv);

    supportDiv.append(supportTotalChosenDiv);
    supportDiv.append(supportTotalDiv);
    return supportDiv;
  }

  handlePlusChosenMouseDown(){
    this.numberOfClickPlus+=1
    const totalColums = this.getTotalOfChosenNumberColumns();
    const totalRows = this.getTotalOfChosenNumberRows();
    this.fillNumberForTotalDiv(totalColums,totalRows)
  }

  getTotalOfChosenNumberColumns() {
    return this.getTotalOfNumbers("y",false,true);
  }

  getTotalOfChosenNumberRows() {
    return this.getTotalOfNumbers("x",false,true);
  }

  handlePlusAllMouseDown(){
    this.numberOfClickPlusAll+=1
    const totalColums = this.getTotalOfNumberColumns();
    const totalRows = this.getTotalOfNumberRows();

    this.fillNumberForTotalDiv(totalColums,totalRows)
  }

  getTotalOfNumberColumns() {
    return this.getTotalOfNumbers("y");
  }

  getTotalOfNumberRows() {
    return this.getTotalOfNumbers("x");
  }

  handleMouseUp(){
    const totalColums = this.getTotalOfNumberColumnAnswers();
    const totalRows = this.getTotalOfNumberRowAnswers();
    this.fillNumberForTotalDiv(totalColums,totalRows)
   
  }

  fillNumberForTotalDiv(totalColums,totalRows){
    this.spanTotalDivs.forEach((item,index)=>{
      if(index<this.rows){
        item.innerText=totalRows[index]
      } else {
        item.innerText=totalColums[index-this.rows]
      }      
    })
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
    const totalColums = this.getTotalOfNumberColumnAnswers();
    const totalRows = this.getTotalOfNumberRowAnswers();

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

      const div_sum = this.createNumberDiv(fontSize, totalRows[i], width, true,false,i);
      row1.appendChild(div_sum);
      table_number.append(row1);
    }
    // render dòng tổng cuối

    for (let i = 0; i < this.rows; i++) {
      const div_sum = this.createNumberDiv(
        fontSize,
        totalColums[i],
        width,
        false,true,i
      );
      row2.appendChild(div_sum);
    }
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

  getTotalOfNumberColumnAnswers() {
    return this.getTotalOfNumbers("y",true);
  }

  getTotalOfNumberRowAnswers() {
    return this.getTotalOfNumbers("x",true);
  }

  getTotalOfNumbers(field,isAnswer,isChosen) {
    const dataSource=!!isAnswer?this.answerNumbers:!!isChosen?this.chosenNumbers:this.questNumbers
    console.log("dataSource: ",dataSource)
    const totalOfNumbers = [];
    for (let i = 0; i < this.rows; i++) {
      const numbers = dataSource.filter((item) => item[field] === i);
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

  createNumberDiv(fontSize, item, width, isTotalRow,isTotalColumn,index) {
    const span_number = this.createNumberSpan(fontSize, item);
    const div_number = document.createElement("div");
    div_number.classList.add("number");
    if (isTotalRow) {
      div_number.classList.add("sum");
      div_number.onclick = () => this.handleNotChose( true,index);
    } else if(isTotalColumn){
      div_number.classList.add("sum");
      div_number.onclick = () => this.handleNotChose(false,index);
    } else {
      div_number.onclick = () => this.handleChose(div_number, item);
    }
    div_number.style.width = `${width}px`;
    div_number.style.height = `${width}px`;
    div_number.append(span_number);
    if(!isTotalRow&&!isTotalColumn){
      this.divNumbers.push(div_number);
      this.spanNumbers.push(span_number);
    } else {
      this.spanTotalDivs.push(span_number)
    }
    
    this.divNumberHasTotalDivs.push(div_number);
    this.spanNumberHasTotalDivs.push(span_number);
    return div_number;
  }

  createNumberSpan(fontSize, item) {
    const span_number = document.createElement("span");
    span_number.innerText = typeof item === "object" ? item.value : item;
    span_number.classList.add("number-span");
    span_number.style.fontSize = `${fontSize}px`;
    return span_number;
  }

  handleNotChose(isTotalRow,index){
    const field=isTotalRow?"x":"y";

    console.log('this.questNumbers: ',this.questNumbers)

    const indexs=this.questNumbers.map(
      (element,i) => {
        if(element[field]===index){
          return i
        }
      }
    ).filter(i=>i!==undefined);
    indexs.forEach(i=>{
        if(!this.divNumbers[i].classList.contains("background-chose")){
          this.spanNumbers[i].classList.add("color-not-chose")
        }
      })
    
  }

  handleChose(div_number, item) {
    if (typeof item === "object") {   
      const index = this.questNumbers.findIndex(
        (element) => element.x === item.x && element.y === item.y
      );
      const hasClassNotChoose=this.spanNumbers[index].classList.contains("color-not-chose")
      if(hasClassNotChoose){    
        this.spanNumbers[index].classList.remove("color-not-chose")
      } else{
        const index = this.chosenNumbers.findIndex(
          (element) => element.x === item.x && element.y === item.y
        );
        div_number.classList.toggle("background-chose");
        if (index !== -1) {
          this.chosenNumbers.splice(index, 1);
        } else {
          this.numberOfUndo+=1
          this.undoCountDiv.innerText=this.numberOfUndo
          this.chosenNumbers.push(item);
        }
        if (this.checkWin()) {
          clearInterval(this.intervalId)
         const time= this.finishGame();
         console.log("time: ",time)
         setTimeout(()=>{
          this.body.removeChild(this.section);
          const renderEndGameDisplay = new RenderEndGameDisplay({ numberOfSecond:this.numberOfSecond,numberOfUndo:this.numberOfUndo,numberOfClickPlus:this.numberOfClickPlus,numberOfClickPlusAll:this.numberOfClickPlusAll });
          renderEndGameDisplay.execute();
         },time*100+1000)
          
        }
      }
     
    }
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
    for (let i = 0; i < this.divNumberHasTotalDivs.length; i++) {
      ++time;
      this.changeColorForDivNumber(i, time);
    }
    return time
  }

  changeColorForDivNumber(index, time) {
    const { divClass, spanClass } = this.getClassForDivAndSpan(index);
    
    setTimeout(() => {
      this.spanNumberHasTotalDivs[index].classList.add(spanClass);
      this.divNumberHasTotalDivs[index].classList.add(divClass);
    }, time * 100);
  }

  getClassForDivAndSpan(index) {
    if (this.divNumberHasTotalDivs[index].classList.contains("sum")) {
      return {
        divClass: "win-background-sum",
        spanClass: "win-color-number-notChose",
      };
    } else if (this.divNumberHasTotalDivs[index].classList.contains("background-chose")) {
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
