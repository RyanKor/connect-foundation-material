// Select the Elements
const clear = document.querySelector(".clear"); //reset setting

// calendar
const yearElement = document.querySelector("#year");
const dayElement = document.querySelector(".day");
const monthElement = document.querySelector(".month");
const numericElement = document.querySelector(".numeric");

//todo 추가하기
const list = document.querySelector(".list");

// Class Names
const CHECK = "fa-check-circle-o";
const UNCHECK = "fa-circle-o";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST = [];
let id = 0;

// get Item from localStorage
let data = localStorage.getItem("TODO");
//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id  to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  // if data isn't empty
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage. Whole clear
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
  console.log(location);
});

// Show todays date
const year = { year: "numeric" };
const day = { weekday: "long" };
const month = { month: "short" };
const numeric = { day: "numeric" };
const today = new Date();

yearElement.innerHTML = today.toLocaleDateString("en-US", year);
dayElement.innerHTML = today.toLocaleDateString("en-US", day);
monthElement.innerHTML = today.toLocaleDateString("en-US", month);
numericElement.innerHTML = today.toLocaleDateString("en-US", numeric);

// add to function
function addTodo(todo, id, done, trash) {
  // done && trash는 boolean
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
            <div class="item" draggable="true">
              <i class="fa ${DONE}" job="complete" id=${id}></i>
              <span class="text ${LINE}">${todo}</span>
              <i class="fa fa-trash-o" job="delete" id=${id}></i>
            </div> `;

  const position = "afterbegin";
  list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function () {
  if (event.keyCode === 13) {
    // keyCode 13 means "Enter"
    const todo = input.value;

    // if the input isn't empty
    if (todo) {
      addTodo(todo, id, false, false);

      LIST.push({
        name: todo,
        id: id,
        done: false,
        trash: false,
      });
      // add Item to localStorage(this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

// console.log(LIST);

// complete to do
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function (event) {
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeTodo(element);
  } else {
    removeTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

// todo list drag
// 드래그 앤 드롭 세팅

const item = document.querySelectorAll(".item");
const wrapper = document.querySelectorAll(".list");
// console.log(item) // 값을 받아오는 것을 확인
// console.log(wrapper)
item.forEach((draggable) => {
  // console.log(draggable)
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

wrapper.forEach((container) => {
  // console.log(container)
  container.addEventListener("dragover", (e) => {
    // console.log(e)
    e.preventDefault();

    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    // console.log(afterElement)
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".item:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
