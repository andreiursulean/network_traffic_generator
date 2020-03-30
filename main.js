/* TODO
 * implement autosolve
 * implement play button for conflicts 
 */



/*================== MAIN FUNCTION ==================*/
function main()
{   
    document.getElementById('body').style.display = 'block';
    document.getElementById('inputsWrapper').style.display = 'none';

    // Read inputs

    let deltaT = parseInt(document.getElementById('t').value);
    let n = parseInt(document.getElementById('n').value);
    
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

    // Format conflicts for statistics
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
        let index = conflictData.labels.indexOf(flights[conflicts[i]].ades.icao);

        if (index >= 0) {
            conflictData.datasets[0].data[index]++;            
        }
        else {
            conflictData.labels.push(flights[conflicts[i]].ades.icao);
            let index = conflictData.labels.length - 1;
            conflictData.datasets[0].data[index] = 1;
            conflictData.datasets[0].backgroundColor[index] = 'rgba(153, 102, 255, 0.2)';
            conflictData.datasets[0].borderColor[index] = 'rgba(153, 102, 255, 1)';
        }


    }

    console.log(conflictData);

    // Show statistics
    drawCharts(conflictData);
}
