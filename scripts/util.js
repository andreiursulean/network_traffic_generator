// TODO de facut librarie

function createMap(id) {
    var map = L.map(id).setView([55.505, 23.09], 4);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
}

function showAirportsOnMap(map) {
    let markers = [];

    for (let i = 0; i < airports.length; i++) {
        let lat = airports[i].lat;
        let lng = airports[i].lng;

        markers.push(L.marker([lat, lng]).addTo(map).bindPopup(airports[i].icao));
    }

    return markers;
}

function createFlights(n) {
    let flights = [];
    
    for (let i = 0; i < n; i++) {

        // Set destination airport
        let destinationIndex = Math.round(Math.random() * (airports.length - 1));
        let ades = airports[destinationIndex];

        // Set departure airport
        
        let departureIndex = -1;
        
        while ((departureIndex = Math.round(Math.random() * (airports.length - 1))) == destinationIndex) {
            // Run so that departure and destination airport are not the same 
            ;
        }

        let adep = airports[departureIndex];

        // Set time 
        let atd = new Date();
        atd.setHours(Math.round(Math.random() * 23));
        atd.setMinutes(Math.round(Math.random() * 59));
        atd.setSeconds(Math.round(Math.random() * 59));
        
        // Set aircraft model
        let acft = aircraft[Math.round(Math.random() * (aircraft.length - 1))];
        
        // For FL generation we use semi-circular rule for IFR flights
        let fl = (ades.lng - adep.lng) > 0? eastboundFL[Math.round(Math.random() * (FL_LENGTH - 1))]: westboundFL[Math.round(Math.random() * (FL_LENGTH - 1))];

        // Generate new flight object
        let newFlight = new Flight(ades, adep, atd, acft, fl);    
        flights.push(newFlight);
        
    }

    return flights;
}

function showFlightsOnMap(flights, map) {
    if (typeof geodesicLines !== 'undefined') {
        // Remove old flights
        for (let i = 0; i < geodesicLines.length; i++) {
            mainmap.removeLayer(geodesicLines[i]);
        }
    }
    
    geodesicLines = [];
    
    for (let i = 0; i < flights.length; i++) {
        adep = new L.LatLng(flights[i].adep.lat, flights[i].adep.lng);
        ades = new L.LatLng(flights[i].ades.lat, flights[i].ades.lng);
        geodesicLines.push(new L.Geodesic([adep, ades]).addTo(map));
    }

    return geodesicLines;
}

function sortFlights(flights) {
    for (let i = 0; i < flights.length - 1; i++)
        for (let j = i + 1; j < flights.length; j++)
            if (flights[i].ades.icao > flights[j].ades.icao) {
                let aux = flights[i];
                flights[i] = flights[j];
                flights[j] = aux;
            }

    for (let i = 0; i < flights.length - 1; i++)
        for (let j = i + 1; j < flights.length; j++)
            if (flights[i].ades.icao === flights[j].ades.icao && flights[i].eta > flights[j].eta) {
                let aux = flights[i];
                flights[i] = flights[j];
                flights[j] = aux;
            }            
}

function findConflicts(flights, deltaT) {
    let conflicts = [];

    for (let i = 0; i < flights.length - 1; i++) {
        let tmp = new Conflict();
        let isConflict = false;

        

        while ((i < flights.length - 1) && (flights[i].ades.icao == flights[i + 1].ades.icao) && (Math.abs(flights[i].eta - flights[i + 1].eta) <= deltaT * 1000)) {            
            tmp.push({"flight": flights[i], "number": i});
            isConflict = true;
            i++;
        }

        tmp.push({"flight": flights[i], "number": i});

        if (isConflict)
            conflicts.push(tmp);
    }

    return conflicts;
}

