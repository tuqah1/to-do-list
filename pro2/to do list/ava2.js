const todobut= document.querySelector('.todo-button');
const todoinput=document.querySelector('.todo-input');
const todolist=document.querySelector('.todo-list');
const loader=document.querySelector('.loader');
const main=document.querySelector('.main');
function init(){
    setTimeout(()=>{
loader.style.opacity=0;
loader.style.display='none';
main.style.display='block';
main.style.opacity=1;



    },2000)
}
init();
 

todobut.addEventListener("click",addwork);
todolist.addEventListener("click",checkordelete);
function addwork(e){
    e.preventDefault();

    const todoli=document.createElement("li");
    todoli.classList.add("todo");

    const tododiv=document.createElement("div");
    tododiv.classList.add("todo-item");

    tododiv.innerText=todoinput.value;
    console.log(tododiv.innerText)
    
    const todobut1=document.createElement("button");
    todobut1.classList.add("but1");
    todobut1.innerHTML='<i class="fa-solid fa-check"></i>';
    
    const todobut2=document.createElement("button");
    todobut2.classList.add("but2");
    todobut2.innerHTML='<i class="fa-solid fa-trash"></i>';
    todoli.appendChild(tododiv);
    todoli.appendChild(todobut1);
    todoli.appendChild(todobut2);

    todolist.appendChild(todoli);
    todoinput.value="";
     

}

function checkordelete(e){
const a=e.target;
if(a.classList[0]=== "but1"){
    const todo=a.parentElement;
    todo.classList.toggle("complet");
}
if(a.classList[0]=== "but2"){
    const todo=a.parentElement;
    todo.classList.toggle("fall");
    todo.addEventListener("transitionend",()=>{
   todo.remove();
    
    });
}
}
 