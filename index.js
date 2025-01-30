// 1) Display the roster
const state = {
  playerList: [],
  playerDetails: {}
}

//grab the main for later
const main = document.querySelector(`main`);
console.log(main);
//retrive the players roster
const getPlayers = async () => {
  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/players`);
    const jsonObject = await response.json();
    const allPlayers = jsonObject.data.players;
    state.playerList = allPlayers;
    renderRoster();

    //console.log(state.playerList);

  } catch (err) {
    console.log(err);

    const header = document.querySelector(`header`);
    const p = document.createElement(`p`);
    p.innerText = `Error fetching info`;

    header.append(p);
  }
}

//render the player roster
const renderRoster = () => {
  // grab the header header
  const header = document.querySelector(`#roster`)
  //clear the entire header header
  header.innerHTML = ``;
  //go through each set of data in the list
  state.playerList.forEach((singleData) => {
    //create elements
    const playerNameElement = document.createElement(`h2`);
    
    //put the data in their respective elements
    playerNameElement.innerText = `${singleData.name} `
    //attatch the elements to their parents
    header.append(playerNameElement);

    
    playerNameElement.addEventListener(`click`, () => {
      state.playerDetails = singleData;
      renderPlayerDetails();
      
    });
    
  })

}
// 2) Be able to observe the player's details on its own in the screen.

const renderPlayerDetails = () => {
  //get the clicked player's details
  const detailsHTML = `
    <h3>Name:${state.playerDetails.name}</h3>
    <p>ID:${state.playerDetails.id}<p>
    <p>Breed:${state.playerDetails.breed}<p>
    <p>Status:${state.playerDetails.status}
    <img src="${state.playerDetails.imageUrl}" alt="">`
  //replace the main element with the details
  main.innerHTML = detailsHTML;

}

getPlayers();



















// 3) Be able to return to the player roster