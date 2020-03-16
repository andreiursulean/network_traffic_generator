 // TODO de impartit pe mai multe fisiere
 
 const aircraft = [ 
    // All cruise speeds are in knots 
    {
        "manufacturer":"Airbus",
        "typeDesignator":"A320",
        "model":"320",
        "cruiseSpeed":"454",
        "ceilingFL":"410"
    },
    {
        "manufacturer":"Boeing",
        "typeDesignator":"B741",
        "model":"747-100",
        "cruiseSpeed":"490",
        "cruiseFL":"450"
    },
    {
        "manufacturer":"Airbus",
        "typeDesignator":"A388",
        "model":"380-800",
        "cruiseSpeed":"567",
        "cruiseFL":"430"
    },
    {
        "manufacturer":"Boeing",
        "typeDesignator":"B738",
        "model":"737-800",
        "cruiseSpeed":"455",
        "cruiseFL":"410"
    }
];

const airports = [
    {"name":"Henri Coanda International Airport","city":"Bucharest","country":"Romania","iata":"OTP","icao":"LROP","latitude":"44.5711111","longitude":"26.085","altitude":"314","timezone":"2","dst":"E"},
    {"name":"Sheremetyevo International Airport","city":"Moscow","country":"Russia","iata":"SVO","icao":"UUEE","latitude":"55.972599","longitude":"37.4146","altitude":"622","timezone":"3","dst":"N"},
    {"name":"Ataturk International Airport","city":"Istanbul","country":"Turkey","iata":"IST","icao":"LTBA","latitude":"40.9768981934","longitude":"28.814599990799998","altitude":"163","timezone":"3","dst":"E"},
    {"name":"Eleftherios Venizelos International Airport","city":"Athens","country":"Greece","iata":"ATH","icao":"LGAV","latitude":"37.9364013672","longitude":"23.9444999695","altitude":"308","timezone":"2","dst":"E"},
    {"name":"Vienna International Airport","city":"Vienna","country":"Austria","iata":"VIE","icao":"LOWW","latitude":"48.110298156738","longitude":"16.569700241089","altitude":"600","timezone":"1","dst":"E"},
    {"name":"Stockholm-Arlanda Airport","city":"Stockholm","country":"Sweden","iata":"ARN","icao":"ESSA","latitude":"59.651901245117","longitude":"17.918600082397","altitude":"137","timezone":"1","dst":"E"},
    {"name":"Oslo Gardermoen Airport","city":"Oslo","country":"Norway","iata":"OSL","icao":"ENGM","latitude":"60.193901062012","longitude":"11.100399971008","altitude":"681","timezone":"1","dst":"E"},
    {"name":"Copenhagen Kastrup Airport","city":"Copenhagen","country":"Denmark","iata":"CPH","icao":"EKCH","latitude":"55.617900848389","longitude":"12.656000137329","altitude":"17","timezone":"1","dst":"E"},
    {"name":"Leonardo da Vinci–Fiumicino Airport","city":"Rome","country":"Italy","iata":"FCO","icao":"LIRF","latitude":"41.8002778","longitude":"12.2388889","altitude":"13","timezone":"1","dst":"E"},
    {"name":"Malpensa International Airport","city":"Milano","country":"Italy","iata":"MXP","icao":"LIMC","latitude":"45.6306","longitude":"8.72811","altitude":"768","timezone":"1","dst":"E"},
    {"name":"Adolfo Suárez Madrid–Barajas Airport","city":"Madrid","country":"Spain","iata":"MAD","icao":"LEMD","latitude":"40.471926","longitude":"-3.56264","altitude":"1998","timezone":"1","dst":"E"},
    {"name":"Barcelona International Airport","city":"Barcelona","country":"Spain","iata":"BCN","icao":"LEBL","latitude":"41.297100067139","longitude":"2.0784599781036","altitude":"12","timezone":"1","dst":"E"},
    {"name":"Palma De Mallorca Airport","city":"Palma de Mallorca","country":"Spain","iata":"PMI","icao":"LEPA","latitude":"39.551700592","longitude":"2.73881006241","altitude":"27","timezone":"1","dst":"E"},
    {"name":"Zurich Airport","city":"Zurich","country":"Switzerland","iata":"ZRH","icao":"LSZH","latitude":"47.464698791504","longitude":"8.5491695404053","altitude":"1416","timezone":"1","dst":"E"},
    {"name":"Charles de Gaulle International Airport","city":"Paris","country":"France","iata":"CDG","icao":"LFPG","latitude":"49.0127983093","longitude":"2.54999995232","altitude":"392","timezone":"1","dst":"E"},
    {"name":"Brussels Airport","city":"Brussels","country":"Belgium","iata":"BRU","icao":"EBBR","latitude":"50.901401519800004","longitude":"4.48443984985","altitude":"184","timezone":"1","dst":"E"},
    {"name":"Amsterdam Airport Schiphol","city":"Amsterdam","country":"Netherlands","iata":"AMS","icao":"EHAM","latitude":"52.3086013794","longitude":"4.763889789579999","altitude":"-11","timezone":"1","dst":"E"},
    {"name":"Dublin Airport","city":"Dublin","country":"Ireland","iata":"DUB","icao":"EIDW","latitude":"53.42129898071289","longitude":"-6.2700700759887695","altitude":"242","timezone":"0","dst":"E"},
    {"name":"Manchester Airport","city":"Manchester","country":"United Kingdom","iata":"MAN","icao":"EGCC","latitude":"53.35369873046875","longitude":"-2.2749500274658203","altitude":"257","timezone":"0","dst":"E"},
    {"name":"London Heathrow Airport","city":"London","country":"United Kingdom","iata":"LHR","icao":"EGLL","latitude":"51.4706","longitude":"-0.461941","altitude":"83","timezone":"0","dst":"E"},
    {"name":"Dusseldorf International Airport","city":"Duesseldorf","country":"Germany","iata":"DUS","icao":"EDDL","latitude":"51.28950119018555","longitude":"6.766779899597168","altitude":"147","timezone":"1","dst":"E"},
    {"name":"Frankfurt am Main International Airport","city":"Frankfurt","country":"Germany","iata":"FRA","icao":"EDDF","latitude":"50.0333333","longitude":"8.5705556","altitude":"364","timezone":"1","dst":"E"},
    {"name":"Munich International Airport","city":"Munich","country":"Germany","iata":"MUC","icao":"EDDM","latitude":"48.353801727295","longitude":"11.786100387573","altitude":"1487","timezone":"1","dst":"E"}
];

const eastboundFL = [
    110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 330, 370
];

const westboundFL = [
    120, 140, 160, 80, 200, 220, 240, 260, 280, 310, 350, 390
];

// CONSTANTS
const APRT_LENGTH = airports.length;
const ACFT_LENGTH = aircraft.length;
const FL_LENGTH = eastboundFL.length;
const EARTH_RADIUS = 6371000;