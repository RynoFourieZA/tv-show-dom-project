// Get all episodes globally
const allEpisodes = getAllEpisodes();
const blockCards = document.getElementById("block-cards");
const tvShowForm = document.getElementById("form");

//You can edit ALL of the code here
function setup() {
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  selectTvShowInput(episodeList);
  tvShowSearchBar();
  allEpisodes.forEach((episode) => addEpisode(episode));
  tvShowFooter();
}

// Select function
function selectTvShowInput(episode) {
  let selectInput = document.createElement("select");
  tvShowForm.appendChild(selectInput);
  let optionInput = document.createElement("option");
  optionInput.innerText = "Show all Episode";
  optionInput.value = "";
  selectInput.appendChild(optionInput);
  allEpisodes.forEach((episode) => {
    let optionInput = document.createElement("option");
    optionInput.innerText = `S${episode.season
      .toString()
      .padStart(2, 0)}E${episode.number.toString().padStart(2, 0)} - ${
      episode.name
    }`;
    selectInput.appendChild(optionInput);
    optionInput.value = episode.name;
  });

  selectInput.addEventListener("change", (e) => {
    blockCards.innerHTML = " ";
    const inputSelect = e.target.value;
    const filteredCharacters = allEpisodes.filter((character) => {
      return character.name.includes(inputSelect);
    });

    filteredCharacters.forEach((episode) => addEpisode(episode));
  });
}

function addEpisode(episode) {
  let tvShowName = document.createElement("h2");
  tvShowName.innerText = `${episode.name} - S${episode.season
    .toString()
    .padStart(2, 0)}E${episode.number.toString().padStart(2, 0)}`; // First used back ticks, use string interpolation then target object and its property, get an array convert to string, use padStart it adds 2 digits
  blockCards.appendChild(tvShowName);

  let tvShowImg = document.createElement("img");
  tvShowImg.src = episode.image.medium;
  blockCards.appendChild(tvShowImg);

  let tvShowSummary = document.createElement("p");
  tvShowSummary.innerHTML = episode.summary;
  blockCards.appendChild(tvShowSummary);
}

// Search Function
function tvShowSearchBar() {
  let gmCharacters = [];
  const searchBar = document.getElementById("searchBar");
  let episodeDisplay = document.createElement("p");
  tvShowForm.appendChild(episodeDisplay);

  // here we needed to see if the input value is showing.
  searchBar.addEventListener("keyup", (e) => {
    blockCards.innerHTML = " ";
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = allEpisodes.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchString) ||
        character.summary.toLowerCase().includes(searchString)
      );
    });

    filteredCharacters.forEach((episode) => addEpisode(episode));
    let charactersLength = filteredCharacters.length;
    console.log(charactersLength);
    episodeDisplay.innerText = `Displaying ${charactersLength}/73 episodes`;

  });
}

// footer function
function tvShowFooter() {
  let siteFooter = document.createElement("footer");
  document.body.appendChild(siteFooter);
  let footerParagraph = document.createElement("p");
  let link = document.createElement("A");
  link.setAttribute("href", "https://www.tvmaze.com/");
  link.innerHTML = "Tv show";
  footerParagraph.innerText = `The data displayed on this page was originally taken from: `;
  siteFooter.appendChild(footerParagraph);
  footerParagraph.appendChild(link);
}

window.onload = setup;
