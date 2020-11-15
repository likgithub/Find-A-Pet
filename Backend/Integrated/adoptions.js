const adoptsApp = document.getElementById('adopts');

const adoptsContainer = document.createElement('div');
adoptsContainer.setAttribute('class', 'container');

adoptsApp.appendChild(adoptsContainer);

var zip = 77840;

var pf = new petfinder.Client({apiKey: "E1J8gff3nnNTGgYrWZFkMlsQACitgkkvEealRnWttvYRjZmapT", secret: "BwZWVHUMd8HfMcPXujKWuA5RKfggtV4R8K2SxpFb"});

pf.animal.search({
  type: animal_type,
  breed: breed,
  location: zip,
  distance: 100,
}).then(function (response) {
  console.log(response.data)
  response.data.animals.forEach(animal => {
    const card = document.createElement('div');
    card.setAttribute('class', 'adoption');

    const h1 = document.createElement('h1');
    h1.textContent = animal.name;

    const p0 = document.createElement('p');
    var text = animal.description;
    if (text != null) {
      text = text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }
    p0.textContent = text;

    const url = document.createElement('a');
    url.setAttribute('href', animal.url)
    url.textContent = `More Info`;

    adoptsContainer.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p0);
    card.appendChild(url);
  });
})
.catch(function (error) {
    console.log(error);
});
