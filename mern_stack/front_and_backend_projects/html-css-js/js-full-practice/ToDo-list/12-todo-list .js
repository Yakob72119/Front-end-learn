const todoList = [{
    name: 'making dinner',
    duedate: '10-30-2023'
},{
    name: 'washing dishes',
    duedate: '10-30-2023'
}
];

renderTodoList();

function renderTodoList(){
    let todoListHTML= '';
    
   todoList.forEach(function(todoObject,index){

    const {name,duedate}=todoObject;
    
    const html=`
    <div>${name}</div>
    <div>${duedate}</div>
    <button onClick="
    todoList.splice(${index},1);
    renderTodoList();
    "
    class="delete-todo-btn"
    >Delete</button>
   `;
    todoListHTML += html;
    
   })
  /*

          The old method befor forEach Method
    for(let i=0;i<todoList.length;i++){
        const todoObject=todoList[i];
        // const name=todoObject.name;
        // const duedate=todoObject.duedate;
        // we can use object distructuring
        const {name,duedate}=todoObject;
        
        const html=`
        <div>${name}</div>
        <div>${duedate}</div>
        <button onClick="
        todoList.splice(${i},1);
        renderTodoList();
        "
        class="delete-todo-btn"
        >Delete</button>
       `;
        todoListHTML += html;
    }
  */
    document.querySelector('.js-todo-list').innerHTML= todoListHTML;
}

function addTodo(){
const inputElement=document.querySelector('.js-name-input');
const name=inputElement.value;

const dateInputElement=document.
    querySelector('.js-due-date-input');
const duedate=dateInputElement.value;
todoList.push({
    // name:name,
    // duedate:duedate
    name,
    duedate
});


inputElement.value='';
renderTodoList();
}
