function openFeature() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElems = document.querySelectorAll(".fullElem");
  let allBackBtn = document.querySelectorAll(".fullElem .back");
  let weatherelem = document.querySelectorAll(".allElems .back-header");
  let nav = document.querySelector(".nav");

  allElems.forEach((data) => {
    data.addEventListener("click", () => {
      allFullElems[data.id].style.display = "block";
      nav.style.display = "none";
      weatherelem.forEach((elem) => {
        elem.style.display = "none";
      })
    });
  });

  allBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      allFullElems[back.id].style.display = "none";
      nav.style.display = "block";
      weatherelem.forEach((elem) => {
        elem.style.display = "block";
      })
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
    let allTaskMobile = document.querySelector(".modal");
   

    let sum = "";
    let mobile = "";

    currentTask.forEach((elem, idx) => {
      sum += `
      <div class="task">
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

        mobile += `
                      <button class="back" id="5" type="button" title="Close"><i class="ri-close-large-line"></i></button>
                      <div class="modal-content">
                      
                        <h2>${elem.details}</h2>
                        <button class="dlte-btn" data-id="${idx}">
                  <i class="ri-delete-bin-6-fill"></i>
                </button>
                      </div>
                   </div>`  
    });

    allTaskMobile.innerHTML = mobile;
    allTask.innerHTML = sum;

    let taskCard = document.querySelector(".allTask");

   console.log(currentTask)

    let taskBackBtn = document.querySelectorAll(".modal .back");

    taskBackBtn.forEach((data) => {
      data.addEventListener("click", () => {
      allTaskMobile.style.display = "none";
    })
    })

    if(currentTask.length == 0) {
        allTaskMobile.style.display = "none";
      }
    
      taskCard.addEventListener("click", () => {
      allTaskMobile.style.display = "block";
    })


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
         const idx = btn.getAttribute("data-id");
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

function motivationQuote() {
  let quote = document.querySelector(".para p")
  let writer = document.querySelector(".writer")

  async function fetchQuote() {
  let response = await fetch('http://api.quotable.io/random')
  let data = await response.json()
  
  quote.innerHTML = data.content
  writer.innerHTML = data.author
  }

  fetchQuote()
}

motivationQuote()

function pomodoroTimer() {

let totalSeconds = 1490;
const initialSeconds = 1490;

let timer = document.querySelector(".clock .clock-wrapper h1");
let startBtn = document.querySelector(".pomo-timer .start-timer");
let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
let resetBtn = document.querySelector(".pomo-timer .reset-timer");
let popup = document.querySelector(".spin-popup .popup-card");
let work = document.querySelector(".spin-popup .spin-cntrl");
let breakBtn = document.querySelector(".popup-content .start-break");
const circle = document.querySelector('.pomo-circular-progress .pomo-fg');
const circleLength = 2 * Math.PI * 180;

function updateCircularProgressBar() {
  let percent = Math.max(0, Math.min(1, totalSeconds / initialSeconds));
  circle.style.strokeDasharray = circleLength;
  circle.style.strokeDashoffset = circleLength * (1 - percent);
  const isEnding = percent <= 0.2;
  circle.style.stroke = isEnding ? "#e74c3c" : "#4721dd";
  circle.style.filter = isEnding
    ? "drop-shadow(0 0 12px #e74c3c)"
    : "drop-shadow(0 0 8px #4721dd)";
  timer.style.color = isEnding ? "#e74c3c" : "var(--qua)";
  timer.style.textShadow = isEnding
    ? "0 0 1px #e74c3c"
    : "0 0 90px var(--sec)";
}

function setTimerDisplay(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;
  timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  setTimerDisplay(totalSeconds);
  updateCircularProgressBar();
  totalSeconds--;
  if (totalSeconds < 0) {
    clearInterval(timerInterval);
    // timer.innerHTML = none;
    let time = document.querySelector(".clock-wrapper h1");
    time.style.opacity = 0.2;
    popup.style.display = 'block';
    work.style.display = "none";
    circle.style.strokeDashoffset = circleLength;
    circle.style.stroke = "#e74c3c";
    circle.style.filter = "drop-shadow(0 0 15px #e74c3c)";
    timer.style.color = "#e74c3c";
    timer.style.textShadow = "0 0 2px #e74c3c";
    pauseBtn.style.display = "none";
  }
}

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  work.style.display = "block";
   let spinCntrl = document.querySelector(".spin-cntrl .outer-loader");
  spinCntrl.style.display = "block";
  let workText = document.querySelector(".work h1");
  workText.style.display = "block"
  timerInterval = setInterval(startTimer, 1000);
});

pauseBtn.addEventListener("click", () => {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  clearInterval(timerInterval);
});

breakBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  breakBtn.innerHTML = "Break Started";
  totalSeconds = 300;
  let time = document.querySelector(".clock-wrapper h1");
  time.style.opacity = 1;
  popup.style.display = 'none';
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    setTimerDisplay(totalSeconds);
    updateCircularProgressBar();
    totalSeconds--;
    if (totalSeconds < 0) {
      clearInterval(timerInterval);
      timer.innerHTML = "Break Ended";
      breakBtn.innerHTML = "Break Completed";
      breakBtn.disabled = true;
      circle.style.strokeDashoffset = circleLength;
      circle.style.stroke = "#e74c3c";
      circle.style.filter = "drop-shadow(0 0 15px #e74c3c)";
      timer.style.color = "#e74c3c";
      timer.style.textShadow = "0 0 2px #e74c3c";
      pauseBtn.style.display = "none";
    }
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  popup.style.display = 'none';
  breakBtn.innerHTML = "Start Break";
  let time = document.querySelector(".clock-wrapper h1");
  time.style.opacity = 1;
  breakBtn.disabled = false;
  let spinCntrl = document.querySelector(".spin-cntrl .outer-loader");
  spinCntrl.style.display = "none";
  let workText = document.querySelector(".work h1");
  workText.style.display = "none"
  clearInterval(timerInterval);

  let current = totalSeconds;
  let target = initialSeconds;
  let duration = 600;
  let steps = 20;
  let stepTime = duration / steps;
  let diff = target - current;
  let step = diff / steps;
  let count = 0;

  function animateReset() {
    if (count < steps) {
      current += step;
      setTimerDisplay(Math.max(0, Math.round(current)));
      let percent = Math.max(0, Math.min(1, current / initialSeconds));
      circle.style.strokeDashoffset = circleLength * (1 - percent);
      const isEnding = percent <= 0.2;
      circle.style.stroke = isEnding ? "#e74c3c" : "#4721dd";
      circle.style.filter = isEnding
        ? "drop-shadow(0 0 12px #e74c3c)"
        : "drop-shadow(0 0 8px #4721dd)";
      timer.style.color = isEnding ? "#e74c3c" : "var(--qua)";
      timer.style.textShadow = isEnding
        ? "0 0 0px #e74c3c"
        : "0 0 90px var(--sec)";
      count++;
      setTimeout(animateReset, stepTime);
    } else {
      totalSeconds = initialSeconds;
      setTimerDisplay(totalSeconds);
      circle.style.strokeDashoffset = 0;
      circle.style.stroke = "#4721dd";
      circle.style.filter = "drop-shadow(0 0 8px #4721dd)";
      timer.style.color = "var(--qua)";
      timer.style.textShadow = "0 0 90px var(--sec)";
    }
  }
  animateReset();
});

circle.style.strokeDasharray = circleLength;
circle.style.strokeDashoffset = 0;
circle.style.stroke = "#4721dd";
circle.style.filter = "drop-shadow(0 0 8px #4721dd)";
timer.style.color = "var(--qua)";
timer.style.textShadow = "0 0 90px var(--sec)";
setTimerDisplay(totalSeconds);
}

pomodoroTimer()

function weatherFunctionality() {

  const header1Time = document.querySelector(".header1 h1");
  const header1Date = document.querySelector(".header1 h2");
  const header2Temp = document.querySelector(".header2 h2");
  const header2Condition = document.querySelector(".header2 h4");
  const precipitation = document.querySelector(".header2 .precipitation");
  const humidity = document.querySelector(".header2 .humidity");
  const wind = document.querySelector(".header2 .wind");
  const cityName = document.querySelector(".header1 .city-name");

  let data = null;

  async function weatherAPICall(lat, lon) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=83485b87c9ee485c85934621252405&q=${lat},${lon}`
      );
      data = await response.json();

      header2Temp.innerHTML = `${data.current.temp_c}°C`;
      header2Condition.innerHTML = `${data.current.condition.text}`;
      wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
      humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
      precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c}°C`;
      cityName.innerHTML = `📍 ${data.location.name}, ${data.location.country}`;
      
    } catch (error) {
      console.error("❌ Weather API error:", error);
    }
  }

  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          weatherAPICall(lat, lon);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          // fallback to default city if location fails
          weatherAPICall("Mumbai");
        }
      );
    } else {
      console.warn("Geolocation not supported. Falling back to Ghaziabad.");
      weatherAPICall("Mumbai");
    }
  }

  getLocation();

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date();
    const dayOfWeek = totalDaysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const tarik = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month}, ${year}`;

    const hour12 = hours % 12 || 12;
    const ampm = hour12 <= 12 ? "PM" : "AM";

    header1Time.innerHTML = `${dayOfWeek}, ${String(hour12).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}

weatherFunctionality();

 function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {
      console.log('Theme clicked');
        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#000000')
            rootElement.style.setProperty('--sec', '#000000')
            rootElement.style.setProperty('--tri', '#FEBA17')
            rootElement.style.setProperty('--qua', '#169976')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri', '#FEBA17')
            rootElement.style.setProperty('--qua', '#74512D')
            flag = 0
        }

    })


}

changeTheme()

function dailyGoals() {
  let goals = JSON.parse(localStorage.getItem('dailyGoals')) || [];

  let newGoal = document.querySelector(".add-goal-btn")
  let setGoal = document.querySelector(".set-goal")

  newGoal.addEventListener("click", () => {
    addNewGoal()
  })

  function renderGoals() {
      const list = document.querySelector('.goal-item');
      list.innerHTML = '';

      // list.style.display = "block"

      const now = new Date();

      goals.forEach((goal, index) => {
        const card = document.createElement('div');
        card.className = 'goal-card';
        if (goal.completed) card.classList.add('completed');

        const end = new Date(goal.endDate);
        const progress = Math.min(100, Math.floor((now - new Date(goal.startDate)) / (end - new Date(goal.startDate)) * 100));
        const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

        if (daysLeft === 1) {
          alert(`Reminder: Only 1 day left to complete "${goal.title}"`);
        } else if (daysLeft <= 0 && !goal.completed) {
          alert(`Deadline Passed: "${goal.title}"`);
        }

        card.innerHTML = `
          <div class="goal-header">
            <div class="mark">
              <input name="checkbox" type="checkbox" class="checkbox" ${goal.completed ? 'checked' : ''} onchange="toggleCompleted(${index})">
              <span class="goal-title">${goal.title}</span>
            </div>
            <div class="goal-category">${goal.category}</div>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: ${progress}%"></div>
          </div>
          <div class="goal-footer">
            <span>${daysLeft} days left</span>
            <button class="delete-btn"><i class="ri-delete-bin-6-fill"></i></button>
          </div>
        `;

        if (now > end || goal.completed) {
          card.querySelector('.delete-btn').style.display = 'block';
        }

        list.appendChild(card);

         let taskdeltbtn = card.querySelector(".delete-btn");
        taskdeltbtn.addEventListener("click", () => {
          deleteGoal(index);
        });

        let toggle = card.querySelector(".checkbox");
        toggle.addEventListener("click", () => {
          toggleCompleted(index);
        });

      });
    }

    function addNewGoal() {

         setGoal.style.display = "block";
      
       document.getElementById("goalForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  console.log(title)
  const category = document.getElementById("category").value;
  const endDateInput = document.getElementById("endDate").value;
  const endDate = new Date(endDateInput);
  const now = new Date();

  // Reset errors
  document.getElementById("titleError").textContent = '';
  document.getElementById("categoryError").textContent = '';
  document.getElementById("dateError").textContent = '';

  let isValid = true;

  // Title validation
  if (!title || title.length < 3) {
    document.getElementById("titleError").textContent = "Title must be at least 3 characters.";
    isValid = false;
  }

  // Category validation
  if (!["SPORTING", "ACADEMIC", "HEALTH"].includes(category)) {
    document.getElementById("categoryError").textContent = "Please select a valid category.";
    isValid = false;
  }

  // Date validation
  if (!endDateInput || endDate <= now) {
    document.getElementById("dateError").textContent = "Enter a valid future date.";
    isValid = false;
  }

  if (isValid) {
    const goal = { title, category, startDate: new Date().toISOString(), endDate: endDate.toISOString(), completed: false };
    goals.push(goal);
    localStorage.setItem("dailyGoals", JSON.stringify(goals));
    const resultMsg = document.getElementById("result");
  const resultText = resultMsg.querySelector('.result-text');
  const resultProgress = resultMsg.querySelector('.result-progress');

  resultText.textContent = "Goal saved successfully!";
  resultMsg.style.display = "block";
  resultMsg.style.opacity = "1";
  resultProgress.style.width = "100%";
  // Force reflow for transition
  void resultProgress.offsetWidth;
  resultProgress.style.transition = "width 2s linear";
  resultProgress.style.width = "0%";

  setTimeout(() => {
    resultMsg.style.opacity = "0";
    setTimeout(() => {
      resultMsg.style.display = "none";
      resultText.textContent = "";
      resultProgress.style.width = "100%";
    }, 400); // fade out duration
  }, 2000);

    // Clear form
    document.getElementById("goalForm").reset();
    setGoal.style.display = "none";
    renderGoals();
  }
});

    }

    function deleteGoal(index) {
      goals.splice(index, 1);
      localStorage.setItem('dailyGoals', JSON.stringify(goals));
      renderGoals();
    }

     function toggleCompleted(index) {
      goals[index].completed = !goals[index].completed;
      localStorage.setItem('dailyGoals', JSON.stringify(goals));
      renderGoals();
    }

    renderGoals()
}

function goalClose () {
  let close = document.querySelector(".close")
  let setGoal = document.querySelector(".set-goal")
  
  close.addEventListener("click", () => {
    setGoal.style.display = "none"
  })
}

goalClose()

dailyGoals()