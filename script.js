
// Select the form and input
const form = document.getElementById("search-form");
const searchInput = document.getElementById("searchInput");

// Create a container to display results
const resultsContainer = document.createElement("div");
resultsContainer.style.textAlign = "center";
resultsContainer.style.marginTop = "20px";
document.body.appendChild(resultsContainer);

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from reloading page
    const query = searchInput.value.trim();
    if (!query) return;

    // Clear previous results
    resultsContainer.innerHTML = "Loading...";

    try {
        // Fetch anime info from Jikan API
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
        const data = await response.json();

        if (data.data.length === 0) {
            resultsContainer.innerHTML = "No results found!";
            return;
        }

        const anime = data.data[0]; // Take first result
        resultsContainer.innerHTML = `
            <h2>${anime.title}</h2>
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="width:200px; border:2px solid black; border-radius:10px;">
            <p>${anime.synopsis ? anime.synopsis : "No description available."}</p>
            <p><strong>Episodes:</strong> ${anime.episodes ? anime.episodes : "N/A"}</p>
            <p><strong>Score:</strong> ${anime.score ? anime.score : "N/A"}</p>
        `;
    } catch (error) {
        resultsContainer.innerHTML = "Error fetching data!";
        console.error(error);
    }
});

