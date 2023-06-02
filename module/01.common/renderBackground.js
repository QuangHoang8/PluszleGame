export class RenderBackground {
  constructor(element) {
    this.element = element;
  }
  execute() {
    return this.createBackground();
  }
  createBackground() {
    const background_div = document.createElement("div");
    background_div.classList.add("container");

    const book_div = document.createElement("div");
    book_div.classList.add("book");

    const angle_top_1 = document.createElement("div");
    angle_top_1.classList.add("angle-top-1");

    const angle_top_2 = this.createCircle();
    book_div.appendChild(angle_top_1);
    book_div.appendChild(angle_top_2);

    if (this.element) {
      if (Array.isArray(this.element)) {
        this.element.forEach((item) => {
          book_div.append(item);
        });
      } else {
        book_div.appendChild(this.element);
      }
    }
    background_div.appendChild(book_div);
    return background_div;
  }

  createCircle() {
    const angle_top_2 = document.createElement("div");
    angle_top_2.classList.add("angle-top-2");
    for (let i = 0; i < 7; i++) {
      const circleAtAngle = document.createElement("div");
      circleAtAngle.classList.add("circleOnTop");
      circleAtAngle.style.left = `${-90 + i * 13}px`;
      angle_top_2.append(circleAtAngle);
    }
    for (let i = 1; i < 60; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      angle_top_2.append(circle);
    }
    return angle_top_2;
  }
}
