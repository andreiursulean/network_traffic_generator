class Flight {

    /**
     * Constructor method 
     * 
     * @param {Airport} ades is a reference to the destination Airport object
     * @param {Airport} adep is a reference to the departure Airport object
     * @param {Date} atd  is a Date object representing the Actual Time of Departure of the ACFT
     * @param {Aircraft} acft is a reference to an Aircraft object representing the model of the aircraft
     * @param {number} fl   is an integer number representing the Flight Level 
     */
    constructor(ades, adep, atd, acft, fl) {
        this.ades = ades;
        this.adep = adep;
        this.atd = atd;
        this.acft = acft;
        this.fl = fl;

        //generate distance and etd;    
        this.distance = this.calculateDistance();
        this.ete = this.distance / this.acft.cruiseSpeed / 0.514444444; // in seconds
        this.eta = new Date(this.atd.getTime() + this.ete * 1000);
    }

    /**
     * Method to calculate the orthodrome distance between 2 points on Earth 
     */
    calculateDistance() {
        return 2 * (EARTH_RADIUS + this.fl * 0.3041 * 100) * Math.asin(Math.sqrt(Math.pow(
        Math.sin((this.ades.lat * Math.PI / 180 - this.adep.lat * Math.PI / 180) / 2), 2) +
        Math.cos(this.adep.lat * Math.PI / 180) * Math.cos(this.ades.lat * Math.PI / 180) *
        Math.pow(Math.sin((this.ades.lng * Math.PI / 180 - this.adep.lng * Math.PI / 180) / 2), 2)));

    }

    /**
     * Method to delay the departure of the aircraft in order to solve conflicts
     * 
     * @param {number} dt number of seconds to delay the departure
     */

    delay(dt) {
        this.atd = new Date(this.atd.getTime() + dt * 1000);
        this.eta = new Date(this.atd.getTime() + this.ete * 1000);
    }
}