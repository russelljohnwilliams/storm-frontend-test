const url = 'http://localhost:4000/api/task'

window.onload = function(){
  getData();
}


function getData(check) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    fadeElementsOnLoad(data);
    displayTask(data);
  })
}

function fadeElementsOnLoad(data) {
  var i = 0;
  var x = data.length
  var intr = setInterval(function() {
    displayTask(i, data);
    i++

    if (i == x ) clearInterval(intr);
  }, 50)
}

function displayTask(i, data) {

  var ul = document.getElementById('list');

  // for(i = 0; i < data.length; i++){
    var li = document.createElement('li');
    ul.appendChild(li);
    var title = data[i].title;
    var importance = data[i].importance;
    setImportance(li, importance);
    adCheckbox(li);
    addTextToList(li, title);
    removeLoader()
  // }
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
  text.classList.add("imp-"+(imp+1));
}

function removeLoader() {
  var load = document.getElementById('loader')
  if(load != null){
    load.style.opacity = 0
    setTimeout(function(){ 
      load.remove()
    }, 500);
  

  }
}






{
  console && console.log('%c careers@stormid.com ', 'background: #272727; color: #ffffff');
}