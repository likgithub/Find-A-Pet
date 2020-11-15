const imagesApp = document.getElementById('images');

const imagesContainer = document.createElement('div');
imagesContainer.setAttribute('class', 'container');

imagesApp.appendChild(imagesContainer);

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
        card.setAttribute('class', 'image');

        const h1 = document.createElement('h1');
        h1.textContent = animal.breeds[0].name;

        const img = document.createElement('img');
        img.setAttribute('src', animal.url);
        img.setAttribute('height', '500px');

        imagesContainer.appendChild(card);
        card.appendChild(h1);
        card.appendChild(img);
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      imagesApp.appendChild(errorMessage);
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
        card.setAttribute('class', 'image');

        const h1 = document.createElement('h1');
        h1.textContent = breed;

        const img = document.createElement('img');
        img.setAttribute('src', data.message[i]);
        img.setAttribute('height', '500px');

        imagesContainer.appendChild(card);
        card.appendChild(h1);
        card.appendChild(img);
      }
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      imagesApp.appendChild(errorMessage);
    }
  }
  request.send();
}

var requestImages1 = new XMLHttpRequest();
var urlImages1 = "https://api.the" + animal_type + "api.com/v1/breeds/search?q=" + breed;
requestImages1.open('GET', urlImages1, true);
requestImages1.setRequestHeader('Content-Type', 'application/json');
if (animal_type == "dog") {
  requestImages1.setRequestHeader('x-api-key', 'bdcbf431-4308-4689-b9da-d2d03637e1dc');
}
else {
  requestImages1.setRequestHeader('x-api-key', 'eee797a0-e404-465c-9ad2-dc275ec7ae2b');
}
requestImages1.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(requestImages1.status);
  if (requestImages1.status == 200) {
    data.forEach(resp => {
      var _url = "https://api.the" + animal_type + "api.com/v1/images/search?breed_id=" + resp.id + "&format=json&limit=20";
      createXHRequestWithHeaders('GET', _url);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it is not working!`;
    imagesApp.appendChild(errorMessage);
  }
}
requestImages1.send();

if (animal_type == "dog") {
  var requestImages2 = new XMLHttpRequest();
  var urlImages2 = "https://dog.ceo/api/breeds/list/all";
  requestImages2.open('GET', urlImages2, true);
  requestImages2.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data.message);
    console.log(requestImages2.status);
    if (requestImages2.status == 200) {
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
      imagesApp.appendChild(errorMessage);
    }
  }
  requestImages2.send();
}
