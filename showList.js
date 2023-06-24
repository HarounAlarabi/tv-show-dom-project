function showList() {
  let searchBar = document.querySelector('.searchDiv')
  let secListShow = document.querySelector("#listShow");

  for (let show of getAllShows()) { // Assuming getAllShows is a function that returns an array of shows
      let cardContent = document.createElement('div');
      let headerList = document.createElement('h2');
    let showDiv = document.createElement('div');
    showDiv.className='card';
    let imageEl = document.createElement('img');
    let showDesc = document.createElement('p');
    let sideDiv = document.createElement('div');
    sideDiv.className ='side'
    let ratedEl = document.createElement('p');
    let genresEl = document.createElement('p');
    let statusEl = document.createElement('p');
    let runTimeEl = document.createElement('p');
    headerList.textContent = show.name;
    imageEl.src = show.image.original;
    showDesc.innerHTML = show.summary;
    ratedEl.textContent = `Rating: ${show.rating.average}`;
    genresEl.textContent = `Genres: ${show.genres.join(', ')}`;
    statusEl.textContent = `Status: ${show.status}`;
    runTimeEl.textContent = `Runtime: ${show.runtime} min`;

    secListShow.appendChild(cardContent);
    cardContent.append(headerList,showDiv);

    showDiv.append(imageEl,showDesc,sideDiv);
    sideDiv.append(ratedEl,genresEl,statusEl,runTimeEl);

  }
  document.prepend(searchBar);

  document.body.append(secListShow);
}

window.onload = function() {

  showList();
  searchByEpisode();
};


function showList(searchBarHTML) {
  let secListShow = document.querySelector("#listShow");
  let searchBarContainer = document.createElement("div");
  searchBarContainer.innerHTML = searchBarHTML.trim();

  for (let show of getAllShows()) {
    let cardContent = document.createElement("div");
    let headerList = document.createElement("h2");
    let showDiv = document.createElement("div");
    showDiv.className = "card";
    let imageEl = document.createElement("img");
    let showDesc = document.createElement("p");
    let sideDiv = document.createElement("div");
    sideDiv.className = "side";
    let ratedEl = document.createElement("p");
    let genresEl = document.createElement("p");
    let statusEl = document.createElement("p");
    let runTimeEl = document.createElement("p");

    headerList.textContent = show.name;
    imageEl.src = show.image.original;
    showDesc.innerHTML = show.summary;
    ratedEl.textContent = `Rating: ${show.rating.average}`;
    genresEl.textContent = `Genres: ${show.genres.join(", ")}`;
    statusEl.textContent = `Status: ${show.status}`;
    runTimeEl.textContent = `Runtime: ${show.runtime} min`;

    cardContent.append(headerList, showDiv);
    showDiv.append(imageEl, showDesc, sideDiv);
    sideDiv.append(ratedEl, genresEl, statusEl, runTimeEl);
    secListShow.appendChild(cardContent);
  }

  document.body.insertBefore(searchBarContainer.firstChild, document.body.firstChild);
  document.body.appendChild(secListShow);
}

window.onload = function() {
  fetch('path/to/another/page.html')
    .then(response => response.text())
    .then(searchBarHTML => {
      showList(searchBarHTML);
      searchByEpisode();
    })
    .catch(error => {
      console.error('Error fetching searchBar HTML:', error);
      // Handle error
    });
};
