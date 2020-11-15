const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var _breed = "golden retriever";
var animal_type = "dog";
var zip = 77840;

var pf = new petfinder.Client({apiKey: "E1J8gff3nnNTGgYrWZFkMlsQACitgkkvEealRnWttvYRjZmapT", secret: "BwZWVHUMd8HfMcPXujKWuA5RKfggtV4R8K2SxpFb"});

pf.animal.search({
  type: animal_type,
  breed: _breed,
  location: zip,
  distance: 200,
}).then(function (response) {
  console.log(response.data)
  response.data.animals.forEach(animal => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const h1 = document.createElement('h1');
    h1.textContent = animal.name;

    const p0 = document.createElement('p');
    p0.textContent = animal.description;

    const url = document.createElement('a');
    url.setAttribute('href', animal.url)
    url.textContent = `More Info`;

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p0);
    card.appendChild(url);
  });
})
.catch(function (error) {
    console.log(error);
});
