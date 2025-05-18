function openFeature() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElems = document.querySelectorAll(".fullElem");
  let allBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach((data) => {
    data.addEventListener("click", () => {
      allFullElems[data.id].style.display = "block";
    });
  });

  allBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      allFullElems[back.id].style.display = "none";
    });
  });
}

openFeature();

function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form input");
  let textarea = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".mark-imp input");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task List is Empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach((elem, idx) => {
      sum += `<div class="task">
                <h5>${elem.task} ${
        elem.imp && !elem.completed ? '<span class="imp">Imp</span>' : ""
      }</h5>
                
                <div class="container">
                <div class="dropdown-content" id="dropdown-${idx}">
                    <p>${elem.details}</p>
                </div>
                <button class="dropdown-toggle" data-id="${idx}">
  <i class="ri-arrow-down-s-fill down"></i>
  <i class="ri-arrow-up-s-fill up" style="display: none;"></i>
</button>
                  <button class="marked" id=${idx} type="button" ${
        elem.completed ? "disabled" : ""
      }>
                    ${elem.completed ? "Completed" : "Mark as Completed"}
                  </button>
                </div>
            </div>`;
    });

    allTask.innerHTML = sum;

    let markCompleted = document.querySelectorAll(
      ".task button:not(.dropdown-toggle)"
    );
    console.log(markCompleted);
    markCompleted.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.textContent = "Completed";
        btn.disabled = true;
        let impTag = document.querySelector(".imp");
        if (impTag) impTag.style.display = "none";
        currentTask[btn.id].completed = true;
        localStorage.setItem("currentTask", JSON.stringify(currentTask));
      });
    });

    let dropdownBtns = document.querySelectorAll(".dropdown-toggle");
    dropdownBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-id");
        const content = document.getElementById(`dropdown-${idx}`);
        const downIcon = btn.querySelector(".down");
    const upIcon = btn.querySelector(".up");

    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
      content.style.maxHeight = "0";
      downIcon.style.display = "inline";
      upIcon.style.display = "none";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      downIcon.style.display = "none";
      upIcon.style.display = "inline";
    }
      });
    });
  }

  renderTask();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (taskInput.value.trim() === "" || textarea.value.trim() === "") {
      alert("Please fill all details");
      return;
    }
    currentTask.push({
      task: taskInput.value,
      details: textarea.value,
      imp: taskCheckbox.checked,
    });

    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    taskInput.value = "";
    textarea.value = "";
    taskCheckbox.checked = false;
    renderTask();
  });
}

todoList();

// localStorage.clear()
