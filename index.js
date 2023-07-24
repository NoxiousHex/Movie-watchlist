import SearchResult from "./modules/SearchResult.js";
import { getWatchlist, removeFromWatchlist } from "./utils/utils.js";

const apiKey = import.meta.env.VITE_API_KEY;
const searchBtn = document.getElementById("input-btn");
const movieListEl = document.getElementById("movie-list");
const searchEl = document.getElementById("search-box");
let movieArr = [];

document.addEventListener("click", (e) => {
	if (e.target.textContent === " Watchlist") {
		saveToWatchlist(e.target.dataset.title);
		render();
	} else if (e.target.textContent === " Remove") {
		removeFromWatchlist(e.target.dataset.title);
		render();
	} else if (e.target.id === "input-btn") {
		movieArr = [];
		getMovies(searchEl.value);
	}
});

document.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		searchBtn.click();
	}
});

async function getMovies(searchStr) {
	searchBtn.disabled = true;
	message("searching");
	//Fetch search results for string from the API
	try {
		const res = await fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchStr}`
		);
		const movies = await res.json();
		if (movies.Response === "True") {
			// Get move info for each result by ID since it's not
			// provided as part of search object
			for (let movie of movies.Search) {
				const res = await fetch(
					`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
				);
				const movieInfo = await res.json();
				movieArr.push(movieInfo);
			}
			render();
		} else {
			message("not-found");
		}
	} catch (err) {
		message("no-connection");
		console.error(err);
	} finally {
		searchBtn.disabled = false;
	}
}

function message(msg) {
	const searching = "Searching...";
	const notFound =
		"Unable to find what you are looking for. Please try another search.";
	const noConnection =
		"There was a connection error. Please try again later.";
	const messageEl = document.createElement("h2");
	messageEl.textContent =
		msg === "searching"
			? searching
			: msg === "not-found"
			? notFound
			: noConnection;
	messageEl.className = "search-message";
	movieListEl.replaceChildren(messageEl);
}

function saveToWatchlist(title) {
	const movie = movieArr.find((movie) => movie.Title === title);
	const watchlist = getWatchlist() || [];

	if (!watchlist.find((obj) => obj.Title === movie.Title)) {
		watchlist.push(movie);
	}

	localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function render() {
	const allSearchResults = document.createDocumentFragment();
	for (let movie of movieArr) {
		const newMovieEl = new SearchResult(movie).constructElement();
		allSearchResults.append(newMovieEl);
	}
	movieListEl.replaceChildren(allSearchResults);
}
