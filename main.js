document.addEventListener("DOMContentLoaded", function() {
    var mainmap = createMap();
    var markers = showAirportsOnMap(mainmap);
    
        
});

function createMap() {
    var map = L.map('mapid').setView([55.505, 23.09], 4);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
}

function showAirportsOnMap(map) {
    var markers = [];

    for (var i = 0; i < airports.length; i++) {
        var lat = parseFloat(airports[i].latitude);
        var lon = parseFloat(airports[i].longitude);

        markers.push(L.marker([lat, lon]).addTo(map));
    }

    return markers;
}