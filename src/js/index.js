const url = 'http://localhost:4000/api/task'

window.onload = function(){
  getData();
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
    ul.appendChild(li);
    var title = data.title;
    var importance = data.importance;
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

function adCheckbox(li){  
  var button = li.appendChild(document.createElement('button'));
  button.innerHTML = "<div class='tick-box'>✓<div>"
  button.setAttribute("onclick", tickUntickCheckbox);
  button.setAttribute("class", 'checkbox-button');
  button.onclick = tickUntickCheckbox
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
console.log("item", item.parentNode)
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




{
  console && console.log('%c careers@stormid.com ', 'background: #272727; color: #ffffff');
}