// Get all episodes globally
const allEpisodes = getAllEpisodes();
const blockCards = document.getElementById("block-cards");


//You can edit ALL of the code here
function setup() {
  makePageForEpisodes(allEpisodes);
}


function makePageForEpisodes(episodeList) {

  console.log(episodeList);

allEpisodes.forEach(episode => addEpisode(episode));
  
  // footer function 
  let siteFooter = document.createElement("footer");
  console.log(siteFooter);
  document.body.appendChild(siteFooter);
  let footerParagraph = document.createElement("p");
  let link = document.createElement("A");
  link.setAttribute("href", "https://www.tvmaze.com/");
  link.innerHTML = "Tv show";
  footerParagraph.innerText = `The data displayed on this page was originally taken from: `;
  
  siteFooter.appendChild(footerParagraph);
  
  footerParagraph.appendChild(link);
  
  
}

function addEpisode(episode) {

  let tvShowName = document.createElement("h2");
  tvShowName.innerText = `${episode.name} - S${episode.season.toString().padStart(2, 0)}E${episode.number.toString().padStart(2, 0)}`; // First used back ticks, use string interpolation then target object and its property, get an array convert to string, use padStart it adds 2 digits
  blockCards.appendChild(tvShowName);
  
  let tvShowImg = document.createElement("img");
  tvShowImg.src = episode.image.medium;
  blockCards.appendChild(tvShowImg);
  
  let tvShowSummary = document.createElement("p");
  tvShowSummary.innerHTML = episode.summary;
  blockCards.appendChild(tvShowSummary);

}

// Search Function
let gmCharacters = [];
const searchBar = document.getElementById("searchBar"); 

    // here we needed to see if the input value is showing.
    searchBar.addEventListener("keyup", (e) => {
      blockCards.innerHTML = " ";
      const searchString = e.target.value.toLowerCase();
      console.log("result: ",searchString);

      const filteredCharacters = allEpisodes.filter( (character) => { 
        return (
          character.name.toLowerCase().includes(searchString) || character.summary.toLowerCase().includes(searchString));
        })
        console.log(filteredCharacters);
        filteredCharacters.forEach(episode => addEpisode(episode));
      }); 
    
    
    window.onload = setup;
