// --- Elements ---
const searchInput = document.getElementById('search');
const suggestionsBox = document.getElementById('suggestions');
const mapContainer = document.getElementById('mapContainer');
const infoContainer = document.getElementById('infoContainer');
const lightboxElement = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// --- Map Configuration ---
const MAP_ZOOM = 17;
// **IMPORTANT**: Replace these with the *actual* coordinates for your buildings
const SCIENCE_COORDS = "6.486678194372523, 3.8541251047746714" // Example: SST Building Area
const NON_SCIENCE_COORDS = "6.488070151254896, 3.8535481714571733"; // Example: A different building area
const DEFAULT_COORDS = NON_SCIENCE_COORDS; // Default map shown on load

// --- Classroom Data (with isScience property) ---
const classrooms = [
    // Non Science Related Courses
    { name: "ASABA", image: "/Website/CAMPUSNAV COMMERCIAL VERSION/20250502_215236.jpg", time: "10:00am - 1:00pm", location_type: "PAU-BUA 109", location_note: "• On the first floor<br>• First thing you see after climbing the cemented staircase", isScience: false },
    { name: "JOS", image: "/Website/CAMPUSNAV COMMERCIAL VERSION/20250331_201508.jpg", time: "3:00pm - 5:00pm", location_type: "PAU-ECO 208", location_note: "• On ground floor<br>• First class you see after making the first right turn in the building", isScience: false },
    { name: "TYD CAFETERIA", image: "/Website/CAMPUSNAV COMMERCIAL VERSION/20250502_220741.jpg", time: "8:00am - 4:00pm", location_type: "CAFETERIA", location_note: "• On ground floor<br>• On the left side of the Sapetro block which is the first place you see when you enter building<br>• Walk diagonally to the left from entrance", isScience: false },
    // Science Related Courses
    { name: "EDS (ENGINEERING DRAWING STUDIO)", image: "/Website/CAMPUSNAV COMMERCIAL VERSION/20250428_173406.jpg", time: "9:00am - 11:00am", location_type: "GET 102", location_note: "• On ground Floor<br>• First class you encounter from entrance after turning left", isScience: true },
    { name: "SST LAB 1", image: "/Website/CAMPUSNAV COMMERCIAL VERSION/20250428_173754.jpg", time: "10:00am - 12:00pm", location_type: "COS 102", location_note: "• On the first floor <br>• Has a poster that says (Safety begins with complaince)", isScience: true },
    { name: "CHM LAB (Chemistry Lab)", image: "/Website/CAMPUSNAV COMMERCIAL VERSION/20250502_143332.jpg", time: "2:00pm - 4:00pm", location_type: "CHM 108", location_note: "• On the second floor<br>• Has the largest door on that floor", isScience: true },
];

