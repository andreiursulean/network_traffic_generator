class Flight {
    constructor(ades, adep, atd, acft, fl) {
        this.ades = ades;
        this.adep = adep;
        this.atd = atd;
        this.acft = acft;
        this.fl = fl;

        //generate distance and etd;    
        this.distance = 2 * (EARTH_RADIUS + this.fl * 0.3041) * Math.asin(Math.sqrt(Math.pow(Math.sin((this.ades.lat * Math.PI / 180 - this.adep.lat * Math.PI / 180) / 2), 2) +
        Math.cos(this.adep.lat * Math.PI / 180) * Math.cos(this.ades.lat * Math.PI / 180) *
        Math.pow(Math.sin((this.ades.lng * Math.PI / 180 - this.adep.lng * Math.PI / 180) / 2), 2)));

        this.ete = this.distance / this.acft.cruiseSpeed / 0.514444444; // in seconds
        this.eta = new Date(this.atd.getTime() + this.ete * 1000);
    }
}