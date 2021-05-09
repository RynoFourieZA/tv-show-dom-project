//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  
  for (let episode of getAllEpisodes()) {

    let tvShowName = document.createElement("h2");
    tvShowName.innerText = `${episode.name} - S${episode.season.toString().padStart(2, 0)}E${episode.number.toString().padStart(2, 0)}`; // First used back ticks, use string interpolation then target object and its property, get an array convert to string, use padStart it adds 2 digits
    rootElem.appendChild(tvShowName);
    
    let tvShowImg = document.createElement("img");
    tvShowImg.src = episode.image.medium;
    rootElem.appendChild(tvShowImg);
    
    let tvShowSummary = document.createElement("p");
    tvShowSummary.innerHTML = episode.summary;
    rootElem.appendChild(tvShowSummary);
    
  }

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

window.onload = setup;
