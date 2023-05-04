function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisodes(allEpisodes);
}
/*---------------------adding search bar*--------------------------*/

function searchEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let dropDiv = document.createElement("div");
  dropDiv.id = "drop";
  let searchDiv = document.createElement("div");
  searchDiv.className = "searchBar";
  let inputEl = document.createElement("input");
  inputEl.setAttribute("type", "text");
  document.body.prepend(inputEl);
  let counterEl = document.createElement("p");
  counterEl.textContent = `Displaying  ${episodeList.length} episodes.`;

  document.body.prepend(searchDiv);
  dropDiv.appendChild(inputEl);
  dropDiv.appendChild(counterEl);

  inputEl.addEventListener("input", () => {
    let searchLetter = inputEl.value.toLowerCase();
    let searchResults = episodeList.filter((episode) => {
      let episodeName = episode.name ? episode.name.toLowerCase() : "";
      let episodeSummary = episode.summary ? episode.summary.toLowerCase() : "";
      return (
        episodeName.includes(searchLetter) ||
        episodeSummary.includes(searchLetter)
      );
    });
    makePageForEpisodes(searchResults, rootElem);
    searchLetter === ""
      ? (counterEl.textContent = `Displaying  ${episodeList.length} episodes.`)
      : (counterEl.textContent = `Displaying ${searchResults.length} / ${episodeList.length} episodes.`);
  });
  /*----------------------Drop Down -------------------------------------*/

  let dropDownEl = document.createElement("select");
  dropDownEl.className = "dropDown";
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "Select an episode";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  dropDownEl.appendChild(defaultOption);
  episodeList.map((actors) => {
    let episodeOption = document.createElement("option");
    episodeOption.textContent = `E0${actors.season}S0${actors.number}-${actors.name}`;
    dropDownEl.appendChild(episodeOption);
  });

  dropDownEl.addEventListener("change", () => {
    let selectedEpisode = dropDownEl.value;
    makePageForEpisodes(
      episodeList.filter((episode) => {
        return (
          `E0${episode.season}S0${episode.number}-${episode.name}` ===
          selectedEpisode
        );
      })
    );
  });

  searchDiv.prepend(dropDiv);
  searchDiv.appendChild(dropDownEl);
}

/*---------------------------------------------------------------------*/
function makePageForEpisodes(episodeList) {
  rootElement = document.getElementById("root");
  rootElement.innerHTML = "";
  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.className = "episode";
    let episodeName = document.createElement("h3");
    episodeName.textContent = `${episode.name} - E0${episode.season}S0${episode.number}`;
    let episodeImage = document.createElement("img");
    let episodeUrl = document.createElement("a");
    episodeUrl.href = `${episode.url}`;
    episodeImage.src = `${episode.image.original}`;
    let episodeDesc = document.createElement("p");
    episodeDesc.innerHTML = `${episode.summary}`;

    rootElement.appendChild(episodeElem);
    episodeElem.appendChild(episodeName);
    episodeElem.appendChild(episodeUrl);
    episodeUrl.appendChild(episodeImage);
    episodeElem.appendChild(episodeDesc);
  });
}

/*-------------------------------------------------------------- */

window.onload = function () {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisodes(allEpisodes);
  searchByName(allEpisodes);
};
