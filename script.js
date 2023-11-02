const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const container = document.querySelector(".container");

// create a array which store tasks and is task is already present then after reload it do not change 

const tasks = localStorage.getItem("tasks")
              ? JSON.parse(localStorage.getItem("tasks")) 
              : [];

//call for show not change in the task after reload
showAllTasks();

// show all the task  
function showAllTasks(){
    // creating nth time div section for tasks
        tasks.forEach((value,index) =>{
           
            //creating a div ,title area,descrption area and remove button
            const div = document.createElement("div");
            div.setAttribute("class","task");

            const innerDiv = document.createElement("div");
            div.append(innerDiv);

            const p = document.createElement("p");
            p.innerText =  value.title;
            innerDiv.append(p); 

            const span = document.createElement("span");
            span.innerText =  value.description;
            innerDiv.append(span); 

            const btn = document.createElement("button");
            btn.setAttribute("class","deleteBtn");
           
            btn.innerText="-";

            // providing function to remove the task
            btn.addEventListener("click",()=>{
                removeTasks();
                //remove from local storage also
                localStorage.setItem("tasks",JSON.stringify(tasks)); 
                // remove from area from where delete button apply 
                tasks.splice(index,1);
                //show the changes
                showAllTasks(); 
            })

            div.append(btn);   
            container.append(div);

        })
}
 

//provide function for removing task
function removeTasks(){

    tasks.forEach((value) => {
          const div = document.querySelector(".task");
          div.remove();
    });
}

//provideing function to add button
form.addEventListener("submit",(e) => {
     e.preventDefault();
     removeTasks();

     tasks.push({
        title:title.value, 
        description:description.value,
     });

     //connect to a local storage and add the task and it store in string form
     localStorage.setItem("tasks",JSON.stringify(tasks)); 
     showAllTasks();
});
