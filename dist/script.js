
document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM Loaded");

    loadTask();
});

  

           
         const todo = document.getElementById("todo");
         const progress = document.getElementById("progress");
         const completed = document.getElementById("completed");

            //container for task's div
       

     async function loadTask() {


    // fetch("/tasks")
// Express receives a GET request at /tasks.
   
        const response = await fetch("/tasks");
        const newTask = await response.json();

        todo.innerHTML = "";
       progress.innerHTML = "";
       completed.innerHTML = "";

    

        newTask.forEach(task => {

 const formattedDate = new Date(task.date).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
          ///card

           const card = document.createElement("div");    
          card.className =  "bg-gray-100 dark:bg-white/10 dark:shadow-small dark:shadow-white/5 text-black dark:text-white font-medium p-6 h-32  rounded-lg mb-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex justify-between items-start flex-col dark: border border-white/10 ";


           //task text

           const span = document.createElement("span");
           span.innerText = `📚 ${task.task}`;

           // Container for icons

           const iconGroup = document.createElement("div");
           iconGroup.className = "flex gap-2";

          
          
           //container for date

            const dateContainer = document.createElement("div");
            dateContainer.innerText = `📅 Finish By:  ${formattedDate}`;
             dateContainer.className = "text-white/35 text-xs"
          //taskStatus 

          const status = document.createElement("div");
          status.innerText = task.status;


             //DELETE

        const deleteIcon = document.createElement("div");
         deleteIcon.innerHTML = `
        <lord-icon
           src="https://cdn.lordicon.com/jzinekkv.json"
           trigger="hover"
           stroke="bold"
           colors="primary:#ffffff,secondary:#9cc2f4"
           style="width:25px;height:25px">
        </lord-icon>`;
         let icon = deleteIcon.querySelector("lord-icon");

        icon.addEventListener("click", () => {
            console.log("clicked", task._id);
            deleteTask(task._id);

        })

       // EDIT

          const editIcon = document.createElement("div");
          editIcon.innerHTML = 
          `<lord-icon
                src="https://cdn.lordicon.com/exymduqj.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#66d7ee,secondary:#ffffff"
                style="width:25px;height:25px">
        </lord-icon>`;
          
editIcon.addEventListener("click", () =>{
          editTask(task._id, task.task);
})



        iconGroup.appendChild(editIcon);
        iconGroup.appendChild(deleteIcon);
      
        card.appendChild(span);
        card.appendChild(dateContainer);
        card.appendChild(iconGroup);
        card.appendChild(status);
        
          statusId(task.status, card);
        });
}


//delete function

async function deleteTask(id){
   await fetch(`/tasks/${id}`, {
       method: "DELETE"
   }
   );
      loadTask();
      loadCounts();
}

//edit 
async function editTask(id, currentTask){

 const update = prompt("Edit task:", currentTask);
 await fetch(`/tasks/${id}`, {
    method: "PATCH",
     headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: update
        })
 })

    loadTask();
    loadCounts();

}



// / ?\Status

function statusId(status, card){
    if(status === "todo"){
        todo.appendChild(card);
    }
    else if(status === "progress"){
        progress.appendChild(card);
    }
    else if(status === "completed"){
        completed.appendChild(card);
    }
}


///count

async function loadCounts(){
    const response = await fetch("/tasks/count");
    const data = await response.json();
    document.querySelector("#totalTask h1").innerHTML = data.total;
    document.querySelector("#todoCount h1").innerHTML = data.todo;
    document.querySelector("#inprogCount h1").innerHTML = data.inprogress;
    document.querySelector("#completeCount h1").innerHTML = data.completed;
}

loadCounts();
