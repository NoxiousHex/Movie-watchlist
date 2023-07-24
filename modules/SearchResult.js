import { getWatchlist } from "../utils/utils";

export default class SearchResult {
	constructor(movie) {
		const newMovie = Object.fromEntries(
			Object.entries(movie).map(([k, v]) => [k.toLowerCase(), v])
		);
		Object.assign(this, newMovie);
		//this.fromLocal = fromLocal;
	}

	constructElement() {
		// Take individual parts of search result grid item
		// put them together. return it for rendering
		const { poster, title } = this;
		const movieEl = document.createElement("div");
		movieEl.className = "search-result";
		const movieImg = document.createElement("img");
		movieImg.src = poster;
		movieImg.alt = `Poster of the movie ${title}`;
		const titleEl = this.constructTitle();
		const detailsDiv = this.constructDetails();
		const movieDesc = this.constructDescription();
		movieEl.append(movieImg, titleEl, detailsDiv, movieDesc);
		return movieEl;
	}

	constructTitle() {
		const titleEl = document.createElement("div");
		titleEl.className = "movie-title";
		const titleText = document.createElement("h3");
		titleText.textContent = this.title;
		const score = document.createElement("p");
		score.textContent = `⭐ ${this.imdbrating}`;
		titleEl.append(titleText, score);
		return titleEl;
	}

	constructDetails() {
		const detailsDiv = document.createElement("div");
		detailsDiv.className = "movie-details";
		//Create length text
		const movieLength = document.createElement("p");
		movieLength.textContent = this.runtime;
		// List tags
		const movieTags = document.createElement("p");
		movieTags.textContent = this.genre;
		// Add watchlist button
		const watchlistBtn = document.createElement("a");
		watchlistBtn.dataset.title = this.title;
		const watchlistText = this.isInWatchlist()
			? `<span class="fa-solid fa-circle-minus"></span> Remove`
			: `<span class="fa-solid fa-circle-plus"></span> Watchlist`;
		watchlistBtn.innerHTML = watchlistText;
		watchlistBtn.className = "watchlist-btn";
		detailsDiv.append(movieLength, movieTags, watchlistBtn);
		return detailsDiv;
	}

	isInWatchlist() {
		const watchlist = getWatchlist();
		const titleArr = watchlist.map((movie) => movie.Title);

		const isInWatchlist = titleArr.includes(this.title);
		return isInWatchlist;
	}

	constructDescription() {
		const movieDesc = document.createElement("p");
		movieDesc.className = "movie-description";
		movieDesc.textContent = this.plot;
		return movieDesc;
	}
}
