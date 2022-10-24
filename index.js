const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': APIKEY,
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
}

const movieNameInput = document.getElementById("movieName")
const searchBtn = document.getElementById("searchBtn")
const resultsContainer = document.getElementById("results-container")
searchBtn.addEventListener("click", getMovie)

let localMovies

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getMovie()
    }
})

function getMovie(){
    resultsContainer.innerHTML = "Searching..."
    fetch(`https://online-movie-database.p.rapidapi.com/title/v2/find?title=${movieNameInput.value}&limit=20&sortArg=moviemeter%2Casc`, options)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = ""
            displayMovies(data)
            movieNameInput.value = ""
        })
        .catch(err => {
            console.log(err)
        })
}


function displayMovies(data) {
    const movieArray = data.results
    const movieHTML = movieArray.map((movie,index) => {
        return `
        <div class="movie-box" onClick="addToWL(event, '${movie.title}', '${movie.year}', '${movie.image.url}', '${index}')">
            <img src=${movie.image.url} />
            <div class="right-column">
                <h2>${movie.title}</h2>
                <p>${movie.year}</h2>
                <button class="add-btn">Add</button>
            </div>
        </div>
        `
    }).join("")
    resultsContainer.innerHTML = movieHTML
}

function addToWL(e, title, year, image, index) {
    if(e.target.classList.contains("add-btn")){
        const saveMovie = {
            title,
            year,
            image
        }
        localMovies.push(saveMovie)
        localStorage.setItem("movies", JSON.stringify(localMovies))
    }
}

function getLocalMovies(){
    localMovies = JSON.parse(localStorage.getItem("movies")) || []
}

getLocalMovies()
