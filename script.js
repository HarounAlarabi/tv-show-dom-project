
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let counterEl = document.createElement('p');
  counterEl.className = 'counter';
  // counterEl.textContent = `Got ${episodeList.length} episode(s)`;
  // rootElem.appendChild(counterEl)
  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.className = "episode";
    let episodeName = document.createElement("h3");
    episodeName.textContent = `${episode.name} - E0${episode.season}S0${episode.number}`;
    let episodeImage = document.createElement("img");
    let episodeUrl = document.createElement("a")
    episodeUrl.href = `${episode.url}`;
    episodeImage.src = `${episode.image.original}`;
    let episodeDesc = document.createElement("p");
    episodeDesc.innerHTML = `${episode.summary}`;

    rootElem.appendChild(episodeElem);
    episodeElem.appendChild(episodeName);
    episodeElem.appendChild(episodeUrl);
    episodeUrl.appendChild(episodeImage);
    episodeElem.appendChild(episodeDesc);
  });

}




window.onload = setup;

