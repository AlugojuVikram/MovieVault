
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmE4ODA0YjA4NjAxYjExOGExZjFhZjZhMzgzNGI3NCIsInN1YiI6IjY0OWVmZmM0YzlkYmY5MDEwN2UxZTU0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EV_B46kJXwRaqfcfXunUdvSCCDyyRzkS13QBLwEgXK4'
    }
};


fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(data => {
        const movielist = data.results;
        console.log(data)

        movielist.map((item) => {
            const name = item.title;
            const release = item.release_date
            const popularity = item.popularity
            const poster_path = item.poster_path;
            const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
            const movies = `<div><img src="${imageURL}">
             <h3> Title : ${name}</h3>
              <p> Release Date : ${release} </p> 
              <p> Popularity : ${popularity} </p>
  </div>`;
            document.querySelector('.results').innerHTML += movies;
        });
    })
    .catch(err => console.error(err));

function fetchMovie() {
    const searchinput = document.getElementById("searchInput").value;
    let results = document.querySelector('.results');
    results.innerHTML = "";
    if (!results) {
        results = document.createElement("div");
        results.setAttribute("id", "results");
        document.body.appendChild(results);
    }

    fetch("https://api.themoviedb.org/3/search/movie?query=" + searchinput + "&include_adult=false&language=en-US&page=1", options)

        .then((response) => response.json())
        .then((response) => {
            for (let i = 0; i < response.results.length; i++) {
                let title = response.results[i].title;
                let release_date = response.results[i].release_date;
                let poster_pat = response.results[i].poster_path;
                let overvieww = response.results[i].overview;
                let card = document.createElement("div");
                card.style = 'style="width: 18rem';
                card.setAttribute("class", "col-lg-3");

                let img = document.createElement("img");
                img.classList.add("card-img-top");
                const imageURL = `https://image.tmdb.org/t/p/w500${poster_pat}`;
                img.src = imageURL;

                let ctitle = document.createElement("h5");
                ctitle.setAttribute("class", "card-title");
                ctitle.textContent = title;

                let crd = document.createElement("h7");
                crd.setAttribute("class", "card-title");
                crd.textContent = "Release Date: " + release_date;

                let overveiw = document.createElement("h7");
                overveiw.setAttribute("class", "card-title");
                overveiw.textContent = overvieww;

                card.append(img);
                card.append(ctitle);
                card.append(crd);
                card.append(overveiw);
                results.prepend(card);
            }
        })
        .catch((err) => console.error(err));
}
document.getElementById("searchButton").addEventListener("click", fetchMovie);
document.getElementById("nowPlayingButton").addEventListener("click", function () {
    fetchNowPlaying();
});

document.getElementById("topRatedButton").addEventListener("click", function () {
    fetchTopRated();
});

function fetchNowPlaying() {
    let resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = "";

    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options)
        .then((response) => response.json())
        .then((response) => {
            response.results.forEach((movie) => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const title = document.createElement('h2');
                title.textContent = movie.title;

                const posterImage = document.createElement('img');
                posterImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                posterImage.alt = movie.title;

                const releaseDate = document.createElement('p');
                releaseDate.textContent = "Release Date: " + movie.release_date;

                const overview = document.createElement('p');
                overview.textContent = movie.overview;

                movieDiv.appendChild(posterImage);
                movieDiv.appendChild(title);
                movieDiv.appendChild(releaseDate);
                movieDiv.appendChild(overview);

                resultsDiv.prepend(movieDiv);
            });
        })
        .catch((err) => console.error(err));
}

function fetchTopRated() {
    let resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = "";

    fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
        .then((response) => response.json())
        .then((response) => {
            response.results.forEach((movie) => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const title = document.createElement('h2');
                title.textContent = movie.title;

                const posterImage = document.createElement('img');
                if (movie.poster_path) {
                    posterImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                } else {
                    posterImage.src = 'placeholder_image_url.jpg';
                }
                posterImage.alt = movie.title;

                const releaseDate = document.createElement('p');
                releaseDate.textContent = "Release Date " + movie.release_date;

                const overview = document.createElement('p');
                overview.textContent = movie.overview;

                movieDiv.appendChild(posterImage);
                movieDiv.appendChild(title);
                movieDiv.appendChild(releaseDate);
                movieDiv.appendChild(overview);

                resultsDiv.prepend(movieDiv);
            });
        })
        .catch((err) => console.error(err));
}


let currentPage = 1;
const moviesPerPage = 12;

function fetchMovies(page) {
    const startIndex = (page - 1) * moviesPerPage + 1;
    const endIndex = startIndex + moviesPerPage - 1;

    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options)
        .then(response => response.json())
        .then(data => {
            const movielist = data.results.slice(startIndex - 1, endIndex); 
            console.log(data);

            const resultsDiv = document.querySelector('.results');
            resultsDiv.innerHTML = "";

            if (movielist.length === 0) {
                resultsDiv.innerHTML = "<p>No movies found</p>";
            } else {
                movielist.map((item) => {
                    const name = item.title;
                    const release = item.release_date;
                    const popularity = item.popularity;
                    const poster_path = item.poster_path;
                    const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
                    const movieElement = `<div class="movie">
                                        <img src="${imageURL}" alt="${name}">
                                        <h2>${name}</h2>
                                        <p>Release Date: ${release}</p>
                                        <p>Popularity: ${popularity}</p>
                                    </div>`;
                    resultsDiv.innerHTML += movieElement;
                });
            }
        })
        .catch(err => console.error(err));
}

function handlePaginationClick(event) {
    const buttonId = event.target.id;
    if (buttonId === "prevButton" && currentPage > 1) {
        currentPage--;
    } else if (buttonId === "nextButton") {
        currentPage++;
    }
    fetchMovies(currentPage);
}

document.getElementById("prevButton").addEventListener("click", handlePaginationClick);
document.getElementById("nextButton").addEventListener("click", handlePaginationClick);

fetchMovies(currentPage);

function fetchGenres() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', options)
        .then(response => response.json())
        .then(data => {
            const genreSelect = document.getElementById('genreFilter');
            data.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        })
        .catch(err => console.error(err));
}

fetchGenres();

function fetchMovies(page, genre = '') {
    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    if (genre !== '') {
        url += `&with_genres=${genre}`;
    }

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const movielist = data.results.slice(0, moviesPerPage);
            console.log(data);

            const resultsDiv = document.querySelector('.results');
            resultsDiv.innerHTML = "";

            if (movielist.length === 0) {
                resultsDiv.innerHTML = "<p>No movies found</p>";
            } else {
                movielist.forEach((item) => {
                    const name = item.title;
                    const release = item.release_date;
                    const popularity = item.popularity;
                    const poster_path = item.poster_path;
                    const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
                    const movieElement = `<div class="movie">
                                        <img src="${imageURL}" alt="${name}">
                                        <h2>${name}</h2>
                                        <p>Release : ${release}</p>
                                        <p>Popularity: ${popularity}</p>
                                    </div>`;
                    resultsDiv.innerHTML += movieElement;
                });
            }
        })
        .catch(err => console.error(err));
}

document.getElementById('genreFilter').addEventListener('change', function () {
    const selectedGenre = this.value;
    fetchMovies(1, selectedGenre);
});


const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
});




