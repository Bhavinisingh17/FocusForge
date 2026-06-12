// // Add Task


// let input = document.querySelector("input");
// let btn = document.querySelector("button");
// let div = document.querySelector("div");
// let task = document.createElement("ul");
// let taskContainer = [];

// btn.addEventListener("click", addTask);
// div.appendChild(task);

// let i = 0;

// function addTask(){

//     taskContainer.push(input.value);
//     console.log(taskContainer);

    

//     let list = document.createElement("li");
//     list.innerText = taskContainer[i];
//     i++;


//     //adding checkbox

//     let checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.className = "ml-2 height-2 width-5"

//     //creating delete button
//      let delbutton = document.createElement("button");
//        delbutton.innerText = "Delete";
//        delbutton.className = "bg-blue-500 text-white rounded px-1 ml-28 mt-2";

//       task.appendChild(list);
//             list.appendChild(checkbox);
//       list.appendChild(delbutton);


//       input.value = " ";

//     delbutton.addEventListener("click", deleteTask);

    
// /// completed task
// checkbox.addEventListener("change", function(){
//   list.classList.toggle("opacity-50");
// })


// // / / Delete the task
 



// function deleteTask(){
//   this.parentElement.remove(); 
//   console.log("delete");
//    } 
// }


//Step-1
// /require the express

const express = require("express");
const app = express();
const port = 8080;
const crypto = require("crypto");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("dist"));


app.listen(port,()=>{
    console.log(port, "listen");
});


let tasks = [];




//Send create a post request for generating the task

app.post("/tasks", (req, res) => {

    // let task  = req.body;

    tasks.push({

    id: crypto.randomUUID(),
    task: req.body.task,
    date: req.body.dueDate,
    status: req.body.status
});
    console.log(tasks);
    res.redirect("/index.html");
  });

app.get("/tasks", (req, res) => {
    res.json( tasks);
});

//DELETE

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id!==id);
    res.sendStatus(200);

})

///edit the task
app.patch("/tasks/:id", (req, res) =>  {
    let {id} = req.params;
    let newTask = req.body.task;
    let task = tasks.find((t) => id===t.id);
    task.task = newTask;
    res.sendStatus(200);
})

