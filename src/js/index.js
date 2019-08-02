const url = 'http://localhost:4000/api/task'

window.onload = function(){
  getData()
}


function getData(check) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    displayTask(data)
  })
}

function displayTask(data) {
  var ul = document.getElementById('list')
  for(i = 0; i < data.length; i++){
    var li = document.createElement('li');
    ul.appendChild(li);
    var title = data[i].title
    var importance = data[i].importance
    setImportance(li, importance)
    adCheckbox(li)
    addTextToList(li, title)
  }
  console.log('list', ul)
}

function addTextToList(li, title) {
  var text = li.appendChild(document.createElement('div'));
  text.className = 'title'
  text.appendChild(document.createTextNode(title));
}

function adCheckbox(li){  
  var button = li.appendChild(document.createElement('button'));
  button.innerHTML = "<div class='tick-box'>✓<div>"
  button.setAttribute("class", 'checkbox-button');
}

function setImportance(text, imp) {
  text.classList.add("imp-"+(imp+1))
}






{
	console && console.log('%c careers@stormid.com ', 'background: #272727; color: #ffffff');
}