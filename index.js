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
            
        })
}


function displayMovies(data) {
    const movieArray = data.results

    movieArray.forEach(movie => {
        const movieName = document.createElement("h2")
        movieName.innerText = movie.title
        const movieYear = document.createElement("p")
        movieYear.innerText = movie.year
        const moviePoster = document.createElement("img")
        moviePoster.src = movie.image.url
        const rightColumn = document.createElement("div")
        rightColumn.classList.add("right-column")
        rightColumn.appendChild(movieName)
        rightColumn.appendChild(movieYear)
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("movie-box")
        movieContainer.appendChild(moviePoster)
        movieContainer.appendChild(rightColumn)
        resultsContainer.appendChild(movieContainer)
    })

}