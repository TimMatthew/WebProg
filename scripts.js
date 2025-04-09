// Function to update the display of the min rating value dynamically
function updateMinRatingValue() {
    const minRateValue = document.getElementById("minRating").value;
    document.getElementById("minRatingValue").textContent = minRateValue;
}

// Function to update the display of the max rating value dynamically
function updateMaxRatingValue() {
    const maxRateValue = document.getElementById("maxRating").value;
    document.getElementById("maxRatingValue").textContent = maxRateValue;
}

// Fetch games based on the search input and rating filters
async function fetchGames() {
    const search = document.getElementById("searchInput").value.trim();
    const minRate = document.getElementById("minRating").value;
    const maxRate = document.getElementById("maxRating").value;

    const queryParams = new URLSearchParams();

    if (search) {
        queryParams.append('search', search);
    }
    if (minRate) {
        queryParams.append('minRate', minRate);
    }
    if (maxRate) {
        queryParams.append('maxRate', maxRate);
    }

    let url = "http://localhost:5000/api/filter?";

    if (queryParams.has('search')) {
        url += `search=${encodeURIComponent(search)}&`;
    }
    if (queryParams.has('minRate')) {
        url += `minRate=${minRate}&`;
    }
    if (queryParams.has('maxRate')) {
        url += `maxRate=${maxRate}&`;
    }

    // Remove the trailing '&' if it exists
    url = url.endsWith('&') ? url.slice(0, -1) : url;

    console.log(url);  // Check the final constructed URL

    try {
        const res = await fetch(url);
        const games = await res.json();
        renderGames(games);
    } catch (err) {
        console.error("Error fetching games:", err);
        document.getElementById("gamesList").innerHTML = `<p class="text-danger">Failed to load games.</p>`;
    }
}

// Render the fetched games onto the page
function renderGames(games) {
    const container = document.getElementById("gamesList");
    container.innerHTML = "";

    if (games.length === 0) {
        container.innerHTML = "<p>No games found.</p>";
        return;
    }

    games.forEach(game => {
        const rating = game.metacritic_rating;
        let ratingColor = "bg-danger";

        if (rating >= 80) ratingColor = "bg-success";
        else if (rating >= 50) ratingColor = "bg-warning";

        const gameCard = `
      <div id="${game._id}" class="game-card mx-auto mb-4">
        <div class="card shadow-sm w-100">
          <div class="card-body d-flex flex-column position-relative">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="card-title mb-0">${game.game_title} <small>(${game.release_year})</small></h5>
              <div class="rounded-circle ${ratingColor} text-white d-flex justify-content-center align-items-center" 
                   style="width: 40px; height: 40px; font-weight: bold;">
                ${rating}
              </div>
            </div>
            <p class="card-text">
              <strong>Developer:</strong> ${game.developer}<br>
              <strong>Publisher:</strong> ${game.publisher}<br>
              <strong>Genres:</strong> ${game.genres.join(", ")}
            </p>

            <!-- Edit and Delete buttons at the bottom-right -->
            <div class="position-absolute bottom-0 end-0 m-3">
                <button class="btn btn-warning btn-sm" onclick="editGame('${game._id}')">Edit</button>
                <button class="btn btn-danger btn-sm ms-2" onclick="deleteGame('${game._id}')">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
        container.innerHTML += gameCard;
    });
}


// Placeholder function for Edit
function editGame(gameId) {
    console.log(`Edit game with ID: ${gameId}`);
    // You can open a modal or redirect to an edit page
}

// Placeholder function for Delete
function deleteGame(gameId) {
    console.log(`Delete game with ID: ${gameId}`);
    // Implement the logic to delete the game from the database
}


window.onload = () => { fetchGames(); }
