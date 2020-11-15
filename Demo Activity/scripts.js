const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/people', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(person => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = person.name;
	  
	  const a = document.createElement('p');
	  a.textContent = `Age: ${person.age}`;
	  
	  const g = document.createElement('p');
	  g.textContent = `Gender: ${person.gender}`;
	  
	  const h = document.createElement('p');
	  h.textContent = `Hair Color: ${person.hair_color}`;
	  
	  const e = document.createElement('p');
	  e.textContent = `Eye Color: ${person.eye_color}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(a);
      card.appendChild(g);
      card.appendChild(h);
      card.appendChild(e);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();