// --- UI Update Function ---
function updateUI(classroom) {
    let selectedCoords = DEFAULT_COORDS;
    let locationName = "General Campus Area"; // Default name

    if (classroom) {
        selectedCoords = classroom.isScience ? SCIENCE_COORDS : NON_SCIENCE_COORDS;
        locationName = classroom.name + " Area"; // Or a more specific building name if available
    }

    // Format coordinates for display (optional, but looks nice)
    const [lat, lng] = selectedCoords.split(',').map(s => parseFloat(s).toFixed(5)); // 5 decimal places

    // Construct URLs
    // Using q= parameter is generally good for centering the embed
    const mapEmbedUrl = `https://maps.google.com/maps?q=${selectedCoords}&hl=en&z=${MAP_ZOOM}&output=embed`;
    // Standard directions URL
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedCoords}`;


    // 1. Update Map Container (Always update to change coords/links)
    // Mimics the structure from your screenshot
    mapContainer.innerHTML = `
        <div style="padding: 10px; background-color: #f9f9f9; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; font-size: 0.9em;">
            <div>
                <div style="font-weight: bold;">${lat}, ${lng}</div>
                <div style="color: #555;">${locationName}</div>
                <a href="https://www.google.com/maps?q=${selectedCoords}" target="_blank" style="color: #1a73e8; text-decoration: none; font-size: 0.9em;">View larger map</a>
            </div>
            <a href="${directionsUrl}" target="_blank" style="text-decoration: none; display: flex; flex-direction: column; align-items: center; color: #1a73e8; margin-left: 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 12c0 .55-.45 1-1 1H4.41l5.29 5.29c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-7-7a.996.996 0 0 1 0-1.41l7-7c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L4.41 11H20c.55 0 1 .45 1 1z"/></svg>
                <span>Directions</span>
            </a>
        </div>
        <iframe
            style="width: 100%; height: calc(100% - 75px); border: none; display: block;" // Adjust height calculation if needed
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="${mapEmbedUrl}">
        </iframe>`;


    // 2. Update Info Panel
    if (!classroom) {
        // Show placeholder message
        infoContainer.classList.add('is-placeholder');
        infoContainer.classList.remove('has-content');
        infoContainer.innerHTML = `
        <div class="info-text-content placeholder-content">
            <h2>Welcome!</h2>
            <p>Search for a class above (e.g., CLASSROOM 1) to see its details here.</p>
            <p class="placeholder-map-note">The map shows  default area. Select a class to see its specific building location.</p>
        </div>`;
        // Ensure any stray images are hidden
        const defaultImage = infoContainer.querySelector('img');
        if (defaultImage) defaultImage.style.display = 'none';
    } else {
        // Show classroom details
        infoContainer.classList.remove('is-placeholder');
        infoContainer.classList.add('has-content');
        infoContainer.innerHTML = `
            <img src="${classroom.image || 'images/placeholder.jpg'}" alt="Image of ${classroom.name}" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
            <div class="info-text-content">
                <h2>${classroom.name}</h2>
                ${classroom.time ? `<p class="time-details">(${classroom.time})</p>` : ''}
                ${classroom.location_type ? `<p class="location-type">${classroom.location_type}</p>` : ''}
                ${classroom.location_note ? `<p class="location-notes">${classroom.location_note}</p>` : ''}
            </div>
        `;
    }
}


// --- Search Suggestion Logic (No changes needed here) ---
let currentFocus = -1;
let currentSuggestions = [];
if (searchInput && suggestionsBox) {
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.trim().toLowerCase();
        suggestionsBox.innerHTML = "";
        currentSuggestions = [];
        if (!value) {
            suggestionsBox.style.display = "none";
            return;
        }
        // Filter combined list
        const matches = classrooms
            .filter(c => c.name.toLowerCase().includes(value))
            .sort((a, b) => a.name.toLowerCase().indexOf(value) - b.name.toLowerCase().indexOf(value)); // Basic sort

        matches.forEach((classroom) => {
            const div = document.createElement("div");
            const index = classroom.name.toLowerCase().indexOf(value);
            const highlightedName = classroom.name.substring(0, index) + `<strong>${classroom.name.substring(index, index + value.length)}</strong>` + classroom.name.substring(index + value.length);
            div.innerHTML = highlightedName;
            div.onclick = (e) => {
                e.stopPropagation();
                selectSuggestion(classroom); // Pass the correct classroom object
            };
            suggestionsBox.appendChild(div);
            currentSuggestions.push(div);
        });

        currentFocus = -1;
        suggestionsBox.style.display = matches.length ? "flex" : "none";
    });

    searchInput.addEventListener("keydown", (e) => {
        if (!currentSuggestions.length && e.key !== 'Escape' && e.key !== 'Enter') return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            currentFocus = (currentFocus + 1) % currentSuggestions.length;
            updateActiveSuggestion();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            currentFocus = (currentFocus - 1 + currentSuggestions.length) % currentSuggestions.length;
            updateActiveSuggestion();
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (currentFocus > -1) {
                currentSuggestions[currentFocus].click(); // Trigger the click handler
            } else {
                // Optional: Handle direct Enter press without selection
                const value = searchInput.value.trim().toLowerCase();
                const exactMatch = classrooms.find(c => c.name.toLowerCase() === value);
                if (exactMatch) {
                    selectSuggestion(exactMatch);
                }
            }
            suggestionsBox.style.display = "none"; // Hide suggestions after selection
        } else if (e.key === "Escape") {
            suggestionsBox.style.display = "none";
        }
    });
}

function updateActiveSuggestion() {
    currentSuggestions.forEach((div, index) => {
        div.classList.toggle("active", index === currentFocus);
        if (index === currentFocus) {
            // Ensure the focused item is visible in the dropdown
            div.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
    });
}

function selectSuggestion(classroom) {
    searchInput.value = classroom.name; // Set input value to selected name
    suggestionsBox.innerHTML = ""; // Clear suggestions
    suggestionsBox.style.display = "none"; // Hide suggestions box
    currentSuggestions = []; // Reset suggestions array
    currentFocus = -1; // Reset focus index
    updateUI(classroom); // Update map and info based on the selected classroom
}

// --- Lightbox Functionality (No changes needed here) ---
function openLightbox(imgElement) {
    if (!lightboxElement || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = imgElement.src;
    lightboxCaption.textContent = imgElement.alt;
    lightboxElement.style.display = 'block';
}
function closeLightbox() {
    if (!lightboxElement) return;
    lightboxElement.style.display = 'none';
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
}
// Event listener for clicking the image in the info box
if (infoContainer) {
    infoContainer.addEventListener('click', (event) => {
        // Check if the clicked target is an IMG tag within the class-info container
        if (event.target.tagName === 'IMG' && event.target.closest('.class-info.has-content')) { // Only open for actual content
            openLightbox(event.target);
        }
    });
}
// Event listener for the close button (X)
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}
// Event listener for clicking outside the image in the lightbox
if (lightboxElement) {
    lightboxElement.addEventListener('click', (event) => {
        // If the click is on the backdrop itself, close it
        if (event.target === lightboxElement) {
            closeLightbox();
        }
    });
}
// Event listener for the Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightboxElement && lightboxElement.style.display === 'block') {
        closeLightbox();
    }
});


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Load the initial view with the default map and placeholder text
    updateUI(null);
});