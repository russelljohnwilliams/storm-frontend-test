const url = 'http://localhost:4000/api/task'

var data = {
  title: "",
  isDone: "false",
  importance: "",
}

window.onload = function(){
  getData();
  createButtonToAddAnItem()
}

// =============
// DISPLAY TASKS 
// =============

function getData(check) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (check == 'new'){
      removeElements(data) 
    }
    else{
      checkDataFirst(data)
      // sortByImportance(data)
    }
  });
}

function checkDataFirst(data) {
  console.log("data east", data.length)
  if(data.length == 0){
    displayAnEmptyMessage()
  }if (data.length > 0){
    sortByImportance(data)
  }
}

function sortByImportance(data) {
  data.sort(function (a, b) {
    return a.importance - b.importance;
  });
  fadeElementsOnLoad(data);
}

function fadeElementsOnLoad(data) {
  var i = 0;
  var x = data.length
  var interval = setInterval(function() {
    displayTask(data[i]);
    i++
    if (i == x ) clearInterval(interval);
  }, 100)
}

function displayTask(data) {
  var ul = document.getElementById('list');
  var li = document.createElement('li');
  var title = data.title;
  var importance = data.importance;
  ul.appendChild(li);
  li.style.opacity = '1'
  li.setAttribute('id', data.id)
  setImportance(li, importance);
  adCheckbox(li);
  addTextToList(li, title);
  removeLoader()
  checkIsDone(li, data)
  createDeleteButton(li)

}

function addTextToList(li, title) {
  var text = li.appendChild(document.createElement('div'));
  text.className = 'title'
  text.appendChild(document.createTextNode(title));
}

function setImportance(text, imp) {
  text.classList.add("imp-"+(imp+1));
}

function removeLoader() {
  var load = document.getElementById('loader')
  if(load != null){
    load.style.opacity = '0'
    load.style.height = "80px"
    load.style.width = "80px"
    load.style.left = "calc(50% - 40px)"
    setTimeout(function(){ 
      load.remove()
    }, 600);
  }
}

function displayAnEmptyMessage() {
  var messageArea = document.getElementById('list');
  var text = messageArea.innerHTML = "<div id='no-tasks'>CONGRATULATIONS!!!<br>There are no tasks for you to complete<br>Please add some more fun tasks to work on</div>"

}

// ============
//   CHECKBOX 
// ============ 

function adCheckbox(li){  
  var button = li.appendChild(document.createElement('button'));
  button.innerHTML = "<div class='tick-box'>✓<div>"
  button.setAttribute("onclick", tickUntickCheckbox);
  button.setAttribute("class", 'checkbox-button');
  button.onclick = tickUntickCheckbox
}

function checkIsDone(li, data) {
  if (data.isDone == 'true'){
    li.classList.add('checked')
  }
}

function tickUntickCheckbox() {
  if (this.parentNode.classList.contains('checked') == false){
    this.parentNode.classList.add('checked')
    editIsDone(this, 'true')
  }else{
    this.parentNode.classList.remove('checked')
    editIsDone(this, 'false')
  }
}

function editIsDone(item, trueFalse){
  var patchData = {
    method: 'PATCH', 
    body: JSON.stringify({'isDone': trueFalse}),
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch( url+'/'+item.parentNode.id, patchData)
  .then(response => response.json()
    )
  .catch(error => console.log('error is', error)
    )
}

// ====================
// ADD NEW ITEM - Build
// ====================

function createButtonToAddAnItem() {
  var header = document.getElementsByTagName('header')[0]
  var button = header.appendChild(document.createElement('button'));
  button.innerHTML = " <div class='plus'>+</div> <div class='text'>Add item</div>"
  button.setAttribute("onclick", addNewItem);
  button.setAttribute("id", 'add-item-button');
  button.onclick = addNewItem

}

function addNewItem() {
  addANewItem()
  createInput()
  createDoneButton()
  createSelectBox()
  hideAnElement(this)
  done()
}

function addANewItem() {
  var header = document.getElementsByTagName('header')[0]
  var newItem = header.appendChild(document.createElement('div'))
  header.setAttribute("id", "newItem")
  newItem.id = "new-item"
}

function createInput() {
  var newItem = document.getElementById('new-item')
  var textBox = newItem.appendChild(document.createElement('input'))
  textBox.autofocus = true;
  textBox.setAttribute('placeholder', 'Type slowly')
  textBox.setAttribute('value', '')
  textBox.id = "textInput"
}

function createDoneButton() {
  var newItem = document.getElementById('new-item')
  var button = newItem.appendChild(document.createElement('button'))
  button.id = "add-new-item-button"
  button.innerHTML = "+"
}

function createSelectBox() {
  var newItem = document.getElementById('new-item')
  var select = newItem.appendChild(document.createElement('select'))
  select.id = "importance-selector"
  for (var i = 0; i <= 2; i++) {
    var option = select.appendChild(document.createElement('option'))
    option.setAttribute("value", i)
    if(i == '0'){
      text = "high"
    }if(i == '1'){
      text = 'med'
    }if(i == '2'){
      text = 'low' 
    }
    option.innerHTML = text
  }
}

function hideAnElement(element){
  element.style.opacity = '0'
  setTimeout(function(){ 
    element.remove()
  }, 200);
}

// ============================
// ADD NEW ITEM - functionality
// ============================

function done() {
  document.getElementById("add-new-item-button").addEventListener("click", function(){
    text = document.getElementById("textInput");
    importance = document.getElementById("importance-selector");
    data.title = text.value;
    data.importance = importance.value;
    addTask(text, importance.value);
    hideAnElement(this.parentNode)
    createButtonToAddAnItem()
  });
}


function addTask(text, imp){
  var task = { 
    method: 'POST', 
    body: JSON.stringify({
      title: text.value,
      importance: imp
    } ),
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch(url, task
    )
  .then(response => response.json()
    )
  .then(getData('new')
    )
  .catch(error => console.log('error is', error))
} 


// ===========
// DELETE TASK 
// =========== 

function createDeleteButton(li){
  var button = li.appendChild(document.createElement('button'));
  button.innerHTML = "✕";
  button.setAttribute("class", 'delete-button');
  button.setAttribute("onclick", deleteItem);
  button.onclick = deleteItem;
}

function deleteItem(){
  deleteData(this.parentNode.id)
  removeElements(this)
}

function deleteData(value){
  var deleteData = { 
    method: 'DELETE', 
    body: JSON.stringify({
      id: value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch( url+'/'+value, deleteData)
  .then(response => response.json()
    )
  .catch(error => console.log('error is', error)
    )
} 

function removeElements(item) {
  var num = list.childNodes.length
  var i = 0;
  var interval = setInterval(function() {
    list.childNodes[i].style.opacity = "0"
    i++
    if (i == num) clearInterval(interval);
  }, 100)
  setTimeout(function(){ 
    deleteElements(num)
  }, num * 110);
}

function deleteElements(num){
 for(var i = num - 1; i >= 0; i--){
  list.childNodes[i].remove()
}
getData()
}



// {
//   console && console.log('%c careers@stormid.com ', 'background: #272727; color: #ffffff');
// }