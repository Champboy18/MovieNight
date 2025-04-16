let movies1 = {};
const trendingList = document.getElementById('trendingList');
const popularList = document.getElementById('popularList');
const topRatedList = document.getElementById('topRatedList');
const searchInput = document.getElementById('searchInput');
const movieModal = document.getElementById('movieModal');
const modalContent = document.getElementById('modalContent');

fetch('https://champboy18.github.io/MovieNight/assets/film.json')
  .then(res => res.json())
  .then(data => {
    movies1 = data;
    //displayMovies(data.trending, searchresults);
  });

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  
  const filtered = [].concat(...Object.values(movies1)).filter(movie => movie.title.toLowerCase().includes(query));
  
  searchresults.innerHTML = '';
  searchheading.hidden=false;
  displayMovies(filtered, searchresults);
});

function displayMovies(movieArray, container) {
  container.innerHTML = '';
  movieArray.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'bg-gray-700 rounded overflow-hidden shadow-lg cursor-pointer transition transform hover:scale-105';
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" class="w-full h-72 object-cover" />
      <div class="p-4">
        <h3 class="text-lg font-bold">${movie.title}</h3>
        <p>? ${movie.rating} | ${movie.release_year}</p>
      </div>
    `;
    card.onclick = () => showModal(movie);
    container.appendChild(card);
  });
}

function showModal(movie) {
  modalContent.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" class="w-full h-96 object-cover rounded mb-4" />
    <h2 class="text-2xl font-bold mb-2">${movie.title}</h2>
    <p class="mb-2">${movie.description}</p>
    <p><strong>Cast:</strong> ${movie.cast.join(', ')}</p>
    <p><strong>Genre:</strong> ${movie.genre.join(', ')}</p>
    <p><strong>Release Year:</strong> ${movie.release_year}</p>
    <p><strong>Rating:</strong> ${movie.rating}</p>
  `;
  movieModal.classList.remove('hidden');
  movieModal.classList.add('flex');
}

function closeModal() {
  movieModal.classList.remove('flex');
  movieModal.classList.add('hidden');
}
