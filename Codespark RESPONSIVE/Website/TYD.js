// Data for locations including new fields for the tooltip
const locations = [
  // Floor 1 - Using your updated image paths
  { name: "CHAPEL", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "EDS 100", classTime: "1:00pm - 4:00pm" },
  { name: "AUDIO-VISUAL STUDIO", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "EDS 100", classTime: "1:00pm - 4:00pm" },
  { name: "MAIDUGURI", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "EDS 100", classTime: "1:00pm - 4:00pm" },
  { name: "ADO EKITI", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "EDS 100", classTime: "1:00pm - 4:00pm" },
  { name: "EKO FOYER", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "EDS 100", classTime: "1:00pm - 4:00pm" },
  { name: "STUDENT AFFAIRS & ALUMNI OFFICE", floor: 1, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250430_161339.jpg", currentClass: "EPM 101", classTime: "9:00am - 11:00am" },
  { name: "MOSQUE", floor: 1, imageSrc: "/Website/images/Lecture Hall.jpg", currentClass: "EPM 101", classTime: "9:00am - 11:00am" },
  { name: "CAFETERIA", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "ECT 205", classTime: "11:00am - 1:00pm" },
  { name: "SAPETRO BLOCK", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "Office Hours", classTime: "By Appointment" },
  { name: "ZARIA", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "EDS 100", classTime: "1:00pm - 4:00pm" },
  { name: "ABUJA HALL", floor: 1, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250430_161339.jpg", currentClass: "EPM 101", classTime: "9:00am - 11:00am" },
  { name: "ENUGU", floor: 1, imageSrc: "/Website/images/Lecture Hall.jpg", currentClass: "EPM 101", classTime: "9:00am - 11:00am" },
  { name: "JOS", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "ECT 205", classTime: "11:00am - 1:00pm" },
  { name: "JALINGO", floor: 1, imageSrc: "images/locations/placeholder.jpg", currentClass: "Office Hours", classTime: "By Appointment" },
  // Floor 2 - Using your updated image paths
  { name: "RML (Robotics and Mechatronics Laboratory)", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "Robotics Intro", classTime: "10:00am - 12:00pm" },
  { name: "ACR (Air Conditioning and Refridgeratory Laboratory)", floor: 2, imageSrc: "SST CLASSROOM IMAGES/SAMSUNG S10/20250428_173814.jpg", currentClass: null, classTime: null },
  { name: "SST LAB1", floor: 2, imageSrc: "SST CLASSROOM IMAGES/SAMSUNG S10/20250428_173754.jpg", currentClass: "CS 310", classTime: "2:00pm - 4:00pm" },
  { name: "TFL (Thermofluid Lab)", floor: 2, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250428_173821.jpg", currentClass: "Thermo 212", classTime: "9:00am - 11:00am" },
  { name: "MML (Mechanics of Machines Lab)", floor: 2, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250428_173833.jpg", currentClass: "Mech 301", classTime: "1:00pm - 3:00pm" },
  { name: "SST Faculty Library", floor: 2, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250428_173848.jpg", currentClass: "Quiet Study", classTime: "All Day" },
  { name: "RM 2 (Classroom 2)", floor: 2, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250430_161221.jpg", currentClass: "MATH 101", classTime: "8:00am - 10:00am" },
  { name: "RM 1 (Classroom 1)", floor: 2, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250428_173902.jpg", currentClass: null, classTime: null },
  { name: "SST LAB2", floor: 2, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250428_173925.jpg", currentClass: "Physics 202 Lab", classTime: "11:00am - 1:00pm" },
  { name: "Tuck Shop", floor: 2, imageSrc: "images/locations/placeholder.jpg", currentClass: "Snacks & Drinks", classTime: "9:00am - 5:00pm" },
  // Floor 3 - Using your updated image paths
  { name: "PHY LAB (Physics and Applied Electricity Lab)", floor: 3, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250428_174124.jpg", currentClass: "Physics 101 Lab", classTime: "10:00am - 1:00pm" },
  { name: "CHM LAB (Chemistry Lab)", floor: 3, imageSrc: "images/locations/placeholder.jpg", currentClass: "Chem 110 Lab", classTime: "2:00pm - 5:00pm" },
  { name: "RM 5 (Classroom 5)", floor: 3, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250430_161127.jpg", currentClass: "History 250", classTime: "1:00pm - 3:00pm" },
  { name: "RM 4 (Classroom 4)", floor: 3, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250428_174016.jpg", currentClass: null, classTime: null },
  { name: "RM 3 (Classroom 3)", floor: 3, imageSrc: "/SST CLASSROOM IMAGES/SAMSUNG S10/20250428_174031.jpg", currentClass: "ENG 400 Seminar", classTime: "3:00pm - 5:00pm" },
];

let pinnedTooltipMarker = null; // Keep track of the clicked/pinned marker

// --- Floor Switching ---
function switchFloor(floor) {
  document.querySelectorAll('.map').forEach(map => map.classList.remove('active'));
  const activeMap = document.getElementById(`floor-${floor}`);
  if (activeMap) {
      activeMap.classList.add('active');
  }
  document.querySelectorAll('.floor-buttons button').forEach((btn, index) => {
      btn.classList.toggle('active', (index + 1) === floor);
  });
  // Hide and unpin tooltip when switching floors
  hideTooltip(true); // Pass true to force unpinning
}

// --- Search Functionality ---
const searchInput = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");
let currentFocus = -1;
let currentSuggestions = [];

if (searchInput && suggestionsBox) {
  searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();
      suggestionsBox.innerHTML = "";
      currentSuggestions = [];
      if (!value) {
          suggestionsBox.style.display = "none";
          return;
      }
      const matches = locations
          .filter(loc => loc.name.toLowerCase().includes(value))
          .sort((a, b) => a.name.toLowerCase().indexOf(value) - b.name.toLowerCase().indexOf(value));
      matches.forEach((loc) => {
          const div = document.createElement("div");
          div.textContent = loc.name;
          div.onclick = (e) => {
              e.stopPropagation();
              selectSuggestion(loc.name);
          };
          suggestionsBox.appendChild(div);
          currentSuggestions.push(div);
      });
      currentFocus = -1;
      suggestionsBox.style.display = matches.length ? "flex" : "none";
  });

  searchInput.addEventListener("keydown", (e) => {
      if (!currentSuggestions.length) return;
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
              currentSuggestions[currentFocus].click();
          } else if (searchInput.value.trim()) {
               const exactMatch = locations.find(loc => loc.name.toLowerCase() === searchInput.value.trim().toLowerCase());
               if (exactMatch) {
                   selectSuggestion(exactMatch.name);
               }
          }
           suggestionsBox.style.display = "none";
      } else if (e.key === "Escape") {
          suggestionsBox.style.display = "none";
          hideTooltip(true); // Hide tooltip on escape too
      }
  });
}

function updateActiveSuggestion() {
  currentSuggestions.forEach((div, index) => {
      div.classList.toggle("active", index === currentFocus);
      if (index === currentFocus) {
          div.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
  });
}

function selectSuggestion(name) {
  searchInput.value = name;
  suggestionsBox.style.display = "none";
  currentSuggestions = [];
  highlightLocation(name);

   const match = locations.find(loc => loc.name === name);
   if(match) {
      setTimeout(() => {
           const activeMap = document.getElementById(`floor-${match.floor}`);
           if(activeMap) {
               const marker = activeMap.querySelector(`.marker[data-name="${match.name}"]`);
               if(marker) {
                   // Show and Pin the tooltip for the selected location
                   showTooltip(marker, match);
                   pinnedTooltipMarker = marker; // Pin it directly
               } else {
                  console.warn(`SelectSuggestion: Marker not found on floor ${match.floor}:`, match.name);
               }
           }
      }, 100);
   }
}

// --- Location Highlighting ---
function highlightLocation(name) {
  const query = name.toLowerCase();
  const match = locations.find(loc => loc.name.toLowerCase() === query);
  document.querySelectorAll('.marker.highlight').forEach(m => m.classList.remove('highlight'));
  if (match) {
      if (!document.getElementById(`floor-${match.floor}`)?.classList.contains('active')) {
           switchFloor(match.floor); // This will also hide/unpin tooltip
      }
      setTimeout(() => {
          const activeMap = document.getElementById(`floor-${match.floor}`);
          if (activeMap) {
              const marker = activeMap.querySelector(`.marker[data-name="${match.name}"]`);
              if (marker) {
                  marker.classList.add('highlight');
              } else {
                   console.warn(`Highlight: Marker not found on floor ${match.floor}:`, match.name);
              }
          }
      }, 50);
  } else {
      console.log("Highlight: Location not found:", name);
  }
}


// --- Combined Hover/Click Tooltip & Lightbox Logic ---
document.addEventListener('DOMContentLoaded', () => {
  const tooltipElement = document.getElementById('custom-tooltip');
  const lightboxElement = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (!tooltipElement || !lightboxElement || !lightboxImg || !lightboxClose) {
      console.error("Tooltip or Lightbox elements not found!");
      return;
  }

  const tooltipImage = tooltipElement.querySelector('.tooltip-image');
  const mapContainer = document.querySelector('.map-container');

  if (!mapContainer) {
      console.error("Map container not found!");
      return;
  }
   if (!tooltipImage) {
       console.error("Tooltip image element not found.");
       // return; // Maybe allow script to continue without lightbox functionality
   }


  // --- Event Delegation for Markers ---
  mapContainer.addEventListener('mouseover', (event) => {
      const marker = event.target.closest('.marker');
      if (marker) {
          // Show tooltip on hover
          const locationName = marker.dataset.name;
          const locationData = locations.find(loc => loc.name === locationName);
          if (locationData) {
              showTooltip(marker, locationData);
          }
      }
  });

  mapContainer.addEventListener('mouseout', (event) => {
       const marker = event.target.closest('.marker');
       if (marker) {
           // Hide tooltip on mouseout ONLY if it's not pinned
           if (marker !== pinnedTooltipMarker) {
               hideTooltip();
           }
       }
  });

  mapContainer.addEventListener('click', (event) => {
      const marker = event.target.closest('.marker');
      if (marker) {
          event.stopPropagation(); // Prevent document click listener
          const locationName = marker.dataset.name;
          const locationData = locations.find(loc => loc.name === locationName);

          if (locationData) {
              if (marker === pinnedTooltipMarker) {
                  // Clicked on already pinned marker: Unpin it
                  pinnedTooltipMarker = null;
                  // Optional: hide immediately, or let mouseout handle it
                  hideTooltip();
              } else {
                  // Clicked on a new marker (or non-pinned one): Pin it
                  showTooltip(marker, locationData); // Ensure it's shown/updated
                  pinnedTooltipMarker = marker;
              }
          }
      }
  });

  // --- Tooltip Image Click -> Open Lightbox ---
  if (tooltipImage) {
      tooltipImage.addEventListener('click', (event) => {
          event.stopPropagation(); // VERY IMPORTANT: Prevent this click from unpinning/hiding tooltip via document listener
          if (tooltipImage.src && tooltipImage.src !== window.location.href) {
              lightboxImg.src = tooltipImage.src;
              lightboxElement.style.display = 'block';
          }
      });
  }

  // --- Lightbox Close ---
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxElement.addEventListener('click', (event) => {
      if (event.target === lightboxElement) {
          closeLightbox();
      }
  });

  // --- Global Click Listener ---
  document.addEventListener('click', (event) => {
      // Hide tooltip and unpin if click is outside tooltip and not on a marker
      if (pinnedTooltipMarker && tooltipElement.style.display === 'block') {
          if (!tooltipElement.contains(event.target) && !event.target.closest('.marker')) {
              hideTooltip(true); // Force unpin
          }
      }

      // Hide search suggestions if click is outside search wrapper
      if (suggestionsBox && suggestionsBox.style.display === 'flex') {
          const searchWrapper = document.getElementById("search-wrapper");
          if (searchWrapper && !searchWrapper.contains(event.target)) {
              suggestionsBox.style.display = "none";
          }
      }
  });

  // Initialize
  switchFloor(1);

}); // End DOMContentLoaded


// --- Tooltip Helper Functions ---
function showTooltip(marker, locationData) {
  const tooltipElement = document.getElementById('custom-tooltip');
  if (!tooltipElement || !locationData) return;

  const tooltipImage = tooltipElement.querySelector('.tooltip-image');
  const tooltipClass = tooltipElement.querySelector('.tooltip-class');
  const tooltipTime = tooltipElement.querySelector('.tooltip-time');
  const tooltipLocation = tooltipElement.querySelector('.tooltip-location');

  if (!tooltipImage || !tooltipClass || !tooltipTime || !tooltipLocation) return;

  // Populate
  tooltipImage.src = encodeURI(locationData.imageSrc || 'images/locations/placeholder.jpg');
  tooltipImage.alt = locationData.name;
  tooltipLocation.textContent = locationData.name;
  if (locationData.currentClass) {
      tooltipClass.textContent = locationData.currentClass;
      tooltipTime.textContent = locationData.classTime ? `(${locationData.classTime})` : '';
      tooltipClass.style.display = 'block';
      tooltipTime.style.display = locationData.classTime ? 'block' : 'none';
  } else {
      tooltipClass.textContent = 'No class scheduled';
      tooltipTime.textContent = '';
      tooltipClass.style.display = 'block';
      tooltipTime.style.display = 'none';
  }

  // Position
  tooltipElement.style.display = 'block';
  tooltipElement.style.visibility = 'hidden';
  tooltipElement.style.top = '-9999px';
  tooltipElement.style.left = '-9999px';
  void tooltipElement.offsetWidth; // Force reflow

  const markerRect = marker.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const spaceAbove = markerRect.top;
  const spaceBelow = window.innerHeight - markerRect.bottom;
  const tooltipHeight = tooltipRect.height;
  const tooltipWidth = tooltipRect.width;
  const margin = 10;
  let top, left;

  if (tooltipHeight <= 0 || tooltipWidth <= 0) {
      top = markerRect.bottom + scrollY + margin;
      left = markerRect.left + scrollX;
  } else {
      if (spaceBelow > tooltipHeight + margin || spaceBelow >= spaceAbove) {
          top = markerRect.bottom + scrollY + margin;
      } else {
          top = markerRect.top + scrollY - tooltipHeight - margin;
      }
      left = markerRect.left + scrollX + (markerRect.width / 2) - (tooltipWidth / 2);
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      if (left < scrollX + margin) {
          left = scrollX + margin;
      } else if (left + tooltipWidth > viewportWidth + scrollX - margin) {
          left = viewportWidth + scrollX - tooltipWidth - margin;
      }
  }

  tooltipElement.style.top = `${top}px`;
  tooltipElement.style.left = `${left}px`;
  tooltipElement.style.visibility = 'visible';
}

// Hide tooltip. Pass forceUnpin=true to also clear the pinned state.
function hideTooltip(forceUnpin = false) {
  const tooltipElement = document.getElementById('custom-tooltip');
  if (tooltipElement) {
      tooltipElement.style.display = 'none';
  }
  if (forceUnpin) {
      pinnedTooltipMarker = null;
  }
}

// --- Lightbox Helper Functions ---
function closeLightbox() {
  const lightboxElement = document.getElementById('image-lightbox');
  if (lightboxElement) {
      lightboxElement.style.display = 'none';
  }
}