// calendar
const yearElement = document.querySelector("#year");
const dayElement = document.querySelector(".day");
const monthElement = document.querySelector(".month");
const numericElement = document.querySelector(".numeric");

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

// 드래그 앤 드롭 세팅
const item = document.querySelectorAll(".item");
const wrapper = document.querySelectorAll(".list");

// ---------------------------------------------------------

// todo list drag

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

// ---------------------------------------------------------

// 게시글 삭제하기

document.querySelectorAll(".fa-trash-o").forEach((item) => {
  item.addEventListener("click", function (event) {
    console.log(event);
    console.log(this.id);
    const deletePost = this.id;
    axios
      .delete(`/delete/${deletePost}`)
      .then((results) => {
        console.log(results);
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

document.querySelector(".clear").addEventListener("click", function () {
  axios
    .delete("/delete")
    .then((results) => {
      console.log(results);
      location.reload();
    })
    .catch((err) => {
      console.error(err);
    });
});

// ---------------------------------------------------------

// 게시글 line 긋기

// document.querySelector();

// 게시글 조회

document.querySelectorAll(".check").forEach((item) => {
  item.addEventListener("click", function (e) {
    const complete = !document.querySelector(".toggle").value;
    axios
      .put("/post/" + this.id, complete)
      .then((result) => {
        console.log(result);
        const LINE = complete ? LINE_THROUGH : "";
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
