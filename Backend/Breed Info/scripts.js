const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var breed = "afghan hound";
var animal_type = "dog";

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
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = resp.name;

        const p0 = document.createElement('p');
        p0.textContent = resp.bred_for;

        const p1 = document.createElement('p');
        p1.textContent = resp.life_span;

        const p2 = document.createElement('p');
        p2.textContent = resp.temperament;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p0);
        card.appendChild(p1);
        card.appendChild(p2);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it is not working!`;
    app.appendChild(errorMessage);
  }
}
request.send();
