/** 
 * Main entry point in the program
 * 
 * Global variables (Window members): deltaT, state, mainmap, flights, conflicts
 * 
 *  TODO
 * implement autosolve
 */



/*================== MAIN FUNCTION ==================*/
function main()
{   
    document.getElementById('body').style.display = 'block';
    document.getElementById('inputsWrapper').style.display = 'none';
    document.getElementById('intro').style.display = 'none';

    // Read inputs

    deltaT = parseInt(document.getElementById('t').value);
    let n = parseInt(document.getElementById('n').value);
    
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
    drawCharts(conflictData);
}
