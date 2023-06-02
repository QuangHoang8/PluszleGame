import { RenderBackground } from "../01.common/renderBackground.js";
import { RenderInGameDisplay } from "../03.in-game/renderInGameDisplay.js";

class RenderStartGameDisplay {
  constructor() {
    this.slideIndex = 1;
  }
  execute() {
    const body = document.querySelector("body");
    const section = document.createElement("section");
    section.setAttribute("id", "begin-game");
    const cross = this.renderCross();
    const ribbon = this.renderRibbon();
    const level = this.renderLevelGame();
    const slideButton = this.renderSlideButton();
    const startButton = this.renderStartButton(level, body, section);

    const renderBackground = new RenderBackground([
      cross,
      ribbon,
      ...level,
      ...slideButton,
      startButton,
    ]);
    const background = renderBackground.execute();
    const script = document.querySelector("script");
    section.append(background);
    body.insertBefore(section, script);
  }

  renderCross() {
    const cross = document.createElement("div");
    cross.classList.add("icon");
    const square = document.createElement("div");
    square.classList.add("square");

    const square1 = document.createElement("div");
    square1.classList.add("square1");

    cross.append(square);
    cross.append(square1);

    return cross;
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
      if (index !== 0) {
        ribbon.classList.add("display-none");
      }

      const span = document.createElement("span");
      span.classList.add("award-ribbon-text");
      span.innerText = item.text;
      ribbon.append(span);

      return ribbon;
    });
    return elements;
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

  renderStartButton(level, body, section) {
    const button = document.createElement("div");
    button.classList.add("support");
    button.setAttribute("id", "start-game");

    const span = document.createElement("span");
    span.innerText = "Start game";
    button.append(span);
    button.onclick = () => this.startGame(level, body, section);

    return button;
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

  startGame(level, body, section) {
    let rows = 0;
    for (let i = 0; i < level.length; i++) {
      if (!level[i].classList.contains("display-none")) {
        rows = parseInt(level[i].getAttribute("value"));
      }
    }

    body.removeChild(section);
    const renderInGameDisplay = new RenderInGameDisplay({ rows });
    renderInGameDisplay.execute();
  }
}

export const renderStartGameDisplay = new RenderStartGameDisplay();
