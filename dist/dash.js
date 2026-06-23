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
    completedTask.appendChild(createTask(element));
}
else if (taskDate === today) {
    todayTask.appendChild(createTask(element));
}
else if (taskDate > today) {
    upcomingTask.appendChild(createTask(element));
}
else {
    recentTask.appendChild(createTask(element));
}




    li.appendChild(span);
    li.appendChild(dateDiv);
    ul.appendChild(li);
    return ul;

}







loadTodayTasks();