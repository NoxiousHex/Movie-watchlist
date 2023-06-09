import SearchResult from "./modules/SearchResult.js";

const movieListEl = document.getElementById("movie-list");
const searchEl = document.getElementById("search-box");
let movieArr = [];

document.addEventListener("click", (e) => {
    if (e.target.className === "watchlist-btn") {
        saveToWatchlist(e.target.dataset.title);
    } else if (e.target.id === "input-btn") {
        getMovies(searchEl.value);
    }
});

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("input-btn").click();
    }
});

async function getMovies(searchStr) {
    //Fetch search results for string from the API
    const res = await fetch(
        `https://www.omdbapi.com/?apikey=a5f43961&s=${searchStr}`
    );
    const movies = await res.json();
    if (movies.Response === "True") {
        const allSearchResults = document.createDocumentFragment();
        movieArr = [];
        // Get move info for each result by ID since it's not
        // provided as part of search object
        for (let movie of movies.Search) {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=a5f43961&i=${movie.imdbID}`
            );
            const movieInfo = await res.json();
            movieArr.push(movieInfo);
        }
        // take each object returned from above and render it on page
        for (let movie of movieArr) {
            const newMovieEl = new SearchResult(movie).constructElement();
            allSearchResults.append(newMovieEl);
        }
        movieListEl.replaceChildren(allSearchResults);
    } else {
        const notFound = document.createElement("h2");
        notFound.textContent = `Unable to find what you are looking for.
                Please try another search.`;
        notFound.className = "search-not-found";
        movieListEl.replaceChildren(notFound);
    }
}

function saveToWatchlist(title) {
    let movie = movieArr.find((movie) => movie.Title === title);
    let watchlist = [];
    if (JSON.parse(localStorage.getItem("watchlist"))) {
        watchlist = JSON.parse(localStorage.getItem("watchlist"));
    }

    if (!watchlist.find((obj) => obj.Title === movie.Title)) {
        watchlist.push(movie);
    } else {
        console.log("This movie is already in watchlist!");
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
