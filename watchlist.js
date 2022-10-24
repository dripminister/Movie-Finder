const watchlistContainer = document.getElementById("watchlist-container")
let savedMovies

function getMovies(){
    savedMovies = JSON.parse(localStorage.getItem("movies")) || []
}

function displaySavedMovies(){
    const savedMoviesHTML = savedMovies.map((movie, index) => {
        return`
        <div class="movie-box" onClick="removeFromWL(event, '${movie.title}', '${index}')">
            <img src=${movie.image} />
            <div class="right-column">
                <h2>${movie.title}</h2>
                <p>${movie.year}</h2>
                <button class="remove-btn">Remove</button>
            </div>
        </div>
        `
    }).join("")
    watchlistContainer.innerHTML = savedMoviesHTML
}

getMovies()
displaySavedMovies()

function removeFromWL(event, title, index){
    if(event.target.classList.contains("remove-btn")){
        savedMovies = [...savedMovies.filter(movie => movie.title != title)]
        localStorage.setItem("movies", JSON.stringify(savedMovies))
        displaySavedMovies()
    }
}