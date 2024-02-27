let url = 'https://api.wheretheiss.at/v1/satellites/25544';

let issLat      = document.querySelector('#iss-lat');
let issLong     = document.querySelector('#iss-long');
let lastUpdated = document.querySelector('#last-updated');

let update = 10000;

let maxFailedAttempts = 3;

var issMarker;

let map = L.map('iss-map').setView([0, 0], 1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>'
}).addTo(map);

let icon = L.icon({
    iconUrl: 'satellite.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
});

iss(maxFailedAttempts);

function iss(attempts) {
    fetch(url)
        .then( res => res.json() )
        .then( issData => {
            console.log(issData);

            let lat           = issData.latitude;
            let long          = issData.longitude;
            issLat.innerHTML  = lat;
            issLong.innerHTML = long;

            let date = new Date();
            lastUpdated.innerHTML = date;


            if (!issMarker) {
                issMarker = L.marker([lat, long], {icon: icon}).addTo(map);
            } else {
                issMarker.setLatLng([lat, long]);
            }
        })
        .catch( err => {
            console.log(err);
        })
        .finally( () => {
            setTimeout(iss, update, attempts);
        });
}
