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
  var list = document.getElementById('list')
  for(i = 0; i < data.length; i++){
    var item = document.createElement('li');
    list.appendChild(item);
    var title = data[i].title
    addText(item, title)
  }
  console.log('list', list)
}

function addText(item, title) {
  var text = item.appendChild(document.createElement('div'));
  text.className = 'title'
  text.appendChild(document.createTextNode(title));
}









{
	console && console.log('%c careers@stormid.com ', 'background: #272727; color: #ffffff');
}