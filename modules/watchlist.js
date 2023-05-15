import SearchResult from "../modules/SearchResult.js";

let watchlist = JSON.parse(localStorage.getItem("watchlist"));
const movieList = document.getElementById("movie-list");

document.addEventListener("click", (e) => {
    if (e.target.className === "watchlist-btn") {
        removeFromWatchlist(e.target.dataset.title);
    }
});

function render() {
    if (watchlist.length > 0) {
        const allWatchlistEl = document.createDocumentFragment();
        for (let movie of watchlist) {
            // pass fromLocal true as second argument to render
            // remove btn correctly
            const newMovieEl = new SearchResult(movie, true).constructElement();
            allWatchlistEl.append(newMovieEl);
        }
        movieList.replaceChildren(allWatchlistEl);
    } else {
        movieList.innerHTML = `<h2>Your watchlist is looking a little empty...</h2>
                <a class="empty-link" href="./index.html"
                    ><span class="fa-solid fa-circle-plus"></span> Let's add
                    some movies!</a>`;
    }
}

function removeFromWatchlist(title) {
    watchlist = watchlist.filter((movie) => movie.Title !== title);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    render();
}

render();
