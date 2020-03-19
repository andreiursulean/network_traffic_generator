class Flight {
    constructor(ades, adep, atd, acft, fl) {
        this.ades = ades;
        this.adep = adep;
        this.atd = atd;
        this.acft = acft;
        this.fl = fl;

        //generate distance and etd;    
        this.distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(Math.pow(Math.sin((ades.lat * Math.PI / 180 - adep.lat * Math.PI / 180) / 2), 2) +
            Math.cos(adep.lat * Math.PI / 180) * Math.cos(ades.lat * Math.PI / 180) *
            Math.pow(Math.sin((ades.lng * Math.PI / 180 - adep.lng * Math.PI / 180) / 2), 2)));

        this.ete = this.distance / this.acft.cruiseSpeed / 0.514444444; // in seconds
        this.eta = new Date(this.atd.getTime() + this.ete * 1000);
    }
}