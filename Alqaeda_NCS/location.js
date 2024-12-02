// script.js

let map;
let campusMarkers = [];

// Sample data: Access logs with campus locations
const accessLogs = [
  { timestamp: "2024-12-01 08:30", userName: "John Doe", action: "Entry", location: "Main Gate" },
  { timestamp: "2024-12-01 09:45", userName: "Jane Smith", action: "Exit", location: "Side Gate" },
  { timestamp: "2024-12-01 10:00", userName: "Mike Johnson", action: "Entry", location: "Library" },
  { timestamp: "2024-12-01 11:30", userName: "Emily Davis", action: "Exit", location: "Side Gate" },
  { timestamp: "2024-12-01 12:15", userName: "Chris Williams", action: "Entry", location: "Main Gate" },
];

// Function to initialize the Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.748817, lng: -73.985428 }, // Default location (center of campus)
    zoom: 16,
  });

  // Add some sample campus markers (locations)
  const locations = [
    { name: "Main Gate", lat: 40.748817, lng: -73.985428 },
    { name: "Side Gate", lat: 40.747817, lng: -73.986428 },
    { name: "Library", lat: 40.749817, lng: -73.988428 }
  ];

  locations.forEach(location => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name
    });
    campusMarkers.push(marker);
  });
}

// Function to search and filter logs based on the person's name
function searchPerson() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const filteredLogs = accessLogs.filter(log => log.userName.toLowerCase().includes(searchQuery));
  
  // Update the log table with filtered data
  const tableBody = document.getElementById("logTable").getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ""; // Clear existing rows
  
  filteredLogs.forEach(log => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = log.timestamp;
    row.insertCell(1).textContent = log.userName;
    row.insertCell(2).textContent = log.action;
    row.insertCell(3).textContent = log.location;

    // Highlight the campus marker for this log entry
    campusMarkers.forEach(marker => {
      if (marker.getTitle().toLowerCase() === log.location.toLowerCase()) {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png'); // Change marker color
      }
    });
  });
}

// Event listener for search button
document.getElementById("searchButton").addEventListener("click", searchPerson);

