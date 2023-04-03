const loader = document.querySelector('.loader');
const main = document.querySelector('.main-div');

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = 'none';

    main.style.display = 'block';
    setTimeout(() => (main.style.opacity = 1), 50);
  }, 1000);
}

init();
let taskss=[
{
  "title": "read a book",
  "date": "10/10/2022",
  "isDone": false,
},
{
  "title": "cooking",
  "date": "10/9/2022",
  "isDone": true ,
},
{
  "title": "chating",
  "date": "10/8/2022",
  "isDone": false,
},
]
function getTaskFromStorage(){
  let retrivedTask=JSON.parse(localStorage.getItem("taskss")) ;
  taskss= retrivedTask ?? []
  
}
getTaskFromStorage();
function fillTaskOnPage(filter){

  document.getElementById('tasks').innerHTML=""
  let index = 0;
  let content=""
  
for(task of taskss){
  if(filter=="completed" && filter!="all" && filter!="pending" ){content=`
<div class="task ${task.isDone ? "done" : ""}">
<div class="task-info">
  <h4>${task.title}</h4>
 
  <div>
   <span>${task.date}</span>
   </div>
   </div>
<div class="task-action">
  <button onclick="deletTask(${index})" class="circulr del"><span class="material-symbols-outlined">
      delete
      </span></button>
      ${task.isDone ? `<button onclick="toggleTaskcomplition(${index})" class="circulr btn-done"><span class="material-symbols-outlined">
      cancel
      </span></button>`:
      `<button onclick="toggleTaskcomplition(${index})" class="circulr done"><span class="material-symbols-outlined">
      check
      </span></button>`}
  
  <button onclick="editTask(${index})" class="circulr edit"><span class="material-symbols-outlined">
      edit
      </span></button>
</div>
</div>` 
if(task.isDone==true){document.getElementById('tasks').innerHTML+=content;}}
   

   if(filter=="pending" && filter!="all" && filter!="completed"){
    content=`
<div class="task ${task.isDone ? "done" : ""}">
<div class="task-info">
  <h4>${task.title}</h4>
 
  <div>
   <span>${task.date}</span>
   </div>
   </div>
<div class="task-action">
  <button onclick="deletTask(${index})" class="circulr del"><span class="material-symbols-outlined">
      delete
      </span></button>
      ${task.isDone ? `<button onclick="toggleTaskcomplition(${index})" class="circulr btn-done"><span class="material-symbols-outlined">
      cancel
      </span></button>`:
      `<button onclick="toggleTaskcomplition(${index})" class="circulr done"><span class="material-symbols-outlined">
      check
      </span></button>`}
  
  <button onclick="editTask(${index})" class="circulr edit"><span class="material-symbols-outlined">
      edit
      </span></button>
</div>
</div>`
    if(task.isDone==false){document.getElementById('tasks').innerHTML+=content;}
   }
   if(filter=="all" && filter!="pending" && filter!="completed"){
    content=`
    <div class="task ${task.isDone ? "done" : ""}">
    <div class="task-info">
      <h4>${task.title}</h4>
     
      <div>
       <span>${task.date}</span>
       </div>
       </div>
    <div class="task-action">
      <button onclick="deletTask(${index})" class="circulr del"><span class="material-symbols-outlined">
          delete
          </span></button>
          ${task.isDone ? `<button onclick="toggleTaskcomplition(${index})" class="circulr btn-done"><span class="material-symbols-outlined">
          cancel
          </span></button>`:
          `<button onclick="toggleTaskcomplition(${index})" class="circulr done"><span class="material-symbols-outlined">
          check
          </span></button>`}
      
      <button onclick="editTask(${index})" class="circulr edit"><span class="material-symbols-outlined">
          edit
          </span></button>
    </div>
    </div>`
    document.getElementById('tasks').innerHTML+=content;
    
   }
   
index++;
}
}
fillTaskOnPage("all")

let taskName
document.getElementById('add-button').addEventListener("click", function () {
   taskName=document.querySelector('#taskName').value;
   let now= new Date()
   let date= now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() ; 
  console.log(date)
 let taskObj ={
  "title": taskName,
  "date": date,
  "isDone": false,
 }
 taskss.push(taskObj);
 storeTask()
 fillTaskOnPage("all")
})
function deletTask(index){
 let task=taskss[index]
  swal({
    title: "Are you sure delete " + task.title+ " task",
    text: "Once deleted, you will not be able to access your task",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((value) => {
    let isfa = value;
if(isfa == true){
   taskss.splice(index,1);
   storeTask()
  fillTaskOnPage("all")
  
}
  });
}
function editTask(index){
  let task=taskss[index];
  swal({
    text: 'enter your newtask".',
    content: "input",
    button: {
      text: "sure",
      closeModal: true,
    },
  }).then((value) => {
   let newTaskTitle=value;
   if(newTaskTitle!=undefined){
     task.title=newTaskTitle;
     storeTask()
   fillTaskOnPage("all")
   }
  
  
  });
}
function toggleTaskcomplition(index){
  let task=taskss[index];
  task.isDone =!task.isDone;
  storeTask()
  fillTaskOnPage("all")
}
function storeTask(){
  let taskString=JSON.stringify(taskss);
  localStorage.setItem("taskss",taskString)
}
filters=document.querySelectorAll(".filters span");
console.log(filters);
filters.forEach(btn =>{
    btn.addEventListener("click",() => {
      document.querySelector("span.active").classList.remove("active")
      btn.classList.add("active");
      fillTaskOnPage(btn.id)
    })
});