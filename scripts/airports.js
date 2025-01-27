const airports = [
    {
        "name":"Henri Coanda International Airport",
        "city":"Bucharest", 
        "country":"Romania",
        "iata":"OTP",
        "icao":"LROP",
        "lat":44.5711111,
        "lng":26.085,
        "altitude":"314",
        "timezone":"2",
        "dst":"E"
    },
    {"name":"Sheremetyevo International Airport","city":"Moscow","country":"Russia","iata":"SVO","icao":"UUEE","lat":55.972599,"lng":37.4146,"altitude":"622","timezone":"3","dst":"N"},
    {"name":"Ataturk International Airport","city":"Istanbul","country":"Turkey","iata":"IST","icao":"LTBA","lat":"40.9768981934","lng":"28.814599990799998","altitude":"163","timezone":"3","dst":"E"},
    {"name":"Eleftherios Venizelos International Airport","city":"Athens","country":"Greece","iata":"ATH","icao":"LGAV","lat":37.9364013672,"lng":23.9444999695,"altitude":"308","timezone":"2","dst":"E"},
    {"name":"Vienna International Airport","city":"Vienna","country":"Austria","iata":"VIE","icao":"LOWW","lat":48.110298156738,"lng":16.569700241089,"altitude":"600","timezone":"1","dst":"E"},
    {"name":"Stockholm-Arlanda Airport","city":"Stockholm","country":"Sweden","iata":"ARN","icao":"ESSA","lat":59.651901245117,"lng":17.918600082397,"altitude":"137","timezone":"1","dst":"E"},
    {"name":"Oslo Gardermoen Airport","city":"Oslo","country":"Norway","iata":"OSL","icao":"ENGM","lat":60.193901062012,"lng":11.100399971008,"altitude":"681","timezone":"1","dst":"E"},
    {"name":"Copenhagen Kastrup Airport","city":"Copenhagen","country":"Denmark","iata":"CPH","icao":"EKCH","lat":55.617900848389,"lng":12.656000137329,"altitude":"17","timezone":"1","dst":"E"},
    {"name":"Leonardo da Vinci–Fiumicino Airport","city":"Rome","country":"Italy","iata":"FCO","icao":"LIRF","lat":41.8002778,"lng":12.2388889,"altitude":"13","timezone":"1","dst":"E"},
    {"name":"Malpensa International Airport","city":"Milano","country":"Italy","iata":"MXP","icao":"LIMC","lat":45.6306,"lng":8.72811,"altitude":"768","timezone":"1","dst":"E"},
    {"name":"Adolfo Suárez Madrid–Barajas Airport","city":"Madrid","country":"Spain","iata":"MAD","icao":"LEMD","lat":40.471926,"lng":-3.56264,"altitude":"1998","timezone":"1","dst":"E"},
    {"name":"Barcelona International Airport","city":"Barcelona","country":"Spain","iata":"BCN","icao":"LEBL","lat":41.297100067139,"lng":2.0784599781036,"altitude":"12","timezone":"1","dst":"E"},
    {"name":"Palma De Mallorca Airport","city":"Palma de Mallorca","country":"Spain","iata":"PMI","icao":"LEPA","lat":39.551700592,"lng":2.73881006241,"altitude":"27","timezone":"1","dst":"E"},
    {"name":"Zurich Airport","city":"Zurich","country":"Switzerland","iata":"ZRH","icao":"LSZH","lat":47.464698791504,"lng":8.5491695404053,"altitude":"1416","timezone":"1","dst":"E"},
    {"name":"Charles de Gaulle International Airport","city":"Paris","country":"France","iata":"CDG","icao":"LFPG","lat":49.0127983093,"lng":2.54999995232,"altitude":"392","timezone":"1","dst":"E"},
    {"name":"Brussels Airport","city":"Brussels","country":"Belgium","iata":"BRU","icao":"EBBR","lat":50.901401519800004,"lng":4.48443984985,"altitude":"184","timezone":"1","dst":"E"},
    {"name":"Amsterdam Airport Schiphol","city":"Amsterdam","country":"Netherlands","iata":"AMS","icao":"EHAM","lat":52.3086013794,"lng":4.763889789579999,"altitude":"-11","timezone":"1","dst":"E"},
    {"name":"Dublin Airport","city":"Dublin","country":"Ireland","iata":"DUB","icao":"EIDW","lat":53.42129898071289,"lng":-6.2700700759887695,"altitude":"242","timezone":"0","dst":"E"},
    {"name":"Manchester Airport","city":"Manchester","country":"United Kingdom","iata":"MAN","icao":"EGCC","lat":53.35369873046875,"lng":-2.2749500274658203,"altitude":"257","timezone":"0","dst":"E"},
    {"name":"London Heathrow Airport","city":"London","country":"United Kingdom","iata":"LHR","icao":"EGLL","lat":51.4706,"lng":-0.461941,"altitude":"83","timezone":"0","dst":"E"},
    {"name":"Dusseldorf International Airport","city":"Duesseldorf","country":"Germany","iata":"DUS","icao":"EDDL","lat":51.28950119018555,"lng":6.766779899597168,"altitude":"147","timezone":"1","dst":"E"},
    {"name":"Frankfurt am Main International Airport","city":"Frankfurt","country":"Germany","iata":"FRA","icao":"EDDF","lat":50.0333333,"lng":8.5705556,"altitude":"364","timezone":"1","dst":"E"},
    {"name":"Munich International Airport","city":"Munich","country":"Germany","iata":"MUC","icao":"EDDM","lat":48.353801727295,"lng":11.786100387573,"altitude":"1487","timezone":"1","dst":"E"}
];