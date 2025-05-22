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
      console.log(elem,idx)
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

                <button class="dlte-btn" data-id="${idx}">
                  <i class="ri-delete-bin-6-fill"></i>
                </button>

                  <button class="marked" data-id="${idx}" type="button" ${
        elem.completed ? "disabled" : ""
      }>
                    ${elem.completed ? "Completed" : "Mark as Completed ❗"}
                  </button>
                </div>
            </div>`;
    });

    allTask.innerHTML = sum;

    let markCompleted = document.querySelectorAll(
      ".task button:not(.dropdown-toggle)"
    );

    markCompleted.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.textContent = "Completed";
        btn.disabled = true;
        const taskElem = btn.closest('.task');
        const deleteBtn = taskElem.querySelector(".dlte-btn");
        if (deleteBtn) deleteBtn.style.display = "inline-block";
        let impTag = taskElem.querySelector(".imp");
        if (impTag) impTag.style.display = "none";
         const idx = btn.getAttribute("data-id"); // ✅ safer than using .id
          currentTask[idx].completed = true;
        localStorage.setItem("currentTask", JSON.stringify(currentTask));
      });
    });

    let deleteBtn = document.querySelectorAll(".dlte-btn");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        let idx = btn.getAttribute("data-id");
        currentTask.splice(idx, 1);
        localStorage.setItem("currentTask", JSON.stringify(currentTask));
        renderTask();
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
      // Create popup card
      let popup = document.querySelector(".popup-card");
      console.log(popup)
      popup.style.display = 'block'
      popup.innerHTML = `
      <div class="popup-content">
        <p>Please fill all details</p>
        <button class="close-popup">OK</button>
      </div>`;

      popup.querySelector(".close-popup").onclick = function() {
        popup.style.display = 'none';
      };
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

function dailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

let dayPlanner = document.querySelector(".day-planner")

let hours = Array.from({length: 18}, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


let wholeDaySum = ''

hours.forEach((elem, idx) => {
  let savedData = dayPlanData[idx] || ''
  wholeDaySum += `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}" type="text" placeholder="..." value="${savedData}">
                </div>`
})

dayPlanner.innerHTML = wholeDaySum

let dayPlannerInp = document.querySelectorAll(".day-planner input")

dayPlannerInp.forEach((elem) => {
  elem.addEventListener('input', () => {
    dayPlanData[elem.id] = elem.value

    localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData))
  })
})
}

dailyPlanner()

let quote = document.querySelector(".para p")
let writer = document.querySelector(".writer")

async function fetchQuote() {
  let response = await fetch('http://api.quotable.io/random')
  let data = await response.json()
  
  quote.innerHTML = data.content
  writer.innerHTML = data.author
}

fetchQuote()

// localStorage.clear()