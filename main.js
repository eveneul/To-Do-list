const taskInput = document.getElementById('task-input');
const addbtn = document.getElementById('add-btn');
const tabs = document.querySelectorAll('.menu-tabs div');
const dateText = document.getElementById('date');
const menuTabs = document.getElementsByClassName('tab');


let taskList = [];
let filterList = [];
let mode = 'all'
let now = new Date();

// 날짜
const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let nowMonth = monthArray[now.getMonth()];
let nowDate = now.getDate();
let nowDay = dayArray[now.getDay()];
let nowDayRender = `${nowDay}, ${nowDate} ${nowMonth}`

dateText.innerText = nowDayRender;



// 할 일 추가
function addTask () {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }

  taskList.push(task);
  taskInput.value = '';
  render();
}

// 할 일 분류하기(필터링하기)
for(let i=0; i<tabs.length; i++) {
  tabs[i].addEventListener('click', function (e) {
    filter (e)
  })
}

function filter (e) {
  mode = e.target.id;
  filterList = [];

  if (mode == 'all') {
    render ()
    
  } else if (mode == 'ongoing') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i])
      }
    } 
    render (); 
  } else if (mode == 'done') {
      for (let i=0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
          filterList.push(taskList[i])
        }
      }
      render();
    }
  }


// UI로 출력하기 (렌더링)
function render () {
  let resultHTML = '';
  let list = [];

  if (mode == 'all') {
    list = taskList;
  } else if (mode == 'ongoing' || mode == 'done') {
    list = filterList;
  }
  
  for (let i=0; i<list.length; i++) {

    if (list[i].isComplete == true) {
      resultHTML += `
      <div class="task">
      <div id="user-task" class="done-user-task">${list[i].taskContent}</div>
      <button class="material-icons" id="refresh-icon" onclick="toggleComplete('${list[i].id}')">refresh</button>
      <button class="material-icons" id="remove-icon" onclick="deleteTask('${list[i].id}')">delete_outline</button>
      </div>`
    } else {
      resultHTML += `
      <div class="task">
      <div id="user-task">${list[i].taskContent}</div>
      <button class="material-icons" id="done-icon" onclick="toggleComplete('${list[i].id}')">done</button>
      <button class="material-icons" id="remove-icon" onclick="deleteTask('${list[i].id}')">delete_outline</button>
      </div>`;
    }
  }

  document.querySelector('.task-board').innerHTML = resultHTML
}


// 할 일 완료 버튼 클릭
function toggleComplete (id) {
  for (let i=0; i<taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete
      break;
    }
  }
  render();
}


// 할 일 삭제
function deleteTask (id) {
  for(let i=0; i<taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1)
      break;
    }
  }
  render();
}

// 각각의 할 일에게 고유한 ID 부여하기
function randomIDGenerate () {
  return '__' + Math.random().toString(36).substr(2, 9);
}

// 매뉴 탭 스타일 이벤트
function handleClick (e) {
  if (e.target.classList[1] == 'now-tab') {
    e.target.classList.remove('now-tab');
  } else {
    for (let i=0; i < menuTabs.length; i++) {
      menuTabs[i].classList.remove('now-tab')
    }
    e.target.classList.add('now-tab')
  }
}

function init () {
  for (let i=0; i<menuTabs.length; i++) {
    menuTabs[i].addEventListener('click', handleClick)
  }
}

init();

// 엔터 이벤트 생성 (마우스로 클릭 안 해도 할 일이 생성되게끔)

taskInput.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    addTask(e);
  }
})

addbtn.addEventListener('click', addTask)