// Data for locations including new fields for the tooltip
const locations = [
  // Floor 1
  { name: "EPM (Electrical Power and Machines Lab)", floor: 1, imageSrc: "/Website/images/Lecture Hall.jpg", currentClass: "EPM 101", classTime: "9:00am - 11:00am" },
  { name: "ECT (Electronic and Control Lab)", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "ECT 205", classTime: "11:00am - 1:00pm" },
  { name: "Course Coordinators office", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "Office Hours", classTime: "By Appointment" },
  { name: "EDS (Engineering Drawing Studio)", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "EDS 100", classTime: "1:00pm - 4:00pm" },
  // Floor 2
  { name: "RML (Robotics and Mechatronics Laboratory)", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "Robotics Intro", classTime: "10:00am - 12:00pm" },
  { name: "ACR (Air Conditioning and Refridgeratory Laboratory)", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: null, classTime: null },
  { name: "LAB1", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "CS 310", classTime: "2:00pm - 4:00pm" },
  { name: "TFL (Thermofluid Lab)", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "Thermo 212", classTime: "9:00am - 11:00am" },
  { name: "MML (Mechanics of Machines Lab)", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "Mech 301", classTime: "1:00pm - 3:00pm" },
  { name: "Faculty Library", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "Quiet Study", classTime: "All Day" },
  { name: "RM 2", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "MATH 101", classTime: "8:00am - 10:00am" },
  { name: "RM 1", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: null, classTime: null },
  { name: "LAB2", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "Physics 202 Lab", classTime: "11:00am - 1:00pm" },
  { name: "Tuck Shop", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "Snacks & Drinks", classTime: "9:00am - 5:00pm" },
  // Floor 3
  { name: "PHY LAB (Physics and Applied Electricity Lab)", floor: 3, imageSrc: "images/locations/placeholder.jpg", currentClass: "Physics 101 Lab", classTime: "10:00am - 1:00pm" },
  { name: "CHM LAB (Chemistry Lab)", floor: 3, imageSrc: "images/locations/placeholder.jpg", currentClass: "Chem 110 Lab", classTime: "2:00pm - 5:00pm" },
  { name: "RM 5", floor: 3, imageSrc: "images/locations/placeholder.jpg", currentClass: "History 250", classTime: "1:00pm - 3:00pm" },
  { name: "RM 4", floor: 3, imageSrc: "images/locations/placeholder.jpg", currentClass: null, classTime: null },
  { name: "RM 3", floor: 3, imageSrc: "images/locations/placeholder.jpg", currentClass: "ENG 400 Seminar", classTime: "3:00pm - 5:00pm" },
];

// --- Floor Switching ---
function switchFloor(floor) {
  // Switch active map
  document.querySelectorAll('.map').forEach(map => map.classList.remove('active'));
  const activeMap = document.getElementById(`floor-${floor}`);
  if (activeMap) {
      activeMap.classList.add('active');
  }

  // Highlight active floor button
  document.querySelectorAll('.floor-buttons button').forEach((btn, index) => {
      // Check button text content for safer matching if needed, or rely on order
      btn.classList.toggle('active', (index + 1) === floor); // Assuming button order matches floor number
  });
}

// --- Search Functionality ---
const searchInput = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");
let currentFocus = -1;
let currentSuggestions = []; // Stores the suggestion div elements

