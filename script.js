// Get all shows globally
const shows = getAllShows();
const blockCards = document.getElementById("block-cards");
const tvShowForm = document.getElementById("form");

//Select input of all shows
function selectShows(shows) {
  let selectInput = document.createElement("select");
  tvShowForm.appendChild(selectInput);
  let optionInput = document.createElement("option");
  optionInput.innerText = "Show all Shows";
  optionInput.value = "";
  selectInput.appendChild(optionInput);
  shows.forEach((show) => {
    let optionInput = document.createElement("option");
    optionInput.innerText = `${show.name}`;
    selectInput.appendChild(optionInput);
    optionInput.value = show.name;
  });

  selectInput.addEventListener("change", (e) => {
    blockCards.innerHTML = "";
    const inputSelect = e.target.value;
    console.log("This is my select event: ", inputSelect);
    // let found = shows.find((show) => {
    //   if (show.name === inputSelect) {
    //     return show.id;
    //   }

    // });
    const filteredShows = shows.find((show) => {
      if (show.name === inputSelect) {
        return show;
      }
    });
    console.log("filtered id; ", filteredShows);
    // filteredShows.forEach((show) => addEpisode(show));

    fetch(`https://api.tvmaze.com/shows/${filteredShows.id}/episodes`)
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
        makePageForEpisodes(data);
      });
  });
}

selectShows(shows);

function makePageForEpisodes(allEpisodes) {
  selectTvShowInput(allEpisodes);
  tvShowSearchBar(allEpisodes);
  allEpisodes.forEach((episode) => addEpisode(episode));
}

// Select function episodes
function selectTvShowInput(allEpisodes) {
  let selectInput;
  // intro.setAttribute('id', 'Introduction_ 1')

  if (!document.getElementById("selectOriginal")) {
    selectInput = document.createElement("select");
    selectInput.setAttribute("id", "selectOriginal");
  } else {
    selectInput = document.getElementById("selectOriginal");
    let optionInput = document.createElement("option");
    optionInput.innerText = "Show all Episode";
    optionInput.value = "";
    selectInput.innerHTML = `${optionInput}`;
  }

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
    blockCards.innerHTML = "";
    const inputSelect = e.target.value;
    const filteredCharacters = allEpisodes.filter((character) => {
      return character.name.includes(inputSelect);
    });
    filteredCharacters.forEach((episode) => addEpisode(episode));
  });
}

function addEpisode(episode) {
  let tvShowName = document.createElement("h2");
  console.log("this is: ", episode);
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
function tvShowSearchBar(allEpisodes) {
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
  console.log("Footer");
}
tvShowFooter();
