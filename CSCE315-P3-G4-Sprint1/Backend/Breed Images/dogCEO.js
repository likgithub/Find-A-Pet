const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var breed = "afghan hound";
var animal_type = "dog";

function createXHRequest (method, url) {
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  if (animal_type == "dog") {
    //request.setRequestHeader('x-api-key', 'bdcbf431-4308-4689-b9da-d2d03637e1dc');
  }
  else {
    request.setRequestHeader('x-api-key', 'eee797a0-e404-465c-9ad2-dc275ec7ae2b');
  }
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status == 200) {
        for (i = 0; i < 5; i++) {
           
          
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = animal.breeds[0].name;

        const img = document.createElement('img');
        img.setAttribute('src', animal[i]);
        img.setAttribute('width', '500px');

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(img);
        });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

var request = new XMLHttpRequest();
var url = "https://api.the" + animal_type + "api.com/v1/breeds/search?q=" + breed;
request.open('GET', url, true);
request.setRequestHeader('Content-Type', 'application/json');
if (animal_type == "dog") {
  //request.setRequestHeader('x-api-key', 'bdcbf431-4308-4689-b9da-d2d03637e1dc');
}
else {
  request.setRequestHeader('x-api-key', 'eee797a0-e404-465c-9ad2-dc275ec7ae2b');
}
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(request.status);
  if (request.status == 200) {
    data.forEach(resp => {
      var _url = "https://dog.ceo/api/breed/" + breed + "/images&format=json&limit=20";
      createXHRequest('GET', _url);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it is not working!`;
    app.appendChild(errorMessage);
  }
}
request.send();