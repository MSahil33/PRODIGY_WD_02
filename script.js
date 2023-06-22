let input = document.querySelector('#inp');

let add_btn = document.querySelector('.add_btn');

let tasks_lists = document.querySelector('.tasks-list');


let input_val ;

//Array to store the task lists 
let myTasks = [];
input.addEventListener("keyup",  (e)=> {
    // console.log(event.key);
    if (e.key == "Enter") {
        input_val = e.target.value; 
        // alert(input_val);
        e.target.value = "";
        if(!(input_val.trim() === "")){
            addTask(input_val,false);
            displayTasks();

        }
    }
});

add_btn.addEventListener('click',()=>{
    input_val = input.value;
    // alert(input_val);
    input.value = "";    
    if(!(input_val.trim() === "")){
        addTask(input_val,false);
        displayTasks();

    }
});

//Function to add the notes to lists of task after clicking add or pressing enter button
let addTask = (data,completed) =>{
    myTasks.push({task:data,taskCompleted:completed});
    console.log(myTasks);
}



//Function to display the tasks
let displayTasks = ()=>{
    if(myTasks.length == 0){
        tasks_lists.textContent = 'No tasks to display....';
        tasks_lists.style = "color:#023047;";
    }else{
        tasks_lists.textContent= '';
        tasks_lists.style = '';

        saveTasks();
        myTasks.forEach(t => {
            
            // List item Element 
            let list_item = document.createElement('li');
            list_item.classList.add('list-item');
            // task text item Element
            let task_text = document.createElement('div');
            task_text.innerText = t.task;
            task_text.style.width="100%";
            // Task close btn element
            let close_btn = document.createElement('span');
            close_btn.classList.add('close-btn');
            close_btn.innerText = '+';

            //Adding the task text and close btn to tne list item
            list_item.appendChild(task_text);
            list_item.appendChild(close_btn);

            // tasks_lists.appendChild(list_item);
            tasks_lists.insertBefore(list_item,tasks_lists.firstChild);

            
            // After clicking the close btn
            close_btn.addEventListener('click',()=>{
                myTasks.splice(myTasks.indexOf(t),1);
                displayTasks();
                saveTasks();
            });


            //After clicking the task text to mark it as completed
            task_text.addEventListener('click',()=>{
                //Setting the task completed to false
                t.completed = !t.completed;
                displayTasks();
                console.log(myTasks);
            })

            //Adding the strike line on the task text if it is completed
            if(t.completed){
                task_text.style = 'text-decoration:line-through;';
            }

        });

    }
}


//Function to store the tasks in the localstorage

let saveTasks = ()=>{
    localStorage.setItem("tasks",JSON.stringify(myTasks));
}

//Loading the tasks from the loval storage
let loadTask = () =>{
    let loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(loadedTasks){
        myTasks.push(...loadedTasks);
    }
}

loadTask();



displayTasks();