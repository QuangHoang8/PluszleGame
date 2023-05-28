import {renderStartGameDisplay} from "./renderStartGameDisplay.js"; 

let book = document.querySelector(".book");
let angle_top_2 = document.querySelectorAll(".angle-top-2");
const count_undo = document.querySelector(".count-undo");
const begin_game = document.querySelector("#begin-game");
const start_game = document.querySelector("#start-game");
const in_game = document.querySelector("#in-game");
const end_game = document.querySelector("#end-game");
const level = document.querySelectorAll(".level-ribbon");
const hour_end = document.querySelector(".hour-end");
const minute1_end = document.querySelector(".minute1-end");
const second1_end = document.querySelector(".second1-end");
const minute2_end = document.querySelector(".minute2-end");
const second2_end = document.querySelector(".second2-end");
const count_undo_end = document.querySelector("#count-undo");
const count_plus = document.querySelector(".count-plus");
const count_plusAll = document.querySelector(".count-plusAll");

// Render brack ground cho trang
function renderStartGame() {
  renderStartGameDisplay.execute()
}
renderStartGame();

// // Chọn level
// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// function showSlides(n) {
//   let slides = document.getElementsByClassName("mySlides");
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (let i = 0; i < slides.length; i++) {
//     slides[i].classList.add("display-none");
//   }
//   slides[slideIndex - 1].classList.remove("display-none");
// }
//  Ra đề bài

// Lấy số dòng theo level
let rows = 0;
function init() {
  renderRow();
  console.log(createQuest(rows));
  console.log(createAnsRow(rows));
  checkNotChoseCol();
  renderNumber();
  renderSumNumber();

  createArrChose();

  time();
  choseAns();
  removeCol();
  removeRow();
}

// // Chọn level
// start_game.addEventListener("click", function () {
//   for (let i = 0; i < level.length; i++) {
//     if (!level[i].classList.contains("display-none")) {
//       rows = parseInt(level[i].getAttribute("value"));
//     }
//   }
//   init();
//   begin_game.style.display = "none";
//   in_game.style.display = "block";
// });

// Tạo khung số

function renderRow() {
  const table_number = document.querySelector(".table-number");
  const row2 = document.createElement("div");
  row2.classList.add("flex", "row");
  console.log(table_number);
  for (let i = 0; i < rows; i++) {
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

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Tạo mảng số đề bài
let arrQuest = [];
function createQuest() {
  for (let i = 0; i < rows; i++) {
    let arr = [];
    for (let j = 0; j < rows; j++) {
      arr.push(random(1, 10));
    }
    arrQuest.push(arr);
  }
  return arrQuest;
}

// Tạo function kiểm tra trùng
function checkDup(i, arr) {
  for (let k = 0; k < arr.length; k++) {
    if (i == arr[k]) {
      return false;
    }
  }
  return true;
}
// Đếm số lượng xuất hiện của phần tử
function countOccurrences(arr) {
  return arr.reduce(function (a, b) {
    a[b] = a[b] + 1 || 1;
    return a;
  }, {});
}
// Chọn hàng ngang
let arrAnsRow = [];
function createAnsRow() {
  let fullIndex = [];
  for (let i = 0; i < rows; i++) {
    //   random số ô chọn trên 1 dòng
    let arr = [];
    let countAns = random(1, rows - 1);
    let arrIndex = [];
    while (arrIndex.length < countAns + 1) {
      // Chọn kết quả
      let index = random(0, rows);
      if (checkDup(index, arrIndex)) {
        arrIndex.push(index);
        fullIndex.push(index);
        arr.push([i, index, arrQuest[i][index]]);
      }
    }
    arrAnsRow.push(arr);
  }

  let obj = countOccurrences(fullIndex);
  for (let prop in obj) {
    if (obj[prop] == rows) {
      for (let i = 0; i < arrAnsRow.length; i++) {
        for (let j = 0; j < arrAnsRow[i].length; j++) {
          if (arrAnsRow[i][j][1] == parseInt(prop) && arrAnsRow[i].length > 2) {
            arrAnsRow[i].splice(j, 1);
            flag = false;
            break;
          }
        }
      }
    }
  }

  return arrAnsRow;
}

// Kiểm tra cột nào chưa được chọn thì random số phần tử được chọn ở cột đấy
function checkNotChoseCol() {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr.push(i);
  }
  for (let i = 0; i < arrAnsRow.length; i++) {
    for (let j = 0; j < arrAnsRow[i].length; j++) {
      for (let k = 0; k < arr.length; k++) {
        if (arrAnsRow[i][j][1] == arr[k]) {
          arr.splice(k, 1);
        }
      }
    }
  }
  if (arr.length == 0) {
    return;
  } else {
    let arrC = [];
    for (let i = 0; i < arr.length; i++) {
      let countAns = random(1, rows - 1);
      let arrIndex = [];
      console.log(arr[i]);
      console.log("Có cột không được chọn");
      while (arrIndex.length < countAns + 1) {
        // Chọn kết quả
        let index = random(0, rows);
        if (checkDup(index, arrIndex)) {
          arrIndex.push(index);
          arrC.push([index, arr[i], arrQuest[index][arr[i]]]);
        }
      }
    }
    // Push vào mảng row những phần tử còn lại
    for (let m = 0; m < arrC.length; m++) {
      // Nếu dòng có số lượng phần tử được chọn ít hơn số phần tử của đề bài 2 phần từ thì mới push
      if (arrAnsRow[arrC[m][0]].length < arrQuest.length - 1) {
        arrAnsRow[arrC[m][0]].push(arrC[m]);
        console.log(arrC[m]);
      }
    }
  }
  return arrAnsRow;
}

// Tính tổng hàng ngang và hàng dọc
// Tính tổng hàng ngang

function sumRow() {
  let sumRow = [];
  for (let i = 0; i < arrAnsRow.length; i++) {
    let row = 0;
    for (let j = 0; j < arrAnsRow[i].length; j++) {
      row += arrAnsRow[i][j][2];
    }
    sumRow.push(row);
  }
  return sumRow;
}

// Tính tổng hàng dọc
function sumCol() {
  let sumCol = [];
  for (let i = 0; i < arrAnsRow.length; i++) {
    sumCol.push(0);
  }
  for (let i = 0; i < arrAnsRow.length; i++) {
    for (let j = 0; j < arrAnsRow[i].length; j++) {
      sumCol[arrAnsRow[i][j][1]] += arrAnsRow[i][j][2];
    }
  }
  return sumCol;
}

// Điền các số trong đề bài vào khung hình

let number = [];
function renderNumber() {
  const row = document.querySelectorAll(".row");
  for (let i = 0; i < row.length - 1; i++) {
    number.push(row[i].querySelectorAll(".number"));
    console.log(number);
    for (let j = 0; j < number[i].length - 1; j++) {
      number[i][j].querySelector("span").innerText = arrQuest[i][j];
    }
  }

  number.push(row[row.length - 1].querySelectorAll(".number"));
}

// Điền tổng dòng và tổng cột
function renderSumNumber() {
  for (let i = 0; i < number.length - 1; i++) {
    // Điền dòng
    number[i][number[i].length - 1].querySelector("span").innerText = sumRow()[
      i
    ];
    // Điền cột
    number[number.length - 1][i].querySelector("span").innerText = sumCol()[i];
  }
}

// Style cho số được chọn

function choseNumber(number) {
  if (!number.querySelector("span").classList.contains("color-not-chose")) {
    number.classList.toggle("background-chose");
    return true;
  }
}

// Style cho số không chọn
function notChoseNumber(number) {
  if (!number.classList.contains("background-chose")) {
    number.querySelector("span").classList.add("color-not-chose");
  }
}

//Style khi bỏ loại số đã loại
function removeNotChoseNumber(number) {
  if (number.querySelector("span").classList.contains("color-not-chose")) {
    number.querySelector("span").classList.remove("color-not-chose");
  }
}

// Thao tác chọn, thêm phần tử được chọn vào mảng kết quả, xóa phần tử bỏ chọn khỏi mạng kết quả và bỏ loại số đã loại

// Mảng lưu tọa độ các số được người chơi chọn
let arrChose = [];
function createArrChose() {
  for (let i = 0; i < rows; i++) {
    arrChose.push([]);
  }
  return arrChose;
}

// Biến lưu số lần người chơi bỏ chọn
let undo = 0;
function choseAns() {
  for (let i = 0; i < number.length - 1; i++) {
    for (let j = 0; j < number[i].length - 1; j++) {
      number[i][j].addEventListener("click", function () {
        // Thao tác chọn
        if (choseNumber(number[i][j])) {
          // thêm phần tử được chọn vào mảng kết quả
          if (number[i][j].classList.contains("background-chose")) {
            arrChose[i].push([i, j]);
            undo++;
            count_undo.innerText = undo;
          } else {
            // xóa phần tử bỏ chọn khỏi mạng kết quả
            for (let k = 0; k < arrChose[i].length; k++) {
              if (arrChose[i][k][1] == j) {
                arrChose[i].splice(k, 1);
              }
            }
          }
        }
        if (checkWin(arrChose, arrAnsRow)) {
          let time = 0;
          for (let m = 0; m < number.length; m++) {
            for (let n = 0; n < number[m].length; n++) {
              time++;
              if (number[m][n].classList.contains("sum")) {
                setTimeout(
                  `number[${m}][${n}].querySelector("span").classList.add("win-color-number-notChose",);
                  number[${m}][${n}].classList.add("win-background-sum")`,
                  time * 100
                );
              }
              if (number[m][n].classList.contains("background-chose")) {
                setTimeout(
                  `number[${m}][${n}].querySelector("span").classList.add("win-color-number-chose");
                  number[${m}][${n}].classList.add("win-background-number")`,
                  time * 100
                );
              }
              if (
                !number[m][n].classList.contains("background-chose") &&
                !number[m][n].classList.contains("sum")
              ) {
                setTimeout(
                  `number[${m}][${n}].querySelector("span").classList.add("win-color-number-notChose");
                  number[${m}][${n}].classList.add("win-background-number")`,
                  time * 100
                );
              }
            }
          }
          stop();
          setTimeout(
            `in_game.style.display = "none";
          end_game.style.display = "block"`,
            time * 100 + 1000
          );
          hour_end.innerText = h;
          minute2_end.innerText = m2;
          minute1_end.innerText = m1;
          second1_end.innerText = s1;
          second2_end.innerText = s2;
          count_undo_end.innerText = undo;
          count_plus.innerText = countChose;
          count_plusAll.innerText = countAll;
        }
        // bỏ loại số đã loại
        removeNotChoseNumber(number[i][j]);
      });
    }
  }
}

// Thao tác loại số
//Loại theo hàng
function removeCol() {
  for (let i = 0; i < number.length - 1; i++) {
    number[i][number.length - 1].addEventListener("click", function () {
      for (let j = 0; j < number.length - 1; j++) {
        notChoseNumber(number[i][j]);
      }
    });
  }
}

// Loại theo cột
function removeRow() {
  for (let i = 0; i < number.length - 1; i++) {
    number[number.length - 1][i].addEventListener("click", function () {
      for (let j = 0; j < number.length - 1; j++) {
        notChoseNumber(number[j][i]);
      }
    });
  }
}

// Tạo đồng hồ đếm thời gian
const minute1 = document.querySelector(".minute1");
const second1 = document.querySelector(".second1");
const minute2 = document.querySelector(".minute2");
const second2 = document.querySelector(".second2");
const hour = document.querySelector(".hour");
// Biến giây
let s1 = 0;
let s2 = 0;
// Biến phút
let m1 = 0;
let m2 = 0;
// Biến giờ
let h = 0;
let timeout = null;
function time() {
  timeout = setInterval(() => {
    s2 = parseInt(second2.innerText);
    s2++;
    second2.innerText = s2;
    if (s2 == 10) {
      s1 = parseInt(second1.innerText);
      s1++;
      second1.innerText = s1;
      second2.innerText = 0;
      s2 = 0;
    }
    if (s1 == 6) {
      m2 = parseInt(minute2.innerText);
      m2++;
      minute2.innerText = m2;
      second1.innerText = 0;
      // second2.innerText = 0;
      s1 = 0;
    }
    if (m2 == 10) {
      m1 = parseInt(minute1.innerText);
      m1++;
      minute1.innerText = m1;
      minute2.innerText = 0;
      m2 = 0;
    }
    if (m1 == 6) {
      h = parseInt(hour.innerText);
      h++;
      hour.innerText = h;
      minute1.innerText = 0;
      m1 = 0;
      // second.innerText = 0;
      // m = 0;
    }
  }, 1000);
}
function stop() {
  clearInterval(timeout);
}
// Kiểm tra hoàn thành trò chơi
function checkWin(arrChose, arrAnsRow) {
  if (arrAnsRow.length != 0 && arrChose.length != 0) {
    let flag = false;
    for (let i = 0; i < arrChose.length; i++) {
      if (arrChose[i].length != arrAnsRow[i].length) {
        return false;
      } else {
        for (let j = 0; j < arrChose[i].length; j++) {
          for (let k = 0; k < arrAnsRow[i].length; k++) {
            if (arrChose[i][j][1] == arrAnsRow[i][k][1]) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            return false;
          }
        }
      }
    }
    if (flag) {
      return true;
    }
  }
}

// Hai nút hỗ trợ người chơi

const plus = document.querySelector("#plus");
const plusAll = document.querySelector("#plusAll");

// Cộng những ô được chọn
let countChose = 0;
plus.addEventListener("mousedown", function () {
  countChose++;
  for (let i = 0; i < arrQuest.length; i++) {
    let sumRow = 0;
    let sumCol = 0;
    for (let j = 0; j < arrQuest[i].length; j++) {
      if (number[i][j].classList.contains("background-chose")) {
        sumRow += arrQuest[i][j];
      }
      if (number[j][i].classList.contains("background-chose")) {
        sumCol += arrQuest[j][i];
      }
    }
    number[i][number.length - 1].querySelector("span").innerText = sumRow;
    number[number.length - 1][i].querySelector("span").innerText = sumCol;
  }
});
plus.addEventListener("mouseup", function () {
  renderSumNumber();
});

// Cộng tất cả các ô theo hàng và cột
let countAll = 0;
plusAll.addEventListener("mousedown", function () {
  countAll++;
  for (let i = 0; i < arrQuest.length; i++) {
    let sumRow = 0;
    let sumCol = 0;
    for (let j = 0; j < arrQuest[i].length; j++) {
      sumRow += arrQuest[i][j];
      sumCol += arrQuest[j][i];
    }
    number[i][number.length - 1].querySelector("span").innerText = sumRow;
    number[number.length - 1][i].querySelector("span").innerText = sumCol;
  }
});
plusAll.addEventListener("mouseup", function () {
  renderSumNumber();
});

// Code cho nút thoát
const exit = document.querySelector("#exit");

exit.addEventListener("click", function () {
  const row = document.querySelectorAll(".row");
  for (let i = 0; i < row.length; i++) {
    row[i].parentNode.removeChild(row[i]);
  }
  minute1.innerText = "0";
  minute2.innerText = "0";
  second2.innerText = "0";
  second1.innerText = "0";
  hour.innerText = "0";
  count_undo.innerText = "0";
  countAll = 0;
  countChose = 0;
  undo = 0;
  rows = 0;
  arrAnsRow = [];
  arrQuest = [];
  number = [];
  console.log(number);
  arrChose = [];
  end_game.style.display = "none";
  begin_game.style.display = "block";
});

// Code cho nút chơi lại
const restart = document.querySelector("#restart");

restart.addEventListener("click", function () {
  const row = document.querySelectorAll(".row");
  for (let i = 0; i < row.length; i++) {
    row[i].parentNode.removeChild(row[i]);
  }
  minute1.innerText = "0";
  minute2.innerText = "0";
  second2.innerText = "0";
  second1.innerText = "0";
  hour.innerText = "0";
  count_undo.innerText = "0";
  countAll = 0;
  countChose = 0;
  undo = 0;
  arrAnsRow = [];
  arrQuest = [];
  number = [];
  console.log(number);
  arrChose = [];
  end_game.style.display = "none";
  in_game.style.display = "block";
  init();
});
