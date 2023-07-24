function getWatchlist() {
	const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
	return watchlist;
}

function removeFromWatchlist(title) {
	const watchlist = getWatchlist();
	const updatedWatchlist = watchlist.filter((movie) => movie.Title !== title);
	localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
}

export { getWatchlist, removeFromWatchlist };
