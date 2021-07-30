// Get all shows globally
const shows = getAllShows();
const blockCards = document.getElementById("block-cards");
const tvShowForm = document.getElementById("form");
const singleEpisode = document.createElement("div");
blockCards.appendChild(singleEpisode);

fetch(`https://api.tvmaze.com/shows/82/episodes`)
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw new Error(
        `Encountered something unexpected: ${response.status} ${response.statusText}`
      );
    }
  })
  .then((data) => {
    // do whatever you want with the JSON response
    let allEpisodes = data;
    makePageForEpisodes(allEpisodes);
  });

function makePageForEpisodes(allEpisodes) {
  // allEpisodes.forEach((episode) => addEpisode(episode));
  for (let i = 0; i < allEpisodes.length; i++) {
    addEpisode(allEpisodes[i]);
  }
  selectTvShowInput(allEpisodes);
  tvShowSearchBar(allEpisodes);
}

// Select function episode
let selectInput = document.createElement("select");
tvShowForm.appendChild(selectInput);
let optionInput = document.createElement("option");
optionInput.innerText = "Show all Episode";
optionInput.value = "";
selectInput.appendChild(optionInput);

function selectTvShowInput(allEpisodes) {
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
    singleEpisode.innerHTML = "";
    const inputSelect = e.target.value;
    const filteredCharacters = allEpisodes.filter((character) => {
      return character.name.includes(inputSelect);
    });
    filteredCharacters.forEach((episode) => addEpisode(episode));
  });
}

// Display my episodes
function addEpisode(episode) {
  let tvShowName = document.createElement("h2");
  tvShowName.innerText = `${episode.name} - S${episode.season
    .toString()
    .padStart(2, 0)}E${episode.number.toString().padStart(2, 0)}`; // First used back ticks, use string interpolation then target object and its property, get an array convert to string, use padStart it adds 2 digits
  singleEpisode.appendChild(tvShowName);

  let tvShowImg = document.createElement("img");
  tvShowImg.src = episode.image.medium;
  singleEpisode.appendChild(tvShowImg);

  let tvShowSummary = document.createElement("p");
  tvShowSummary.innerHTML = episode.summary;
  singleEpisode.appendChild(tvShowSummary);

}

// Search Function
function tvShowSearchBar(allEpisodes) {
  let gmCharacters = [];
  const searchBar = document.getElementById("searchBar");
  let episodeDisplay = document.createElement("p");
  tvShowForm.appendChild(episodeDisplay);

  // here we needed to see if the input value is showing.
  searchBar.addEventListener("keyup", (e) => {
    singleEpisode.innerHTML = " ";
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = allEpisodes.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchString) ||
        character.summary.toLowerCase().includes(searchString)
      );
    });

    filteredCharacters.forEach((episode) => addEpisode(episode));
    let charactersLength = filteredCharacters.length;
    episodeDisplay.innerText = `Displaying ${charactersLength}/73 episodes`;
  });
}

// Shows
let selectShows = document.createElement("select");
tvShowForm.appendChild(selectShows);
// let optionShow = document.createElement("option");
// optionShow.innerText = "Show all Shows"; // placeholder
// selectShows.appendChild(optionShow);

function getId() {
  shows.forEach((show) => {
    let newOptionShow = document.createElement("option");
    selectShows.appendChild(newOptionShow);
    newOptionShow.innerHTML = show.name;
  });

  selectShows.addEventListener("change", (e) => {
    // makePageForEpisodes([]);
    let showName = shows.find((show) => show.name.includes(e.target.value));

    fetchShows(showName.id);
  });
}

getId();

function fetchShows(num) {
  fetch(`https://api.tvmaze.com/shows/${num}/episodes`)
    .then((res) => {
      return res.json();
    })
    .then((data) => displayShows(data));
}

function displayShows(arr) {
  singleEpisode.style.display = "none";
  makePageForShow(arr);
}

function makePageForShow(arr) {
  // allEpisodes.forEach((episode) => addEpisode(episode));
  for (let i = 0; i < allEpisodes.length; i++) {
    addEpisode(allEpisodes[i]);
  }
  selectTvShowInput(allEpisodes);
  tvShowSearchBar(allEpisodes);
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

tvShowFooter();
