/*================== MAIN FUNCTION ==================*/
function main()
{
    // Read inputs

    let deltaT = 8600;
    let n = 100;
    //let deltaT = parseInt(document.getElementById('t').value);
    //let n = parseInt(document.getElementById('n').value);
    
    // Generate map and display airport markers
    let mainmap = createMap();
    let markers = showAirportsOnMap(mainmap);
            
    // Create flights and sort by ETA
    let flights = createFlights(n);
    sortFlights(flights);
    console.log(flights);

    // Show flights geodesic lines on map
    let geodesicLines = showFlightsOnMap(flights, mainmap);
    
    // Find conflicts
    let conflicts = findConflicts(flights, deltaT);
    console.log(conflicts);
    
    // Show Flights table
    printFlightsTable(flights, conflicts);
}

function createMap() {
    var map = L.map('mapid').setView([55.505, 23.09], 4);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
}

function showAirportsOnMap(map) {
    let markers = [];

    for (let i = 0; i < airports.length; i++) {
        let lat = parseFloat(airports[i].latitude);
        let lng = parseFloat(airports[i].longitude);

        markers.push(L.marker([lat, lng]).addTo(map).bindPopup(airports[i].icao));
    }

    return markers;
}

function createFlights(n) {
    let flights = [];
    
    for (let i = 0; i < n; i++) {

        // Set destination airport
        let destinationIndex = Math.round(Math.random() * (APRT_LENGTH - 1));
        let ades = {
            icao: airports[destinationIndex].icao,
            lat: parseFloat(airports[destinationIndex].latitude),
            lng: parseFloat(airports[destinationIndex].longitude),
        };

        // Set departure airport
        
        let departureIndex = -1;
        
        while ((departureIndex = Math.round(Math.random() * (APRT_LENGTH - 1))) == destinationIndex) {
            // Run so that departure and destination airport are not the same 
            ;
        }

        let adep = {
            icao: airports[departureIndex].icao,
            lat: parseFloat(airports[departureIndex].latitude),
            lng: parseFloat(airports[departureIndex].longitude),
        };

        // Set time 
        let atd = new Date();
        atd.setHours(Math.round(Math.random() * 23));
        atd.setMinutes(Math.round(Math.random() * 59));
        atd.setSeconds(Math.round(Math.random() * 59));
        
        // Set aircraft model
        let acft = aircraft[Math.round(Math.random() * (ACFT_LENGTH - 1))];
        
        // For FL generation we use semi-circular rule for IFR flights
        let fl = (ades.lng - adep.lng) > 0? eastboundFL[Math.round(Math.random() * (FL_LENGTH - 1))]: westboundFL[Math.round(Math.random() * (FL_LENGTH - 1))];

        // Generate new flight object
        let newFlight = new Flight(ades, adep, atd, acft, fl);    
        flights.push(newFlight);
        
    }

    return flights;
}

function showFlightsOnMap(flights, map) {
    geodesicLines = [];
    
    for (let i = 0; i < flights.length; i++) {
        geodesicLines.push(new L.Geodesic([flights[i].adep, flights[i].ades]).addTo(map));
    }

    return geodesicLines;
}

function sortFlights(flights) {
    for (let i = 0; i < flights.length - 1; i++)
        for (let j = i + 1; j < flights.length; j++)
            if (flights[i].eta > flights[j].eta) {
                let aux = flights[i];
                flights[i] = flights[j];
                flights[j] = aux;
            }
}

function findConflicts(flights, deltaT) {
    conflicts = [];

    for (let i = 1; i < flights.length - 1; i++)
        if ((flights[i].ades.icao == flights[i + 1].ades.icao) && (Math.abs(flights[i].eta - flights[i + 1].eta) <= deltaT * 1000))
            conflicts.push(i);

    return conflicts;
    
}

function printFlightsTable(flights, conflicts) {
    let tableString = '<tr><th>No.</th><th>ADES</th><th>ADEP</th><th>ATD</th><th>ACFT</th><th>FL</th><th>Distance</th><th>ETE</th><th>ETA</th></tr>';

    for (let i = 0; i < flights.length; i++) {

        if (checkElementInArray(i, conflicts) || checkElementInArray(i - 1, conflicts)) {
            tableString += '<tr class="conflict"><td>' + i + '</td><td>' + flights[i].ades.icao + '</td><td>' + flights[i].adep.icao + '</td><td>' + 
            flights[i].atd + '</td><td>' + flights[i].acft.typeDesignator + '</td><td>' + flights[i].fl + '</td><td>' + 
            flights[i].distance + '</td><td>' + flights[i].ete + '</td><td>' + flights[i].eta + '</td></tr>';
        }
        else {
            tableString += '<tr><td>'  + i + '</td><td>' + flights[i].ades.icao + '</td><td>' + flights[i].adep.icao + '</td><td>' + 
            flights[i].atd + '</td><td>' + flights[i].acft.typeDesignator + '</td><td>' + flights[i].fl + '</td><td>' + 
            flights[i].distance + '</td><td>' + flights[i].ete + '</td><td>' + flights[i].eta + '</td></tr>';
        }
    }

    document.getElementById('flightsTable').innerHTML = tableString;
}

function checkElementInArray(val, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val)
            return true;
    }

    return false;
}
