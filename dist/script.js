
document.addEventListener("DOMContentLoaded", () => {
    loadTask();
});


          const tasklist = document.getElementById("tasklist");
          tasklist.className = "flex flex-wrap gap-4 mt-2";
           
         const todo = document.getElementById("todo");
         const progress = document.getElementById("progress");
         const completed = document.getElementById("completed");

            //container for task's div
        

async function loadTask() {

    // fetch("/tasks")
// Express receives a GET request at /tasks.
   
        const response = await fetch("/tasks");
        const tasks = await response.json();


        tasklist.innerHTML = "";

        tasks.forEach(task => {

 const formattedDate = new Date(task.date).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
          ///card
           const div = document.createElement("div");
           div.className = "bg-white border border-gray-100 text-black font-medium p-6 h-32 w-64 rounded-xl mb-2 shadow flex justify-between items-start flex-col hover:shadow-md transition-shadow duration-300";


           //task text
           const span = document.createElement("span");
           span.innerText = `📚 ${task.task}`;

           // Container for icons
           const iconGroup = document.createElement("div");
           iconGroup.className = "flex gap-2";

          
          
           //container for date
            const dateContainer = document.createElement("div");
            dateContainer.innerText = `📅 Finish By:  ${formattedDate}`;

///taskStatus 
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
            console.log("clicked", task.id);
            deleteTask(task.id);
        })

/// EDIT

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
          editTask(task.id, task.task);
})



        iconGroup.appendChild(editIcon);
        iconGroup.appendChild(deleteIcon);
      
        div.appendChild(span);
        div.appendChild(dateContainer);
        div.appendChild(iconGroup);
        div.appendChild(status);
        // tasklist.appendChild(div);
        
          statusId(task.status, div);
        });
}


//delete function

async function deleteTask(id){
   await fetch(`/tasks/${id}`, {
       method: "DELETE"
   }
   );
      loadTask();
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

}



// / ?\Status

function statusId(status, div){
    if(status === "todo"){
        todo.appendChild(div);
    }
    else if(status === "progress"){
        progress.appendChild(div);
    }
    else if(status === "completed"){
        completed.appendChild(div);
    }
}
