// //Select input of all shows
// function selectShows(shows) {
//   let selectInput = document.createElement("select");
//   tvShowForm.appendChild(selectInput);
//   let optionInput = document.createElement("option");
//   optionInput.innerText = "Show all Shows";
//   optionInput.value = "";
//   selectInput.appendChild(optionInput);
//   shows.forEach((show) => {
//     let optionInput = document.createElement("option");
//     optionInput.innerText = `${show.name}`;
//     selectInput.appendChild(optionInput);
//     optionInput.value = show.name;
//   });

//   selectInput.addEventListener("change", (e) => {
//     blockCards.innerHTML = "";
//     const inputSelect = e.target.value;
// let found = shows.find((show) => {
//   if (show.name === inputSelect) {
//     return show.id;
//   }
// });
// const filteredShows = shows.find((show) => {
//   if (show.name === inputSelect) {
//     return show;
//   }
// });
// console.log("filtered id; ", filteredShows);
// filteredShows.forEach((show) => addEpisode(show));

// fetch(`https://api.tvmaze.com/shows/${filteredShows.id}/episodes`)
//   .then((response) => {
//     if (response.status >= 200 && response.status <= 299) {
//       return response.json();
//     } else {
//       throw new Error(
//         `Encountered something unexpected: ${response.status} ${response.statusText}`
//       );
//     }
//   })
//   .then((data) => {
//  do whatever you want with the JSON response
//     makePageForEpisodes(data);
//   });
//   });
// }

// selectShows(shows);
