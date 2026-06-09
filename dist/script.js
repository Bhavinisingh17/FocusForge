document.addEventListener("DOMContentLoaded", () => {
    loadTask();
});

async function loadTask() {

    // fetch("/tasks")
// Express receives a GET request at /tasks.
   
        const response = await fetch("/tasks");
        const tasks = await response.json();


        const tasklist = document.getElementById("tasklist");
        tasklist.innerHTML = "";

        tasks.forEach(task => {
           const div = document.createElement("div");
           div.className = "bg-blue-500 text-white p-2 rounded-md mb-2 shadow flex justify-between";

           const span = document.createElement("span");
           span.innerText = task.task;

           // Container for icons
           const iconGroup = document.createElement("div");
           iconGroup.className = "flex gap-2";

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
        div.appendChild(iconGroup);


         tasklist.appendChild(div);
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


//addiding dark mode
