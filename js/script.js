document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const nav = document.getElementById("nav");

    hamburgerMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});


document.getElementById("hamburger-menu").addEventListener("click", function () {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active");
});

// Scroll Animations for Sections
const sections = document.querySelectorAll("section");
const options = {
    threshold: 0.5,
};

const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});


// Store the raw meal data for resetting and searching
let mealData = {};
let allMeals = [];

// Fetch meal data from the JSON file
fetch('meals.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        mealData = data; // Save the data for resetting
        allMeals = flattenMeals(data); // Flatten meals for searching
        renderMeals(data); // Render all categories initially
    })
    .catch(error => console.error("Error fetching data:", error));

// Function to flatten meal data into a single array for searching
function flattenMeals(data) {
    const all = [];
    for (let category in data) {
        all.push(...data[category]);
    }
    return all;
}

// Render all meal categories
function renderMeals(data) {
    renderCategory("fruits", data.fruits || []);
    renderCategory("vegetables", data.vegetables || []);
    renderCategory("dairy", data.dairy || []);
    renderCategory("vegDishes", data.vegDishes || []);
    renderCategory("nonVegDishes", data.nonVegDishes || []);
}

// Render a specific meal category
function renderCategory(category, meals) {
    const container = document.getElementById(category);
    container.innerHTML = ""; // Clear previous meal items

    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.classList.add("meal-item");

        // Create meal item structure
        mealDiv.innerHTML = `
            <img src="${meal.image}" alt="${meal.name}">
            <p>${meal.name}</p>
            <button class="view-details" onclick="openModal(
                '${meal.name}', 
                '${meal.image}', 
                ${meal.protein}, 
                ${meal.carbs}, 
                ${meal.fat}, 
                ${meal.energy})">View Details</button>
        `;

        container.appendChild(mealDiv);
    });
}

// Search meals by name
function searchMeal() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredMeals = allMeals.filter(meal => meal.name.toLowerCase().includes(searchTerm));

    // Clear all categories and display search results
    document.getElementById("fruits").innerHTML = "";
    document.getElementById("vegetables").innerHTML = "";
    document.getElementById("dairy").innerHTML = "";
    document.getElementById("vegDishes").innerHTML = "";
    document.getElementById("nonVegDishes").innerHTML = "";

    const searchResultsContainer = document.getElementById("fruits"); // Use "fruits" container for search results
    searchResultsContainer.innerHTML = ""; // Clear previous results

    if (filteredMeals.length > 0) {
        filteredMeals.forEach(meal => {
            const mealDiv = document.createElement("div");
            mealDiv.classList.add("meal-item");
            mealDiv.innerHTML = `
                <img src="${meal.image}" alt="${meal.name}">
                <p>${meal.name}</p>
                <button class="view-details" onclick="openModal(
                    '${meal.name}', 
                    '${meal.image}', 
                    ${meal.protein}, 
                    ${meal.carbs}, 
                    ${meal.fat}, 
                    ${meal.energy})">View Details</button>
            `;
            searchResultsContainer.appendChild(mealDiv);
        });
    } else {
        searchResultsContainer.innerHTML = "<p>No meals found matching your search.</p>";
    }
}

// Reset meal categories to show all
function resetMeals() {
    renderMeals(mealData); // Restore all categories
    document.getElementById("searchInput").value = ""; // Clear search input
}

// Handle dynamic reset when search input is cleared
function handleSearchInput() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    if (searchTerm === "") {
        resetMeals();
    }
}

// Open the modal with meal details
function openModal(name, image, protein, carbs, fat, energy) {
    document.getElementById("meal-name").innerText = name;
    document.getElementById("meal-image").src = image;
    document.getElementById("protein").innerText = protein;
    document.getElementById("carbs").innerText = carbs;
    document.getElementById("fat").innerText = fat;
    document.getElementById("energy").innerText = energy;
    document.getElementById("meal-details-modal").style.display = "flex";
}

// Close the modal
function closeModal() {
    document.getElementById("meal-details-modal").style.display = "none";
}




document.addEventListener("DOMContentLoaded", () => {
    let quotesData = {}; // Store quotes data globally

    // Function to fetch quotes from the JSON file
    function fetchQuotes() {
        fetch("data/quotes.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load quotes.json");
                }
                return response.json();
            })
            .then((data) => {
                quotesData = data; // Store the fetched data globally
                loadQuotes("motivational"); // Load default category
            })
            .catch((error) => {
                console.error("Error loading quotes:", error);
            });
    }

    // Function to load quotes based on the selected category
    function loadQuotes(category) {
        const container = document.getElementById("quoteContainer");
        container.innerHTML = ""; // Clear previous content

        // Check if the category exists in the data
        if (quotesData[category] && quotesData[category].length > 0) {
            quotesData[category].forEach((quote) => {
                const quoteCard = document.createElement("div");
                quoteCard.className = "quote-card animate__animated animate__fadeInUp";
                quoteCard.innerHTML = `
                    <p>"${quote.text}"</p>
                    <p style="text-align: right; font-size: 0.9rem; font-weight: bold;">- ${quote.author}</p>
                `;
                container.appendChild(quoteCard);
            });
        } else {
            container.innerHTML = `<p>No quotes available for the "${category}" category.</p>`;
        }
    }

    // Attach event listeners to tab buttons
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category; // Get category from data attribute
            loadQuotes(category); // Load the selected category
        });
    });

    // Fetch quotes on page load
    fetchQuotes();
});



let musicData = null;
let currentSongIndex = 0;
const audio = new Audio();
const miniPlayer = document.getElementById("mini-player");
const miniPlayerSongTitle = document.getElementById("mini-player-song-title");
const miniPlayerImage = document.getElementById("mini-player-image");
const playPauseButton = document.getElementById("play-pause-button");

// Fetch Music Data
fetch("music.json")
    .then(response => response.json())
    .then(data => {
        musicData = data.categories;
        renderSongs();
    });

// Render Songs
function renderSongs() {
    const musicContainer = document.getElementById("music-container");
    musicContainer.innerHTML = "";

    for (const category in musicData) {
        const categorySection = document.createElement("div");
        categorySection.classList.add("music-category");

        const title = document.createElement("h2");
        title.textContent = category;
        categorySection.appendChild(title);

        const songList = document.createElement("div");
        songList.classList.add("song-list");

        musicData[category].forEach((song, index) => {
            const songCard = document.createElement("div");
            songCard.classList.add("song-card");

            songCard.innerHTML = `
                <img src="${song.image}" alt="${song.title}">
                <p>${song.title}</p>
                <button onclick="playSong(${index}, '${category}')">Play</button>
            `;
            songList.appendChild(songCard);
        });

        categorySection.appendChild(songList);
        musicContainer.appendChild(categorySection);
    }
}

// Play Song
function playSong(index, category) {
    const song = musicData[category][index];
    audio.src = song.file;
    audio.play();

    miniPlayer.style.display = "flex";
    miniPlayerSongTitle.textContent = song.title;
    miniPlayerImage.src = song.image;
    playPauseButton.textContent = "❚❚";
}

// Play/Pause Control
playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "❚❚";
    } else {
        audio.pause();
        playPauseButton.textContent = "▶";
    }
});




