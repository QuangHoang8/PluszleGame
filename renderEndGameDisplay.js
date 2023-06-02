import { RenderBackground } from "./renderBackground.js";

export class RenderEndGameDisplay {
  constructor({numberOfSecond,numberOfUndo,numberOfClickPlus,numberOfClickPlusAll}) {
    this.numberOfSecond=numberOfSecond
    this.numberOfUndo=numberOfUndo
    this.numberOfClickPlus=numberOfClickPlus
    this.numberOfClickPlusAll=numberOfClickPlusAll
    this.hour=0
    this.minute=0
    this.second=0
  }
  execute() {
    this.getTimeMinuteSencond()
    const body = document.querySelector("body");
    const section = document.createElement("section");
    section.setAttribute("id", "end-game");
    const ribbon = this.renderRibbon();
    const timeUndoResult=this.renderTimeUndoResult()
    const supportResult=this.renderSupportResult()
    const button=this.renderButton()

    const renderBackground = new RenderBackground([
    
      ribbon,
      timeUndoResult,
      supportResult,
      button
    ]);
    const background = renderBackground.execute();
    const script = document.querySelector("script");
    section.append(background);
    body.insertBefore(section, script);
  }

  getTimeMinuteSencond(){
    this.hour=Math.floor(this.numberOfSecond/3600)
   this.minute=Math.floor((this.numberOfSecond-this.hour*3600)/60)
    this.second=this.numberOfSecond-this.hour*3600-this.minute*60
  }


  renderRibbon() {
    const ribbon = document.createElement("div");
    ribbon.classList.add("award-ribbon");

    const span = document.createElement("span");
    span.classList.add("award-ribbon-text");
    span.innerText = "Great Job";

    ribbon.append(span);
    return ribbon;
  }

  renderTimeUndoResult() {
    const parentTimediv = document.createElement("div");
    parentTimediv.classList.add("flex", "flex-between", "time-undo", "end");

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time", "flex", "margin-center")

    const timeImgDiv = document.createElement("div");
    timeImgDiv.classList.add("time-img")

    const imgDiv = document.createElement("img");
    imgDiv.setAttribute("src","img/chronometer1.svg")
    timeImgDiv.append(imgDiv)

    const countTimeDiv = document.createElement("div");
    countTimeDiv.classList.add("count-time", "flex", "end")

    const hourDiv = document.createElement("div");
    hourDiv.innerText=this.hour

    const colonDiv1 = document.createElement("div");
    colonDiv1.innerText = ":";

    const colonDiv2 = document.createElement("div");
    colonDiv2.innerText = ":";

    const minuteDiv = document.createElement("div");
    minuteDiv.innerText=this.minute

    const secondDiv = document.createElement("div");
    secondDiv.innerText=this.second

    countTimeDiv.append(hourDiv)
    countTimeDiv.append(colonDiv1)
    countTimeDiv.append(minuteDiv)
    countTimeDiv.append(colonDiv2)
    countTimeDiv.append(secondDiv)

    timeDiv.append(timeImgDiv)
    timeDiv.append(countTimeDiv)

    const undoDiv = document.createElement("div");
    undoDiv.classList.add("undo-end", "flex", "margin-center");

    const undoImgDiv = document.createElement("div");
    undoImgDiv.classList.add("undo-img");

    const imgUndo = document.createElement("img");
    imgUndo.setAttribute("src","img/undo1.svg")
    undoImgDiv.append(imgUndo)

    const countUndoDiv = document.createElement("div");
    countUndoDiv.classList.add("count-undo","end");
    countUndoDiv.innerText=this.numberOfUndo
    undoDiv.append(undoImgDiv)
    undoDiv.append(countUndoDiv)

    parentTimediv.append(timeDiv)
    parentTimediv.append(undoDiv)

    
    return parentTimediv;
  }

  renderSupportResult() {
    const parentSupportDiv = document.createElement("div");
    parentSupportDiv.classList.add("flex", "flex-around", "button-support-result");

    const plusDiv = document.createElement("div");
    plusDiv.classList.add("block-support")

    const plusImg = document.createElement("img");
    plusImg.setAttribute("src","img/plus1.svg")
    plusDiv.append(plusImg)

    const countPlusDiv = document.createElement("div");
    countPlusDiv.classList.add("count-undo","end","count-plus")
    countPlusDiv.innerText=this.numberOfClickPlus

  const plusAllDiv = document.createElement("div");
  plusAllDiv.classList.add("support-end")

  const plusAllImgDiv = document.createElement("div");
  plusAllImgDiv.classList.add("block-support")

    const plusAllImg = document.createElement("img");
    plusAllImg.setAttribute("src","img/add1.svg")
    plusAllImgDiv.append(plusAllImg)
    plusAllDiv.append(plusAllImgDiv)

    const countPlusAllDiv = document.createElement("div");
    countPlusAllDiv.classList.add("count-undo","end","count-plusAll")
    countPlusAllDiv.innerText=this.numberOfClickPlusAll

    parentSupportDiv.append(plusDiv)
    parentSupportDiv.append(countPlusDiv)
    parentSupportDiv.append(plusAllDiv)
    parentSupportDiv.append(countPlusAllDiv)
    return parentSupportDiv;
  }

  renderButton() {
    const parentButtonDiv = document.createElement("div");
    parentButtonDiv.classList.add("flex", "flex-around", "button-support");

    const parentRestartDiv = document.createElement("div");
    parentRestartDiv.classList.add("support")

    const restartDiv = document.createElement("div");
    restartDiv.classList.add("block-support",'end')
    restartDiv.innerText="Restart"
    parentRestartDiv.append(restartDiv)

    const parentExitDiv = document.createElement("div");
    parentExitDiv.classList.add("support")

    const exitDiv = document.createElement("div");
    exitDiv.classList.add("block-support",'end')
    exitDiv.innerText="Exit"
    parentExitDiv.append(exitDiv)

    parentButtonDiv.append(parentRestartDiv)
    parentButtonDiv.append(parentExitDiv)
  
    return parentButtonDiv;
  }

  
}


