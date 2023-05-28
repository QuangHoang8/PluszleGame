import { RenderBackground } from "./renderBackground.js";
export class RenderInGameDisplay {
  constructor() {
    this.slideIndex=1
  }
  execute() {
    const body = document.querySelector("body");
    const section = document.createElement("section");
    section.setAttribute("id", "in-game");
    const table = this.renderTable();
    // const ribbon = this.renderRibbon();
    // const level=this.renderLevelGame()
    // const slideButton=this.renderSlideButton()
    // const startButton=this.renderStartButton(level,body,section)

    const renderBackground = new RenderBackground([table]);
    const background = renderBackground.execute();
    section.append(background)
    const script = document.querySelector("script");
    body.insertBefore(section,script);
    this.renderRow()
  }

  renderTable() {
    const table = document.createElement("div");
    table.classList.add("table-number");
    return table;
  }

  renderRibbon() {
    const ribbon = document.createElement("div");
    ribbon.classList.add("ribbon");

    const strongContext = document.createElement("strong");
    strongContext.classList.add("ribbon-content");
    strongContext.innerText = "Pluszle";

    ribbon.append(strongContext);
    return ribbon;
  }

  renderLevelGame() {
    const levelNames = [
      { text: "Easy", value: "4" },
      { text: "Medium", value: "6" },
      { text: "Hard", value: "8" },
    ];
    const elements = levelNames.map((item, index) => {
      const ribbon = document.createElement("div");
      ribbon.classList.add("level-ribbon");
      ribbon.classList.add("mySlides");
      ribbon.classList.add(`${item.text.toLowerCase()}`);
      ribbon.setAttribute("value", item.value);
      if(index!==0){
        ribbon.classList.add("display-none");
      }

      const span = document.createElement("span");
      span.classList.add("award-ribbon-text");
      span.innerText=item.text
      ribbon.append(span);

      return ribbon;
    });
    return elements
  }

  renderSlideButton(){
    const prev = document.createElement("a");
    prev.classList.add("prev")
    prev.innerHTML="&#10094;"
    prev.onclick=()=>this.plusSlides(-1)

    const next = document.createElement("a");
    next.classList.add("next")
    next.innerHTML="&#10095;"
    next.onclick=()=>this.plusSlides(1)

    return [prev,next]
  }

  renderStartButton(level,body,section){
    const button = document.createElement("div");
    button.classList.add("support");
    button.setAttribute("id", "start-game");

    const span=document.createElement("span");
    span.innerText="Start game"
    button.append(span)
    button.onclick=()=>this.startGame(level,body,section)

    return button
  }



// Next/previous controls
plusSlides(n) {
  this.showSlides((this.slideIndex += n));
}

showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    this.slideIndex = 1;
  }
  if (n < 1) {
    this.slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.add("display-none");
  }
  slides[this.slideIndex - 1].classList.remove("display-none");
}

startGame(level,body,section){
  let rows=0;
    for (let i = 0; i < level.length; i++) {
    if (!level[i].classList.contains("display-none")) {
      rows = parseInt(level[i].getAttribute("value"));
    }
    
  }
  body.removeChild(section)
  console.log("row: ",rows)
}

renderRow() {
  const table_number = document.querySelector(".table-number");
  const row2 = document.createElement("div");
  row2.classList.add("flex", "row");
  console.log(table_number);
  for (let i = 0; i < 4; i++) {
    const row1 = document.createElement("div");
    row1.classList.add("flex", "row");
    for (let j = 0; j < rows; j++) {
      const div_number = document.createElement("div");
      div_number.innerHTML = "<span></span>";
      div_number.classList.add("number");
      row1.prepend(div_number);
    }
    const div_sum = document.createElement("div");
    div_sum.innerHTML = "<span></span>";
    div_sum.classList.add("number", "sum");
    row1.appendChild(div_sum);
    table_number.prepend(row1);
  }
  // render dòng tổng cuối

  for (let i = 0; i < rows; i++) {
    const div_sum = document.createElement("div");
    div_sum.innerHTML = "<span></span>";
    div_sum.classList.add("number", "sum");
    row2.appendChild(div_sum);
  }

  table_number.appendChild(row2);
  return table_number;
}


}

