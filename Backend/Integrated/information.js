const infoApp = document.getElementById('info');

const infoContainer = document.createElement('div');
infoContainer.setAttribute('class', 'container');

infoApp.appendChild(infoContainer);

var breed = "golden retriever";
var animal_type = "dog";

var requestInfo = new XMLHttpRequest();
var urlInfo = "https://api.the" + animal_type + "api.com/v1/breeds/search?q=" + breed;
requestInfo.open('GET', urlInfo, true);
requestInfo.setRequestHeader('Content-Type', 'application/json');
if (animal_type == "dog") {
  requestInfo.setRequestHeader('x-api-key', 'bdcbf431-4308-4689-b9da-d2d03637e1dc');
}
else {
  requestInfo.setRequestHeader('x-api-key', 'eee797a0-e404-465c-9ad2-dc275ec7ae2b');
}
requestInfo.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(requestInfo.statusText);
  if (requestInfo.status == 200) {
    data.forEach(resp => {
        const card = document.createElement('div');
        card.setAttribute('class', 'information');

        const h1 = document.createElement('h1');
        h1.textContent = resp.name;

        const p0 = document.createElement('p');
        p0.textContent = resp.bred_for;

        const p1 = document.createElement('p');
        p1.textContent = resp.life_span;

        const p2 = document.createElement('p');
        p2.textContent = resp.temperament;

        infoContainer.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p0);
        card.appendChild(p1);
        card.appendChild(p2);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it is not working!`;
    infoApp.appendChild(errorMessage);
  }
}
requestInfo.send();
