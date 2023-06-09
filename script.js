

async function setup() {
  const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
  const allEpisodes = await response.json();
  searchEpisodes(allEpisodes);

  showList();

  makePageForEpisodes(allEpisodes);
  addButtonUp();
}
/*---------------------adding search bar*--------------------------*/
// const rootElement = document.getElementById("root");
// let searchDiv = document.createElement("div");
// searchDiv.className = "searchBar";


// function searTool(){
//   let dropDiv = document.createElement("div");
//   dropDiv.id = "drop";
//   let inputEl = document.createElement("input");
//   inputEl.type = "search";
//   let counterEl = document.createElement("p");
//   counterEl.textContent = `Displaying  ${episodeList.length} episodes.`;
//   document.body.prepend(searchDiv);
//   searchDiv.prepend(dropDiv);
//   dropDiv.append(inputEl,counterEl);
// }


// function searchEpisodes(episodeList) {
// let search = searTool();


//   inputEl.addEventListener("input", () => {
//     let searchLetter = inputEl.value.toLowerCase().trim();
//     let searchResults = episodeList.filter((episode) => {
//       let episodeName = episode.name ? episode.name.toLowerCase() : "";
//       let episodeSummary = episode.summary ? episode.summary.toLowerCase() : "";
//       return (
//         episodeName.includes(searchLetter) ||
//         episodeSummary.includes(searchLetter)
//       );
//     });
//     makePageForEpisodes(searchResults, rootElem);
//     searchLetter === ""
//       ? (counterEl.textContent = `Displaying  ${episodeList.length} episodes.`)
//       : (counterEl.textContent = `Displaying ${searchResults.length} / ${episodeList.length} episodes.`);
//   });
//   searchByEpisode(episodeList);
//   searchByShow();

// }
const rootElement = document.getElementById("root");
let searchDiv = document.createElement("div");
searchDiv.className = "searchBar";
let inputEl, counterEl;

function searchTool() {
  let dropDiv = document.createElement("div");
  dropDiv.id = "drop";
  inputEl = document.createElement("input");
  inputEl.type = "search";
  counterEl = document.createElement("p");
  counterEl.textContent = `Displaying ${episodeList.length} episodes.`;
  document.body.prepend(searchDiv);
  searchDiv.prepend(dropDiv);
  dropDiv.append(inputEl, counterEl);
  return searchDiv;
}

function searchEpisodes(episodeList) {


  inputEl.addEventListener("input", () => {
    let searchLetter = inputEl.value.toLowerCase().trim();
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
      ? (counterEl.textContent = `Displaying ${episodeList.length} episodes.`)
      : (counterEl.textContent = `Displaying ${searchResults.length} / ${episodeList.length} episodes.`);
  });

  searchByEpisode(episodeList);
  searchByShow();
  searchTool();
}

searchEpisodes(episodeList);

/*----------------------Drop Down one -------------------------------------*/

function searchByEpisode(episodeList) {
  let dropDownEl = document.createElement("select");
  dropDownEl.className = "dropDown";
  searchDiv.appendChild(dropDownEl);
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "Select an episode";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  dropDownEl.appendChild(defaultOption);
  episodeList.map((actors) => {
    let episodeOption = document.createElement("option");
    episodeOption.className = "episodeOption";
    episodeOption.textContent = `E0${actors.season}S0${actors.number}-${actors.name}`;
    dropDownEl.appendChild(episodeOption);
  });

  dropDownEl.addEventListener("change", () => {
    let selectedEpisode = dropDownEl.value;
    window.location.hash = selectedEpisode;
    makePageForEpisodes(
      episodeList.filter((episode) => {
        return (
          `E0${episode.season}S0${episode.number}-${episode.name}` ===
          selectedEpisode
        );
      })
    );
  });
}

/*--------------------------drop Down Two--------------------------------*/
function searchByShow() {
  let dropDownTwo = document.createElement("select");
  dropDownTwo.className = "dropDown";
  searchDiv.appendChild(dropDownTwo);
  let defOption = document.createElement("option");
  defOption.textContent = "Select a show";
  defOption.selected = true;
  defOption.disabled = true;
  dropDownTwo.appendChild(defOption);
  getAllShows().map((show) => {
    let option = document.createElement("option");
    option.textContent = show.name;
    option.value = show.id; // set the value to the show's id
    dropDownTwo.appendChild(option);
  });
  dropDownTwo.addEventListener("change", () => {
    goToPage2();
    let id = dropDownTwo.value;
    let url = `https://api.tvmaze.com/shows/${id}/episodes`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        makePageForEpisodes(data);
        const counterEl = document.querySelector(".searchBar p");
        counterEl.textContent = `Displaying ${data.length} episodes.`;
        episodeList = data; // set the episodeList variable to the data
        dropDownEl = document.querySelector(".dropDown"); // set the dropDownEl variable to the correct DOM element
        dropDownEl.innerHTML = ""; // clear the dropdown list
        episodeList.map((episode) => {
          let episodeOption = document.createElement("option"); // create a new option element for each episode
          episodeOption.className = "episodeOption";
          episodeOption.textContent = `E0${episode.season}S0${episode.number}-${episode.name}`;
          episodeOption.value = `E0${episode.season}S0${episode.number}-${episode.name}`; // set the value to the episode name
          dropDownEl.appendChild(episodeOption); // append the option to the dropdown list
        });
        dropDownEl.addEventListener("change", () => {
          let selectedEpisode = dropDownEl.value;
          makePageForEpisodes(
            episodeList.filter((episode) => {
              return (
                `E0${episode.season}S0${episode.number}-${episode.name}` ===
                selectedEpisode);
            })
          );
        });
      })
      .catch((error) => console.log(error)); // add error handling
  });
}

/*---------------------------------------------------------------------*/
function makePageForEpisodes(episodeList) {
  let rootElement = document.getElementById("root");
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
/*------------------------Add Button Up------------------------*/
function addButtonUp() {
  let buttonUp = document.createElement('button');
  buttonUp.className = "buttonUp";
  buttonUp.textContent = "Up";
 searchDiv.appendChild(buttonUp);
 window.onscroll = function () {
 window.scrollY >= 700 ? buttonUp.style.display ='block':buttonUp.style.display = 'none';
 }
 buttonUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    });
    });
}

function goToPage2() {
  window.location.href = 'shows.html';
}

/*-------------------------------------------------------------- */


function showList() {

  let secListShow = document.querySelector("#listShow");
  rootElement.display = 'none'
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


  document.body.append(secListShow);
}



window.onload = function () {
  const allEpisodes = setup();
  showList();
  makePageForEpisodes(allEpisodes);
  searchEpisodes(allEpisodes);
  searchByName(allEpisodes);
  addButtonUp();


};