function printFlightsTable(flights, conflicts) {
    let tableString = '<tr><th>No.</th><th>ADES</th><th>ADEP</th><th>ATD</th><th>ACFT</th><th>FL</th><th>Distance (NM)</th><th>ETE</th><th>ETA</th></tr>';

    for (let i = 0; i < flights.length; i++) {

        let isConflict = false;
        for (let j = 0; j < conflicts.length; j++)
            if (checkElementInArray(i, conflicts[j].numbers)) {
                isConflict = true;
            }

        if (isConflict) {
            tableString += '<tr class="conflict"><td>' + i + '</td><td>' + flights[i].ades.icao + '</td><td>' + flights[i].adep.icao + '</td><td>' + 
            flights[i].atd.toUTCString() + '</td><td>' + flights[i].acft.typeDesignator + '</td><td>' + flights[i].fl + '</td><td>' + 
            metersToNM(flights[i].distance) + '</td><td>' + secondsToHoursString(flights[i].ete) + '</td><td>' + flights[i].eta.toUTCString() + '</td></tr>';
        }
        else {
            tableString += '<tr><td>'  + i + '</td><td>' + flights[i].ades.icao + '</td><td>' + flights[i].adep.icao + '</td><td>' + 
            flights[i].atd.toUTCString() + '</td><td>' + flights[i].acft.typeDesignator + '</td><td>' + flights[i].fl + '</td><td>' + 
            metersToNM(flights[i].distance) + '</td><td>' + secondsToHoursString(flights[i].ete) + '</td><td>' + flights[i].eta.toUTCString() + '</td></tr>';
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

function createChart(conflictData) {
    let ctx = document.getElementById('statisticsChart').getContext('2d');
    let statisticsChart = new Chart(ctx, {
        type: "bar",
        data: conflictData,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    return statisticsChart;
}

function autosolve() {
    alert("Warning! Experimental method. Use at your own risk"); // TODO IMPLEMENT
    alert("Initial number of conflicts: " + conflicts.length)

    let unsolved = true; // In order to enter the loop
    let control = 0;

    while (unsolved && (control++ < 9000)) {

        unsolved = false; // Assume the conflicts to be solved

        for (let i = 0; i < conflicts.length; i++) {
            conflicts[i].flights[1].delay(1 + deltaT - (conflicts[i].flights[1].eta - conflicts[i].flights[0].eta)/1000);
            unsolved = true;
        }
    }

    // Restart UI
    conflicts = findConflicts(flights, deltaT);
    geodesicLines = showFlightsOnMap(flights, mainmap);
    printFlightsTable(flights, conflicts);
    let conflictData = compileConflictData(conflicts, flights)
    statisticsChart.data = conflictData;
    statisticsChart.update();
    alert("New number of conflicts: " + conflicts.length)
}

function compileConflictData(conflicts, flights) {
    let conflictData = {
        labels: [],
        datasets: [{
            label: "Conflicts",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    };

    for (let i = 0; i < conflicts.length; i++) {
        let index = conflictData.labels.indexOf(conflicts[i].flights[0].ades.icao);
        if (index >= 0) {
            conflictData.datasets[0].data[index] += conflicts[i].numbers.length;            
        }
        else {
            conflictData.labels.push(conflicts[i].flights[0].ades.icao);
            let index = conflictData.labels.length - 1;
            conflictData.datasets[0].data[index] = conflicts[i].numbers.length;
            conflictData.datasets[0].backgroundColor[index] = 'rgba(153, 102, 255, 0.2)';
            conflictData.datasets[0].borderColor[index] = 'rgba(153, 102, 255, 1)';
        }
    }

    return conflictData;
}

function animPreviousState() {
    let nextState = conflicts.length - 1;

    if (state > -1)
            nextState = state - 1;

    state = nextState;
    if (state >= 0) {
        // Draw new flights
        geodesicLines = showFlightsOnMap(conflicts[state].flights, mainmap);  
        document.getElementById("conflictDataIndicator").innerHTML = "Conflict " + state + ", Flights " + conflicts[state].numbers;
    }    
    else if (state == -1) {

        geodesicLines = showFlightsOnMap(flights, mainmap);  
        document.getElementById("conflictDataIndicator").innerHTML = "Showing all Flights";
    }
            
    console.log("Animation state: " + state);
}

function animNextState() {
    let nextState = -1;

    if (state < conflicts.length - 1)
            nextState = state + 1;

    state = nextState;

    if (state >= 0) {
        // Draw new flights
        geodesicLines = showFlightsOnMap(conflicts[state].flights, mainmap);  
        document.getElementById("conflictDataIndicator").innerHTML = "Conflict " + state + ", Flights " + conflicts[state].numbers;
        
    }    
    else if (state == -1) {
        geodesicLines = showFlightsOnMap(flights, mainmap);  
        document.getElementById("conflictDataIndicator").innerHTML="Showing all Flights";
    }
            
    console.log("Animation state: " + state);
}

function secondsToHoursString(n) {
    let q = Math.floor(n/3600);
    let r = n - q * 3600;
    let h = q;

    if (h < 10)
        h = "0" + h;
    
        q = Math.floor(r / 60);
    r = r - q * 60;
    let m = q;

    if (m < 10)
        m = "0" + m;
    
    let s = Math.floor(r);
    if (s < 10)
        s = "0" + s;

    return h + ":" + m + ":" + s;   
}

function metersToNM(n) {
    return (n * 0.000539956803).toFixed(2);
}