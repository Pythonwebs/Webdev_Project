// Get the form and input elements
const form = document.getElementById('search-form');
const searchInput = document.getElementById('searchInput');

// Create a container to display results
const resultsContainer = document.createElement('div');
resultsContainer.id = 'results';
document.body.insertBefore(resultsContainer, document.querySelector('footer'));

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page refresh

  const query = searchInput.value.trim();
  if (!query) return alert('Please enter an anime name.');

  resultsContainer.innerHTML = 'Searching...';

  try {
    // Fetch data from Jikan API
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`);
    const data = await response.json();

    if (data.data.length === 0) {
      resultsContainer.innerHTML = 'No results found.';
      return;
    }

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Loop through each anime and create HTML elements
    data.data.forEach(anime => {
      const animeDiv = document.createElement('div');
      animeDiv.className = 'anime-result';
      animeDiv.style.display = 'flex';
      animeDiv.style.margin = '10px 0';
      animeDiv.style.background = '#fff';
      animeDiv.style.padding = '10px';
      animeDiv.style.borderRadius = '6px';
      animeDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

      animeDiv.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="width:80px;height:120px;margin-right:15px;border-radius:5px;">
        <div>
          <h3>${anime.title}</h3>
          <p><strong>Type:</strong> ${anime.type}</p>
          <p><strong>Episodes:</strong> ${anime.episodes || 'N/A'}</p>
          <p><strong>Score:</strong> ${anime.score || 'N/A'}</p>
          <p><strong>Synopsis:</strong> ${anime.synopsis ? anime.synopsis.substring(0, 200) + '...' : 'N/A'}</p>
        </div>
      `;

      resultsContainer.appendChild(animeDiv);
    });

  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML = 'Error fetching data.';
  }
});