if (searchInput && suggestionsBox) {
  searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();
      suggestionsBox.innerHTML = ""; // Clear previous suggestions
      currentSuggestions = []; // Reset suggestions array

      if (!value) {
          suggestionsBox.style.display = "none";
          return;
      }

      // Filter and sort locations based on input value
      const matches = locations
          .filter(loc => loc.name.toLowerCase().includes(value))
          .sort((a, b) => a.name.toLowerCase().indexOf(value) - b.name.toLowerCase().indexOf(value));

      // Create and append suggestion divs
      matches.forEach((loc) => {
          const div = document.createElement("div");
          div.textContent = loc.name;
          div.onclick = () => selectSuggestion(loc.name);
          suggestionsBox.appendChild(div);
          currentSuggestions.push(div); // Add the element to the array
      });

      currentFocus = -1; // Reset focus index
      suggestionsBox.style.display = matches.length ? "flex" : "none"; // Use flex to enable flex properties like direction
  });

  searchInput.addEventListener("keydown", (e) => {
      if (!currentSuggestions.length) return; // Do nothing if no suggestions

      if (e.key === "ArrowDown") {
          e.preventDefault(); // Prevent cursor move
          currentFocus = (currentFocus + 1) % currentSuggestions.length;
          updateActiveSuggestion();
      } else if (e.key === "ArrowUp") {
          e.preventDefault(); // Prevent cursor move
          currentFocus = (currentFocus - 1 + currentSuggestions.length) % currentSuggestions.length;
          updateActiveSuggestion();
      } else if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submission if any
          if (currentFocus > -1) {
              // Click the focused suggestion
              currentSuggestions[currentFocus].click();
          } else if (searchInput.value.trim()) {
               // If user typed something and hit Enter without selecting
               // Try to highlight based on exact match (case-insensitive)
               const exactMatch = locations.find(loc => loc.name.toLowerCase() === searchInput.value.trim().toLowerCase());
               if (exactMatch) {
                   selectSuggestion(exactMatch.name);
               }
          }
           suggestionsBox.style.display = "none"; // Hide suggestions
      } else if (e.key === "Escape") {
          suggestionsBox.style.display = "none"; // Hide on escape
      }
  });

  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
      if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
           suggestionsBox.style.display = "none";
      }
  });

} // End if (searchInput && suggestionsBox)

