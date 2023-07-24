import SearchResult from "../modules/SearchResult.js";
import { getWatchlist, removeFromWatchlist } from "../utils/utils.js";

const movieList = document.getElementById("movie-list");

document.addEventListener("click", (e) => {
	if (e.target.className === "watchlist-btn") {
		removeFromWatchlist(e.target.dataset.title);
		render();
	}
});

function render() {
	const watchlist = getWatchlist();
	if (watchlist?.length > 0) {
		const allWatchlistEl = document.createDocumentFragment();
		for (let movie of watchlist) {
			const newMovieEl = new SearchResult(movie).constructElement();
			allWatchlistEl.append(newMovieEl);
		}
		movieList.replaceChildren(allWatchlistEl);
	} else {
		movieList.innerHTML = `<h2 class="empty-watchlist">Your watchlist is looking a little empty...</h2>
                <a class="empty-link" href="../index.html"
                    ><span class="fa-solid fa-circle-plus"></span> Let's add
                    some movies!</a>`;
	}
}

render();
