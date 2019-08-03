const url = 'http://localhost:4000/api/task'

window.onload = function(){
  getData();
  createButtonToAddAnItem()
}



function getData(check) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    fadeElementsOnLoad(data);
  })
}

function fadeElementsOnLoad(data) {
  var i = 0;
  var x = data.length
  var intr = setInterval(function() {
    displayTask(data[i]);
    i++
    if (i == x ) clearInterval(intr);
  }, 100)
}

function displayTask(data) {
  var ul = document.getElementById('list');
  var li = document.createElement('li');
  var title = data.title;
  var importance = data.importance;
  ul.appendChild(li);
  li.setAttribute('id', data.id)
  setImportance(li, importance);
  adCheckbox(li);
  addTextToList(li, title);
  removeLoader()
  checkIsDone(li, data)
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
    load.style.opacity = 0
    load.style.height = "80px"
    load.style.width = "80px"
    load.style.left = "calc(50% - 40px)"
    setTimeout(function(){ 
      load.remove()
    }, 600);
  }
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

// ============
// ADD NEW ITEM 
// ============ 

function createButtonToAddAnItem() {
  var header = document.getElementsByTagName('header')[0]
  var button = header.appendChild(document.createElement('button'));
  button.innerHTML = " + Add item"
  button.setAttribute("onclick", addNewItem);
  button.setAttribute("id", 'add-item-button');
  button.onclick = addNewItem
}

function addNewItem() {
  addANewItem()
  createInput()
  createDoneButton()
  createSelectBox()
  hideAddItemButton()
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

function hideAddItemButton(argument) {
  var button = document.getElementById('add-item-button')
  button.remove()
}

{
  console && console.log('%c careers@stormid.com ', 'background: #272727; color: #ffffff');
}