// Updates visual focus on suggestions
function updateActiveSuggestion() {
  currentSuggestions.forEach((div, index) => {
      div.classList.toggle("active", index === currentFocus);
      if (index === currentFocus) {
          // Ensure the focused item is visible within the scrollable suggestions box
          div.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
  });
}

// Called when a suggestion is clicked or selected via Enter
function selectSuggestion(name) {
  searchInput.value = name;
  suggestionsBox.style.display = "none"; // Hide suggestions
  currentSuggestions = []; // Clear suggestions array
  highlightLocation(name); // Highlight the selected location on the map
}

// --- Location Highlighting ---
function highlightLocation(name) {
  const query = name.toLowerCase();
  const match = locations.find(loc => loc.name.toLowerCase() === query);

  // Remove previous highlights
  document.querySelectorAll('.marker.highlight').forEach(m => m.classList.remove('highlight'));

  if (match) {
      // Switch to the correct floor first
      switchFloor(match.floor);

      // Use setTimeout to allow the DOM to update after switching floor
      setTimeout(() => {
          const activeMap = document.getElementById(`floor-${match.floor}`);
          if (activeMap) {
               // Find the specific marker within the now active map
              // Use quotes around the data-name value in the selector
              const marker = activeMap.querySelector(`.marker[data-name="${match.name}"]`);
              if (marker) {
                  marker.classList.add('highlight');
                  // Optional: Scroll the marker into view if map is scrollable/zoomable
                  // marker.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                   console.warn(`Marker not found on floor ${match.floor}:`, match.name);
              }
          } else {
              console.warn(`Map element not found for floor ${match.floor}`);
          }
      }, 50); // Small delay helps ensure map is visible before querySelector runs

  } else {
      console.log("Location not found in highlightLocation:", name);
  }
}


// --- Custom Tooltip Logic ---
document.addEventListener('DOMContentLoaded', () => {
  const tooltipElement = document.getElementById('custom-tooltip');

  // Check if tooltip element exists
  if (!tooltipElement) {
      console.error("Tooltip element with ID 'custom-tooltip' not found!");
      return;
  }

  const tooltipImage = tooltipElement.querySelector('.tooltip-image');
  const tooltipClass = tooltipElement.querySelector('.tooltip-class');
  const tooltipTime = tooltipElement.querySelector('.tooltip-time');
  const tooltipLocation = tooltipElement.querySelector('.tooltip-location');

  // Check if inner tooltip elements exist
  if (!tooltipImage || !tooltipClass || !tooltipTime || !tooltipLocation) {
      console.error("One or more inner tooltip elements (.tooltip-image, .tooltip-class, etc.) not found!");
      return;
  }

  const markers = document.querySelectorAll('.marker');

  markers.forEach(marker => {
      marker.addEventListener('mouseenter', (event) => {
          const locationName = marker.dataset.name;
          // Find the location data using the marker's data-name
          const locationData = locations.find(loc => loc.name === locationName);

          if (locationData) {
              // --- Populate Tooltip ---
              // Use placeholder if image source is missing/invalid
              tooltipImage.src = locationData.imageSrc || 'images/locations/placeholder.jpg';
              tooltipImage.alt = locationData.name; // Set alt text
              tooltipLocation.textContent = locationData.name;

              // Display class/time info or default message
              if (locationData.currentClass) { // Check if class exists
                  tooltipClass.textContent = locationData.currentClass;
                  tooltipTime.textContent = locationData.classTime ? `(${locationData.classTime})` : ''; // Show time only if present
                  tooltipClass.style.display = 'block'; // Ensure elements are visible
                  tooltipTime.style.display = locationData.classTime ? 'block' : 'none';
              } else {
                  tooltipClass.textContent = 'No class scheduled';
                  tooltipTime.textContent = '';
                  tooltipClass.style.display = 'block';
                  tooltipTime.style.display = 'none';
              }

              // --- Position Tooltip ---
               // Make tooltip temporarily visible but off-screen to measure its dimensions accurately
               tooltipElement.style.display = 'block';
               tooltipElement.style.visibility = 'hidden';
               tooltipElement.style.top = '-9999px';
               tooltipElement.style.left = '-9999px';

              const markerRect = marker.getBoundingClientRect(); // Marker position relative to viewport
              const tooltipRect = tooltipElement.getBoundingClientRect(); // Tooltip dimensions
              const scrollX = window.pageXOffset || document.documentElement.scrollLeft; // Cross-browser scroll position
              const scrollY = window.pageYOffset || document.documentElement.scrollTop;

              const spaceAbove = markerRect.top;
              const spaceBelow = window.innerHeight - markerRect.bottom;
              const tooltipHeight = tooltipRect.height;
              const tooltipWidth = tooltipRect.width;
              const margin = 10; // Space between marker and tooltip

              let top, left;

              // Decide vertical position: Prefer below, but move above if not enough space below
              if (spaceBelow > tooltipHeight + margin || spaceBelow >= spaceAbove) {
                  top = markerRect.bottom + scrollY + margin; // Position below marker
              } else {
                  top = markerRect.top + scrollY - tooltipHeight - margin; // Position above marker
              }

              // Calculate horizontal position: Centered above/below marker
              left = markerRect.left + scrollX + (markerRect.width / 2) - (tooltipWidth / 2);

              // Adjust horizontal position if tooltip goes off-screen
              if (left < scrollX + margin) { // Too far left
                  left = scrollX + margin;
              } else if (left + tooltipWidth > window.innerWidth + scrollX - margin) { // Too far right
                  left = window.innerWidth + scrollX - tooltipWidth - margin;
              }

              // Apply calculated position and make visible
              tooltipElement.style.top = `${top}px`;
              tooltipElement.style.left = `${left}px`;
              tooltipElement.style.visibility = 'visible'; // Make it visible at correct position
          } else {
               console.warn("No location data found for marker:", locationName);
               tooltipElement.style.display = 'none'; // Hide if no data
          }
      });

      marker.addEventListener('mouseleave', () => {
           // Hide the tooltip when the mouse leaves the marker
          tooltipElement.style.display = 'none';
      });
  });

   // Initial setup: Set the active floor button (e.g., to Ground floor)
   switchFloor(1);

}); // End DOMContentLoaded