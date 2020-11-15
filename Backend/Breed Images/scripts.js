const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var breed = "golden retriever";
var animal_type = "dog";

function createXHRequestWithHeaders (method, url) {
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  if (animal_type == "dog") {
    request.setRequestHeader('x-api-key', 'bdcbf431-4308-4689-b9da-d2d03637e1dc');
  }
  else {
    request.setRequestHeader('x-api-key', 'eee797a0-e404-465c-9ad2-dc275ec7ae2b');
  }
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status == 200) {
      data.forEach(animal => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = animal.breeds[0].name;

        const img = document.createElement('img');
        img.setAttribute('src', animal.url);
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

function createXHRequest (method, url) {
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status == 200) {
      for (var i = 0; i < data.message.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = breed;

        const img = document.createElement('img');
        img.setAttribute('src', data.message[i]);
        img.setAttribute('width', '500px');

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(img);
      }
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
  request.setRequestHeader('x-api-key', 'bdcbf431-4308-4689-b9da-d2d03637e1dc');
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
      var _url = "https://api.the" + animal_type + "api.com/v1/images/search?breed_id=" + resp.id + "&format=json&limit=20";
      createXHRequestWithHeaders('GET', _url);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it is not working!`;
    app.appendChild(errorMessage);
  }
}
request.send();

if (animal_type == "dog") {
  var request2 = new XMLHttpRequest();
  var url2 = "https://dog.ceo/api/breeds/list/all";
  request2.open('GET', url2, true);
  request2.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data.message);
    console.log(request2.status);
    if (request2.status == 200) {
        var breedlist = breed.split(" ");
        var _url;
        if (breedlist.length == 1) {
          _url = "https://dog.ceo/api/breed/" + breedlist[0] + "/images/random/5";
        }
        else {
          if (data.message[breedlist[1]].includes(breedlist[0])) {
            _url = "https://dog.ceo/api/breed/" + breedlist[1] + "/" + breedlist[0] + "/images/random/5";
          }
          else {
            _url = "https://dog.ceo/api/breed/" + breedlist[0] + "/" + breedlist[1] + "/images/random/5";
          }
        }
        createXHRequest('GET', _url);
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it is not working!`;
      app.appendChild(errorMessage);
    }
  }
  request2.send();
}
