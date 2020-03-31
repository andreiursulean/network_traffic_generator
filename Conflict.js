class Conflict {

    // So far, this is not used
    
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