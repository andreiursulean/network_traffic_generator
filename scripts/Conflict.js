class Conflict {
    /**
     * Constructor method
     * The constructor method takes no parameters and just initializes the arrays flights and numbers
     */
    constructor() {
        this.flights = [];
        this.numbers = [];
    }

    pushFlight(flight) {
        this.flights.push(flight);
    }

    pushNumber(number) {
        this.numbers.push(number);
    }

    push(obj) {
        this.flights.push(obj.flight);
        this.numbers.push(obj.number);
    }
}