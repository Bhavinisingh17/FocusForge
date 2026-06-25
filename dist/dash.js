const today = new Date().toISOString().split("T")[0];
// console.log(today);

const todayTask = document.querySelector("#today-task");
const upcomingTask = document.querySelector("#upcoming-task");
const recentTask = document.querySelector("#recent-task");

async function loadTodayTasks() {


    const response = await fetch("/tasks");
    const tasks = await response.json();

    tasks.forEach(element => {
        const taskDate = element.date.split("T")[0];

// today's task container
 if (element.status !== "completed" && taskDate === today) {
    todayTask.appendChild(createTask(element));
}
else if (element.status !== "completed" && taskDate > today) {
    
    upcomingTask.appendChild(createTask(element));

}

else if (element.status == "completed") {
   recentTask.appendChild(createTask(element));
}

    }
);


}


////append task



function createTask(element){
const ul = document.createElement("ul");


    const li = document.createElement("li");


    const span = document.createElement("span");
    span.textContent = element.task;
    span.className = "dark:text-white ml-2 text-sm"


   
  
    li.className = "flex items-center py-3 border-b border-gray-300 dark:border-[#27272A]";


    const dateDiv = document.createElement("div");
    dateDiv.className = "flex  ml-auto items-center gap-2 text-gray-400 text-sm";

    const taskDate = element.date.split("T")[0];
dateDiv.innerHTML = `
    <i class="fa-regular fa-calendar"></i>
    <span>${taskDate === today ? "Today" : taskDate}</span>
`;

 if (element.status === "completed") {
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-circle-check text-green-500";
        li.appendChild(icon);
    }
    else if (taskDate === today) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        li.appendChild(checkbox);


////add event listener at the check box

checkbox.addEventListener("change", async () => {

    if (checkbox.checked) {

        await fetch(`/tasks/${element._id}/complete`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "completed",
                completedAt: new Date()
            })
        });

        location.reload();
    }
});


    }
    else if (taskDate > today) {
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-hourglass-half text-orange-500";
        li.appendChild(icon);
    }




    li.appendChild(span);
    li.appendChild(dateDiv);
    ul.appendChild(li);
    return ul;

}


///countStreak

 async function countStreak(){
    const response = await fetch("/tasks/streak");
    const streak = await response.json();
    document.querySelector("#streak h1").innerHTML = streak.currentStreak;

}

const ctx = document.getElementById("weeklyChart");

// LoadWeeklytask

async function loadWeeklyTask(){
    const response = await fetch("/tasks/weekly-progress");
    const data = await response.json();

    console.log("Chart created");
    new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Tasks Completed",
            data: [
                data.Mon,
                data.Tue,
                data.Wed,
                data.Thu,
                data.Fri,
                data.Sat,
                data.Sun
            ],
            backgroundColor: "#6D28D9",
            borderColor: "#6D28D9",
            borderWidth: 2,
            barThickness: 45,
            borderRadius: 8
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            y: {
                grid: {
                    color: "#27272A"
                },
                ticks: {
                    color: "#ffffff"
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: "#ffffff"
                }
            }
        }
    }
});

    console.log(data);
}


//timerCount

function timerCount() {
    const start = document.querySelector("#start");
    const h = document.querySelector("#timer");
    let remainingTime = 1500;
    let timer;
    

///for start button

    start.addEventListener("click", ()=> {
        if (timer) return;


    timer = setInterval(async () => {
    remainingTime--;
    const minutes = Math.floor(remainingTime/60);
    const seconds = remainingTime % 60;
     h.innerHTML =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;

          if (remainingTime === 0) {
                clearInterval(timer);
                timer = null;

             const data = await trackFocus();

              document.querySelector("#sessionCount").innerText =
              data.totalSession;

            }
}, 1000);
    });


//for pause button
const pause = document.querySelector("#pause");
pause.addEventListener("click", ()=> {
    clearInterval(timer);
    timer = null;
});


//for reset
const reset = document.querySelector("#reset");

  reset.addEventListener("click", ()=> {
      clearInterval(timer);
        timer = null;
 
    remainingTime = 1500;
     const minutes = Math.floor(remainingTime/60);
    const seconds = remainingTime % 60;
     h.innerHTML =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;
  })

}


///focus history


async function trackFocus() {
        console.log("Sending focus session...");

    const response = await fetch("/tasks/focus/session",
          {method: "POST"}  

    );
    const data = await response.json();
    return data;
}


timerCount();
countStreak();
loadTodayTasks();
loadWeeklyTask();
trackFocus();