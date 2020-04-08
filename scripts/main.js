/** 
 * Main entry point in the program
 * 
 * Global variables (Window members): deltaT, state, mainmap, flights, conflicts, statisticsChart
 * 
 */

/*================== MAIN FUNCTION ==================*/
function main()
{   
    // Read inputs
    deltaT = parseInt(document.getElementById('t').value);
    let n = parseInt(document.getElementById('n').value);
    
    console.log(n);
    console.log(deltaT);

    if (isNaN(n) || isNaN(deltaT)) {
        alert("Please insert valid inputs for the number of aircraft and the time parameter");
        return;
    }

    // Change UI
    document.getElementById('body').style.display = 'block';
    document.getElementById('inputsWrapper').style.display = 'none';
    document.getElementById('intro').style.display = 'none';
    document.getElementById("mainDefaultOpen").click();
    
    // The state of the animation
    state = -1; // -1 means display all flights

    // Generate map and display airport markers
    mainmap = createMap('mapid');
    let markers = showAirportsOnMap(mainmap);
    
    // Create flights and sort by ETA
    flights = createFlights(n);
    sortFlights(flights);
    console.log(flights);

    // Show flights geodesic lines on map
    geodesicLines = showFlightsOnMap(flights, mainmap);
    
    // Find conflicts
    conflicts = findConflicts(flights, deltaT);
    console.log(conflicts);
    
    // Show Flights table
    printFlightsTable(flights, conflicts);

    // Format conflicts for statistics
    let conflictData = compileConflictData(conflicts, flights)
    console.log(conflictData);

    // Show statistics
    statisticsChart = createChart(conflictData);
    console.log()
}
