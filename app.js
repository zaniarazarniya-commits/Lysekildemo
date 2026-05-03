/* LYSEKILS GUIDE — PROTOTYP-LOGIK
   Demoprototyp med hårdkodad data. Bilder är Unsplash-platshållare;
   ska bytas mot kommunens egna foton. */

const IMG = {
    heroLysekil: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?w=1200&q=80',
    stangehuvud: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    pinneviken: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    kyrkan: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?w=1200&q=80',
    hamnen: 'https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=1200&q=80',
    sillens: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=1200&q=80',
    havets: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=1200&q=80',
    marknad: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    konsert: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80',
    hamnloppet: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1200&q=80',
    stadsvandring: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80',
    havstensund: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    fiskebackskil: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&q=80',
    havshotell: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    camping: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
    fiskbutik: 'https://images.unsplash.com/photo-1535392432937-a27c36ec07b5?w=1200&q=80',
    keramik: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=1200&q=80',
    deli: 'https://images.unsplash.com/photo-1488992783499-418eb1f62d08?w=1200&q=80',
    bryggancafe: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1200&q=80',
    hamnkrogen: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
    strandvillan: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    glasskiosk: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=1200&q=80',
    tuffTuff: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80',
    farjan: 'https://images.unsplash.com/photo-1444858345259-5c00a04e3403?w=1200&q=80',
    bilfarjan: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
    granitstory: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80',
    vitaHus: 'https://images.unsplash.com/photo-1572715167712-e6e5b5d8e8f4?w=1200&q=80'
};

const QUICK_TILES = [
    { id: 'events',  label: 'Evenemang',  icon: 'calendar',       page: 'events-list' },
    { id: 'eat',     label: 'Mat & fika', icon: 'utensils',       page: 'eat-list' },
    { id: 'hike',    label: 'Vandring',   icon: 'mountain',       page: 'hiking-list' },
    { id: 'sea',     label: 'Hav & bad',  icon: 'waves',          page: 'sea-list' },
    { id: 'stay',    label: 'Boende',     icon: 'bed',            page: 'stay-list' },
    { id: 'shops',   label: 'Butiker',    icon: 'shopping-bag',   page: 'shops-list' }
];

const EVENTS = [
    { id: 'sillens', title: 'Sillens dag', date: '14 juni', dateLong: 'Lördag 14 juni 2026 · 11:00–18:00', tag: 'Tradition', img: IMG.sillens, place: 'Södra Hamnen', short: 'Hela hamnen blir en saltad festival kring Bohusläns främsta råvara.', body: 'En heldag tillägnad sillen och dess plats i Lysekils historia. Från klockan 11 fylls Södra Hamnen med fiskare, kockar och musiker. Smaka olika inläggningar och se barnen lära sig fileta. Gratis entré.' },
    { id: 'havets', title: 'Havets dag', date: '5 juli', dateLong: 'Söndag 5 juli 2026 · 10:00–17:00', tag: 'Familj', img: IMG.havets, place: 'Havets Hus & Pinneviken', short: 'Marina experter, havslek och guidade turer i skärgården.', body: 'Havets Hus öppnar dörrarna gratis och bjuder på guidade turer i akvarierna. Vid Pinneviken finns stationer där barn kan håva småkryp, lära sig knopar och måla strandstenar.' },
    { id: 'marknad', title: 'Lysekils sommarmarknad', date: '12–13 juli', dateLong: 'Lördag–söndag 12–13 juli', tag: 'Marknad', img: IMG.marknad, place: 'Stora Torget', short: 'Lokala odlare, hantverkare och bagare fyller stadens torg.', body: 'Den traditionsenliga sommarmarknaden återvänder med över 60 utställare. Hantverk, närodlade grönsaker och hembakat. Live-musik från klockan 13.' },
    { id: 'konsert', title: 'Sommarkonsert i kyrkan', date: 'Tisdagar i juli', dateLong: 'Tisdagar i juli · 19:30', tag: 'Musik', img: IMG.konsert, place: 'Lysekils kyrka', short: 'Klassiska och folkliga toner i den 100-åriga kyrkan.', body: 'Lysekils kyrkomusiker tillsammans med inbjudna gäster ger fyra konserter under juli. Klassiskt, svensk vissång och nyskrivet. Insläpp 19:00, fri entré.' },
    { id: 'hamnloppet', title: 'Hamnloppet', date: '9 augusti', dateLong: 'Lördag 9 augusti · 10:00 (start)', tag: 'Idrott', img: IMG.hamnloppet, place: 'Start vid Stora Torget', short: '5 km eller 10 km längs hamnpromenaden och Stångehuvud.', body: 'Lysekils årliga löparlopp för alla nivåer. Två distanser, gemensam start vid torget. Banan följer havet och slutar vid gästhamnen.' },
    { id: 'hallbarhet', title: 'Hållbarhetsdagar', date: '5–7 september', dateLong: 'Fredag–söndag 5–7 september', tag: 'Samhälle', img: IMG.havets, place: 'Olika platser', short: 'Havsmiljö, klimatomställning och en marknad för secondhand.', body: 'Tre dagar med föredrag, vandringar med marinbiologer från Havets Hus, secondhandmarknad och workshops om kompostering, solel och hållbar matlagning.' }
];

const TIPS_BY_TIME = {
    morgon: [
        { tag: 'Promenad', title: 'Tidig vandring vid Stångehuvud', meta: '40 min · röda klippor i morgonljuset', img: IMG.stangehuvud, page: 'hike:stangehuvud' },
        { tag: 'Frukost', title: 'Fika på Bryggan Café', meta: 'Öppet från 08:00 · vid hamnen', img: IMG.bryggancafe, page: 'eat:bryggancafe' },
        { tag: 'Hav', title: 'Tag bilfärjan över Gullmarn', meta: 'Finnsbo → Skår · gratis · 5 min', img: IMG.bilfarjan, page: 'transit:ferry-car' }
    ],
    middag: [
        { tag: 'Bad', title: 'Pinneviken — sandig och lugn', meta: '15 min till fots · 17° i vattnet', img: IMG.pinneviken, page: 'beach:pinneviken' },
        { tag: 'Lunch', title: 'Lunch i Fiskebäckskil', meta: 'Tag personfärjan · 7 min över', img: IMG.fiskebackskil, page: 'transit:ferry-passenger' },
        { tag: 'Stad', title: 'Stadsvandring i Gamlestan', meta: '1 h · de vita träfasaderna', img: IMG.vitaHus, page: 'story:vitahus' }
    ],
    eftermiddag: [
        { tag: 'Glass', title: 'Glass på Hamnpiren', meta: 'Skum eller granit, du väljer', img: IMG.glasskiosk, page: 'eat:hamnglassen' },
        { tag: 'Hav', title: 'Tuff-tuff till Stångehuvud', meta: 'Avgår 14:00 från Stora Torget', img: IMG.tuffTuff, page: 'transit:tufftuff' },
        { tag: 'Marknad', title: 'Lokalt hantverk på Kungsgatan', meta: 'Bohuslänshantverk · keramik & textil', img: IMG.keramik, page: 'shop:bohuslanshantverk' }
    ],
    kvall: [
        { tag: 'Middag', title: 'Middag på Hamnkrogen', meta: 'Fisk & skaldjur · havsutsikt', img: IMG.hamnkrogen, page: 'eat:hamnkrogen' },
        { tag: 'Solnedgång', title: 'Stångehuvud i kvällsljus', meta: 'De röda klipporna i solnedgång', img: IMG.stangehuvud, page: 'beach:stangehuvud' },
        { tag: 'Musik', title: 'Sommarkonsert i kyrkan', meta: 'Tisdagar 19:30 · gratis', img: IMG.konsert, page: 'event:konsert' }
    ]
};

const STORIES = [
    { id: 'granit', kicker: 'Geologi', title: 'Varför är klipporna vid Stångehuvud röda?', excerpt: 'För 920 miljoner år sedan kristalliserade Bohusläns granit djupt nere i jordskorpan. Den röda färgen kommer från fältspat och järnoxid, slipad till en spegel av inlandsisen.', img: IMG.granitstory, body: 'Stångehuvuds slipade hällar är inget mindre än ett 920 miljoner år gammalt landskap. Bohusgraniten kristalliserade djupt nere i jordskorpan när Skandinavien fortfarande satt ihop med Nordamerika. Den röda nyansen kommer från kalifältspat och små inblandningar av järnoxid. När inlandsisen drog över för 12 000 år sedan slipades ytan slät som vatten. Det du går på idag är jordens äldsta vardagsrumsgolv. På Stångehuvuds naturreservat — invigt 1933 av Calla Curman — är klipporna fredade. Plocka ingen sten.' },
    { id: 'vitahus', kicker: 'Stadsbild', title: 'Skotts gata och Lysekils vita stenstad', excerpt: 'Den karakteristiska vita träfasaden uppstod när stenhuggeriet och fiskeriet gjorde Lysekil rikt på 1800-talet. Husen visar sin tid mer än sin smak.', img: IMG.vitaHus, body: 'Lysekil under sent 1800-tal var en stad i tillväxt. Stenhuggeriets export, sillfisket och dåtidens kurorter gjorde att husen växte snabbt — och alltid i samma uttryck. Vita träfasader, snickarglädje under takfoten och utsökt liggande panel. På Skotts gata, Kungsgatan och i Gamlestan står husen kvar. Idag är området riksintresse för kulturmiljövården.' }
];

const RESTAURANTS = [
    { id: 'hamnkrogen', cat: 'lunch', title: 'Hamnkrogen', dish: 'Fiskgryta med saffran och aioli', price: '125 kr', hours: '11–22', img: IMG.hamnkrogen, place: 'Södra Hamnen', phone: '0523-100 00', desc: 'Klassisk fiskkrog med uteservering vid gästhamnen. Egna kockar bär ut färsk fisk från båtarna.', access: true },
    { id: 'strandvillan', cat: 'a-la', title: 'Strandvillan', dish: 'Wallenbergare med ärtor och potatismos', price: '139 kr', hours: '17–23', img: IMG.strandvillan, place: 'Strandvägen 24', phone: '0523-100 01', desc: 'À la carte med fokus på närodlat. Vacker utsikt över Gullmarsfjorden från altanen.', access: true },
    { id: 'bryggancafe', cat: 'cafe', title: 'Bryggan Café', dish: 'Dagens pasta med räkor och dill', price: '110 kr', hours: '08–18', img: IMG.bryggancafe, place: 'Norra Hamngatan 4', phone: '0523-100 02', desc: 'Lysekils trivsammaste fika. Hembakade kanelbullar och Bohusläns bästa lattekonst.', access: false },
    { id: 'hamnglassen', cat: 'glass', title: 'Hamnpirens Glass', dish: 'Hemkärnad glass — skum, granit eller tång', price: '40 kr', hours: '11–21', img: IMG.glasskiosk, place: 'Pirhuvudet', phone: '0523-100 03', desc: 'Tre lokala smaker, nio internationella. Kön är alltid värd det.', access: true },
    { id: 'sjobod', cat: 'lunch', title: 'Sjöbodens Skaldjurskök', dish: 'Räksmörgås på rågbröd, halvt kilo räkor', price: '195 kr', hours: '11–20', img: IMG.fiskbutik, place: 'Gästhamnen', phone: '0523-100 04', desc: 'Skaldjur direkt från fiskbåten. Ingen meny, bara dagens fångst.', access: true }
];

const BEACHES = [
    { id: 'pinneviken', title: 'Pinneviken', desc: 'Sand och brygga. Tillgänglighetsanpassad ramp och toalett. Kiosk öppen i juni–augusti.', temp: 17, wind: '4 m/s SV', alg: 'gron', access: true, img: IMG.pinneviken, lat: 58.2728, lng: 11.4448, walking: '15 min till fots från torget', parkering: '40 platser, gratis', toalett: 'Säsong, vid kiosken' },
    { id: 'stangehuvud', title: 'Stångehuvud', desc: 'Klippbad i naturreservat, slipade röda graniter. Inga faciliteter, ta med vatten.', temp: 16, wind: '6 m/s SV', alg: 'gron', access: false, img: IMG.stangehuvud, lat: 58.2680, lng: 11.4250, walking: '25 min från torget', parkering: 'Vid Brevik, sedan promenad', toalett: 'Saknas — närmast i Brevik' },
    { id: 'havsbad', title: 'Havsbadsparken', desc: 'Centralt med brygga och hopptorn. Liv, rörelse och glasskiosk på sommaren.', temp: 17, wind: '4 m/s SV', alg: 'gul', access: true, img: IMG.hamnen, lat: 58.2800, lng: 11.4350, walking: '5 min från torget', parkering: 'Stora Torg P-hus', toalett: 'Året runt' },
    { id: 'finsbacks', title: 'Finsbäckens badplats', desc: 'Liten lokal badplats, sandstrand. Bra för småbarn med långgrunt vatten.', temp: 18, wind: '3 m/s S', alg: 'gron', access: false, img: IMG.pinneviken, lat: 58.2620, lng: 11.4500, walking: '10 min med bil', parkering: 'Liten parkering, gratis', toalett: 'Säsong' }
];

const HIKING = [
    { id: 'stangehuvud', title: 'Stångehuvud — Röda Graniter', dist: '3 km', diff: 'Lätt', time: '1 h', img: IMG.stangehuvud, desc: 'Rundtur genom Sveriges första kvinnoanlagda naturreservat. Slipade röda klippor och havsutsikt hela vägen.', body: 'Starten ligger vid Brevik. Följ blå markeringar längs kustlinjen. Stigen är bred och välhållen, men passerar några klippsteg som kräver bra skor. Stanna vid skyltarna om Calla Curman och reservatets historia.' },
    { id: 'kustled', title: 'Kustleden Lysekil–Fiskebäckskil', dist: '8 km', diff: 'Medel', time: '3 h', img: IMG.havstensund, desc: 'Längs Gullmarsfjordens västra strand. Ta personfärjan tillbaka från Fiskebäckskil.', body: 'Leden följer vandringsmärken i orange. Du passerar fiskelägen, betesmarker och små badbryggor. På sommaren går persontrafiken över fjorden var 30:e minut.' },
    { id: 'gamlestan', title: 'Stadsvandring Gamlestan', dist: '2 km', diff: 'Lätt', time: '1 h', img: IMG.stadsvandring, desc: 'Genom de vita kvarteren i Lysekils gamla stadsdel. Ledd vandring lördagar i juli från turistbyrån.', body: 'Pekar ut nio hus med skylt och berättelse. Stigen är platt och tillgänglighetsanpassad.' }
];

const SHOPS = [
    { id: 'saltbacken', title: 'Saltbacken', desc: 'Heminredning, design och hantverk — noga utvalda produkter för vackra hem. Designklassiker, nyheter och vardagliga bruksföremål samsas med möbler och vintage. Utför även inredningsuppdrag och styling inför försäljning.', meta: 'Kungstorget · Lysekil', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
    { id: 'fiskbutik', title: 'Lysekils Fisk & Skaldjur', desc: 'Färsk fisk direkt från båten. Räkor, kräftor och hummer i säsong.', meta: 'Hamnen · Mån–lör 09–17', img: IMG.fiskbutik },
    { id: 'bohuslanshantverk', title: 'Bohuslänshantverk', desc: 'Lokalt hantverk, keramik, textil. Verkstad öppnar bakom butiken.', meta: 'Kungsgatan 12 · Mån–fre 10–18', img: IMG.keramik },
    { id: 'kustensdeli', title: 'Kustens Deli', desc: 'Delikatesser, ost, chark och Bohusläns egna marmelader.', meta: 'Stora Torget 3 · Mån–lör 09–18', img: IMG.deli }
];

const STAYS = [
    { id: 'hotell', title: 'Hotell Lysekil', desc: 'Centralt med havsutsikt. Frukost ingår.', meta: 'Från 1 200 kr/natt', img: IMG.havshotell },
    { id: 'pinneviksc', title: 'Pinneviks Camping', desc: 'Familjevänlig vid havet. Badplats, lekplats, stugor.', meta: 'Från 350 kr/natt', img: IMG.camping },
    { id: 'gasthamn', title: 'Gästhamnen', desc: 'Båtplatser med el, vatten, dusch. Boka via SMS.', meta: 'Från 250 kr/natt', img: IMG.hamnen }
];

const POIS = [
    { id: 1, cat: 'eat', title: 'Hamnkrogen', desc: 'Fisk & skaldjur vid gästhamnen', meta: 'Öppet 11–22', lat: 58.2756, lng: 11.4406, img: IMG.hamnkrogen },
    { id: 2, cat: 'eat', title: 'Strandvillan', desc: 'Middag med havsutsikt', meta: 'Öppet 17–23', lat: 58.2780, lng: 11.4380, img: IMG.strandvillan },
    { id: 3, cat: 'eat', title: 'Bryggan Café', desc: 'Fika och lättare lunch', meta: 'Öppet 08–18', lat: 58.2765, lng: 11.4420, img: IMG.bryggancafe },
    { id: 10, cat: 'beach', title: 'Pinneviken', desc: 'Brygga och sandstrand. Tillgänglighetsanpassad.', meta: 'Vatten 17°C', lat: 58.2728, lng: 11.4448, img: IMG.pinneviken },
    { id: 11, cat: 'beach', title: 'Stångehuvud', desc: 'Klippbad i naturreservat. Röda graniter.', meta: 'Vatten 16°C', lat: 58.2680, lng: 11.4250, img: IMG.stangehuvud },
    { id: 12, cat: 'beach', title: 'Havsbadsparken', desc: 'Centralt brygga och hopptorn.', meta: 'Vatten 17°C', lat: 58.2800, lng: 11.4350, img: IMG.hamnen },
    { id: 20, cat: 'parking', title: 'Gästhamnsparkering', desc: 'Stor parkering vid hamnen', meta: '10 kr/tim', lat: 58.2750, lng: 11.4410 },
    { id: 21, cat: 'parking', title: 'Pinneviks P-plats', desc: 'Nära badplatsen', meta: 'Gratis', lat: 58.2725, lng: 11.4440 },
    { id: 22, cat: 'parking', title: 'Stora Torg P-hus', desc: 'Central parkering', meta: '15 kr/tim', lat: 58.2770, lng: 11.4390 },
    { id: 30, cat: 'charge', title: 'Gästhamnen Laddning', desc: '2 snabbladdare 50 kW', meta: '4 kr/kWh', lat: 58.2752, lng: 11.4408 },
    { id: 31, cat: 'charge', title: 'Preem Lysekil', desc: 'Snabbladdare vid E6', meta: '3,5 kr/kWh', lat: 58.2810, lng: 11.4320 },
    { id: 40, cat: 'toilet', title: 'Toalett Gästhamnen', desc: 'Tillgänglighetsanpassad', meta: 'Öppet 06–22', lat: 58.2758, lng: 11.4400 },
    { id: 41, cat: 'toilet', title: 'Toalett Pinneviken', desc: 'Säsongsöppen', meta: 'Öppet 08–20', lat: 58.2732, lng: 11.4445 },
    { id: 42, cat: 'toilet', title: 'Toalett Stora Torg', desc: 'Året runt', meta: 'Öppet 06–23', lat: 58.2772, lng: 11.4385 },
    { id: 50, cat: 'bus', title: 'Lysekil Resecentrum', desc: 'Huvudhållplats Västtrafik', meta: 'Linje 841, 842, 870', lat: 58.2785, lng: 11.4365 },
    { id: 51, cat: 'bus', title: 'Stora Torget', desc: 'Centrala hållplatsen', meta: 'Linje 841, 842', lat: 58.2768, lng: 11.4392 },
    { id: 60, cat: 'ferry', title: 'Personfärjan', desc: 'Lysekil till Fiskebäckskil', meta: 'Avgår var 30:e min', lat: 58.2748, lng: 11.4413, img: IMG.farjan },
    { id: 61, cat: 'ferry', title: 'Bilfärjan Finnsbo', desc: 'Finnsbo till Skår, gratis', meta: 'Avgår var 20:e min', lat: 58.2950, lng: 11.4880, img: IMG.bilfarjan }
];

const FILTERS = [
    { key: 'all', label: 'Allt', icon: 'layers' },
    { key: 'beach', label: 'Bad', icon: 'waves' },
    { key: 'eat', label: 'Äta', icon: 'utensils' },
    { key: 'parking', label: 'Parkering', icon: 'circle-parking' },
    { key: 'toilet', label: 'Toaletter', icon: 'toilet' },
    { key: 'charge', label: 'Laddning', icon: 'zap' },
    { key: 'bus', label: 'Buss', icon: 'bus' },
    { key: 'ferry', label: 'Färja', icon: 'ship' }
];

const POI_COLORS = { beach: '#1F4E5F', eat: '#A85D4A', parking: '#6B6B6B', toilet: '#7B8FA3', charge: '#3F5E3B', bus: '#C68A2E', ferry: '#1F4E5F' };
const POI_ICONS  = { beach: '🌊', eat: '🍽', parking: 'P', toilet: 'WC', charge: '⚡', bus: '🚌', ferry: '⚓' };

const EAT_FILTERS = [
    { key: 'all', label: 'Alla' },
    { key: 'lunch', label: 'Lunch idag' },
    { key: 'a-la', label: 'À la carte' },
    { key: 'cafe', label: 'Café & fika' },
    { key: 'glass', label: 'Glass' }
];

const REPORT_TYPES = [
    { key: 'belysning', label: 'Trasig belysning', icon: 'lamp-desk' },
    { key: 'klotter', label: 'Klotter eller skadegörelse', icon: 'spray-can' },
    { key: 'utrustning', label: 'Skadad lekutrustning', icon: 'tent-tree' },
    { key: 'trafik', label: 'Trafikfara', icon: 'triangle-alert' },
    { key: 'sopor', label: 'Nedskräpning', icon: 'trash-2' },
    { key: 'annat', label: 'Något annat', icon: 'message-square' }
];

const state = {
    currentTab: 'home',
    activeMapFilter: 'all',
    activeEatFilter: 'all',
    map: null,
    markers: [],
    pageStack: [],
    activePoi: null,
    report: { type: null, photo: false, location: 'Hämtad via GPS', desc: '', email: '' },
    settings: { textSize: 'normal', contrast: 'normal', motion: 'on', lang: 'sv', accessFilter: false }
};

const $ = (id) => document.getElementById(id);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };

const fmtDate = (d = new Date()) => {
    const days = ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'];
    const months = ['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
    return days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()];
};

const timeOfDayKey = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 11)  return 'morgon';
    if (h >= 11 && h < 16) return 'middag';
    if (h >= 16 && h < 20) return 'eftermiddag';
    return 'kvall';
};

const tipsTitleByTime = () => ({ morgon: 'Tre tips för morgonen', middag: 'Tre tips just nu', eftermiddag: 'Tre tips för eftermiddagen', kvall: 'Tre tips för kvällen' }[timeOfDayKey()]);
const heroTitleByTime = () => ({ morgon: 'God morgon, Lysekil', middag: 'Klart hav, fri sikt', eftermiddag: 'Solen står lågt', kvall: 'Kvällen mörknar mjukt' }[timeOfDayKey()]);

function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2400);
}

function refreshIcons() { if (window.lucide) lucide.createIcons(); }

function initSplash() {
    setTimeout(() => {
        $('splash').classList.add('hidden');
        $('app').classList.remove('hidden');
    }, 1800);
}

function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
}

function switchTab(tab) {
    if (state.pageStack.length) closeAllSubPages();
    state.currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    $('tab-' + tab).classList.add('active');
    $('content-area').scrollTo({ top: 0, behavior: 'instant' });
    if (tab === 'map' && !state.map) setTimeout(initMap, 60);
    if (tab === 'map' && state.map) setTimeout(() => state.map.invalidateSize(), 60);
    refreshIcons();
}

function renderHome() {
    $('hero-title').textContent = heroTitleByTime();
    $('hero-date').textContent = fmtDate();
    $('home-hero').style.backgroundImage = "url('" + IMG.heroLysekil + "')";

    const live = $('live-row');
    live.innerHTML = '';
    const chips = [
        { icon: '☀️', label: 'Väder',     value: '22°',    action: () => toast('Klart och 22°, lätt vind') },
        { icon: '🌊', label: 'Bad',        value: '17°',    action: () => switchTab('sea') },
        { icon: '⚓', label: 'Färjan',     value: '8 min',  action: () => switchTab('transit') },
        { icon: '💨', label: 'Vind',       value: '4 m/s',  action: () => toast('4 m/s SV — bra för klippbad') },
        { icon: '🅿️', label: 'Parkering', value: 'Lediga', action: () => openSubPage('service') }
    ];
    chips.forEach(c => {
        const b = el('button', 'live-chip');
        b.setAttribute('role', 'listitem');
        b.innerHTML = '<span class="live-chip-icon" aria-hidden="true">' + c.icon + '</span><span>' + c.label + '</span><span class="live-chip-value">' + c.value + '</span>';
        b.onclick = c.action;
        live.appendChild(b);
    });

    const grid = $('quick-grid');
    grid.innerHTML = '';
    QUICK_TILES.forEach((t, i) => {
        const isAlt = (i + Math.floor(i / 2)) % 2 === 1;
        const b = el('button', 'quick-tile' + (isAlt ? ' alt' : ''));
        b.innerHTML = '<span class="quick-tile-icon"><i data-lucide="' + t.icon + '"></i></span><span class="quick-tile-label">' + t.label + '</span>';
        b.onclick = () => t.tab ? switchTab(t.tab) : openSubPage(t.page);
        grid.appendChild(b);
    });

    const events = $('events-scroll');
    events.innerHTML = '';
    EVENTS.slice(0, 5).forEach(ev => {
        const c = el('button', 'event-card');
        c.innerHTML = '<div class="event-card-image" style="background-image:url(\'' + ev.img + '\')"><span class="event-card-tag">' + ev.tag + '</span></div><div class="event-card-body"><div class="event-card-date">' + ev.date + '</div><h3 class="event-card-title">' + ev.title + '</h3><p class="event-card-desc">' + ev.short + '</p></div>';
        c.onclick = () => openSubPage('event:' + ev.id);
        events.appendChild(c);
    });

    $('tips-title').textContent = tipsTitleByTime();
    const tips = $('tips-stack');
    tips.innerHTML = '';
    TIPS_BY_TIME[timeOfDayKey()].forEach(t => {
        const c = el('button', 'tip-card');
        c.innerHTML = '<div class="tip-card-image" style="background-image:url(\'' + t.img + '\')"></div><div class="tip-card-body"><div class="tip-card-tag">' + t.tag + '</div><div class="tip-card-title">' + t.title + '</div><div class="tip-card-meta">' + t.meta + '</div></div>';
        c.onclick = () => t.tab ? switchTab(t.tab) : openSubPage(t.page);
        tips.appendChild(c);
    });

    const stories = $('stories-stack');
    stories.innerHTML = '';
    STORIES.forEach(s => {
        const c = el('button', 'story-card');
        c.innerHTML = '<div class="story-card-image" style="background-image:url(\'' + s.img + '\')"></div><div class="story-card-body"><div class="story-card-kicker">' + s.kicker + '</div><h3 class="story-card-title">' + s.title + '</h3><p class="story-card-excerpt">' + s.excerpt + '</p></div>';
        c.onclick = () => openSubPage('story:' + s.id);
        stories.appendChild(c);
    });

    refreshIcons();
}

function initMap() {
    const fr = $('filter-row');
    fr.innerHTML = '';
    FILTERS.forEach(f => {
        const b = el('button', 'filter-chip' + (f.key === state.activeMapFilter ? ' active' : ''));
        b.dataset.filter = f.key;
        b.innerHTML = '<i data-lucide="' + f.icon + '"></i><span>' + f.label + '</span>';
        b.onclick = () => {
            state.activeMapFilter = f.key;
            document.querySelectorAll('#filter-row .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.filter === f.key));
            renderMarkers();
        };
        fr.appendChild(b);
    });

    state.map = L.map('map', { zoomControl: false }).setView([58.275, 11.440], 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap & CARTO',
        maxZoom: 19
    }).addTo(state.map);
    L.control.zoom({ position: 'topright' }).addTo(state.map);
    renderMarkers();
    refreshIcons();
}

function renderMarkers() {
    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];
    const items = state.activeMapFilter === 'all'
        ? POIS.filter(p => ['beach','eat','parking','toilet','charge','bus','ferry'].includes(p.cat))
        : POIS.filter(p => p.cat === state.activeMapFilter);
    items.forEach(p => {
        const html = '<div class="custom-marker" style="background:' + POI_COLORS[p.cat] + '"><span>' + POI_ICONS[p.cat] + '</span></div>';
        const ic = L.divIcon({ html: html, className: '', iconSize: [36, 36], iconAnchor: [18, 36] });
        const m = L.marker([p.lat, p.lng], { icon: ic }).addTo(state.map);
        m.on('click', () => openPoi(p));
        state.markers.push(m);
    });
}

function locateMe() {
    if (!navigator.geolocation) return toast('Plats stöds inte i denna webbläsare');
    navigator.geolocation.getCurrentPosition(
        pos => state.map.setView([pos.coords.latitude, pos.coords.longitude], 15),
        () => toast('Kunde inte hämta plats')
    );
}

function openPoi(poi) {
    state.activePoi = poi;
    const labels = { beach: 'Bad', eat: 'Äta', parking: 'Parkering', toilet: 'Toalett', charge: 'Laddstation', bus: 'Buss', ferry: 'Färja' };
    $('poi-tag').textContent = labels[poi.cat] || '';
    $('poi-title').textContent = poi.title;
    $('poi-desc').textContent = poi.desc;
    const img = $('poi-image');
    if (poi.img) { img.style.backgroundImage = "url('" + poi.img + "')"; img.style.display = ''; }
    else img.style.display = 'none';
    const meta = $('poi-meta');
    meta.innerHTML = '';
    if (poi.meta) meta.innerHTML += '<div class="poi-meta-item"><div class="poi-meta-label">Information</div><div class="poi-meta-value">' + poi.meta + '</div></div>';
    if (poi.cat === 'beach') meta.innerHTML += '<div class="poi-meta-item"><div class="poi-meta-label">Tillgänglighet</div><div class="poi-meta-value">' + (poi.id === 11 ? 'Klippstig' : 'Anpassad') + '</div></div>';
    $('poi-sheet').classList.add('open');
    refreshIcons();
}

function closePoi()      { $('poi-sheet').classList.remove('open'); state.activePoi = null; }
function poiDirections() { toast('Öppnar vägbeskrivning...'); }
function poiCall()       { toast('Ringer numret'); }
function poiSave()       { toast('Sparad i Mina platser'); }

function renderEat() {
    const fr = $('eat-filter');
    fr.innerHTML = '';
    EAT_FILTERS.forEach(f => {
        const b = el('button', 'filter-chip' + (f.key === state.activeEatFilter ? ' active' : ''));
        b.dataset.filter = f.key;
        b.innerHTML = '<span>' + f.label + '</span>';
        b.onclick = () => { state.activeEatFilter = f.key; renderEat(); };
        fr.appendChild(b);
    });
    const list = $('eat-list');
    let items;
    if (state.activeEatFilter === 'all') items = RESTAURANTS;
    else items = RESTAURANTS.filter(r => r.cat === state.activeEatFilter);
    list.innerHTML = '';
    items.forEach(r => {
        const c = el('button', 'list-card');
        const access = r.access ? '<span class="access-badge"><i data-lucide="accessibility" style="width:12px;height:12px;"></i> Tillgänglig</span>' : '';
        const kicker = r.cat === 'lunch' ? '<div class="list-card-kicker">Dagens lunch</div>' : '';
        const desc = r.cat === 'lunch' ? r.dish : r.desc;
        const price = r.cat === 'lunch' ? '<span><strong>' + r.price + '</strong></span>' : '';
        c.innerHTML = '<div class="list-card-image" style="background-image:url(\'' + r.img + '\')"></div><div class="list-card-body">' + kicker + '<div class="list-card-title">' + r.title + '</div><div class="list-card-desc">' + desc + '</div><div class="list-card-meta">' + price + '<span>' + r.hours + '</span>' + access + '</div></div>';
        c.onclick = () => openSubPage('eat:' + r.id);
        list.appendChild(c);
    });
    refreshIcons();
}

function renderSea() {
    const best = BEACHES.slice().sort((a, b) => b.temp - a.temp)[0];
    const bestEl = $('best-beach');
    bestEl.innerHTML = '<button class="list-card" style="margin-bottom:0;"><div class="list-card-image" style="background-image:url(\'' + best.img + '\')"></div><div class="list-card-body"><div class="list-card-kicker">Auto-rekommendation</div><div class="list-card-title">' + best.title + '</div><div class="list-card-desc">Varmast just nu och lugn vind. ' + (best.access ? 'Tillgänglighetsanpassad.' : '') + '</div><div class="list-card-meta"><span class="beach-temp">' + best.temp + '<small>°C</small></span><span class="alg-flag ' + best.alg + '">' + (best.alg === 'gron' ? 'Algfritt' : 'Varning') + '</span></div></div></button>';
    bestEl.querySelector('button').onclick = () => openSubPage('beach:' + best.id);

    const list = $('beach-list');
    list.innerHTML = '';
    BEACHES.forEach(b => {
        const c = el('button', 'list-card');
        const access = b.access ? '<span class="access-badge"><i data-lucide="accessibility" style="width:12px;height:12px;"></i> Anpassad</span>' : '';
        const algLabel = b.alg === 'gron' ? 'Algfritt' : (b.alg === 'gul' ? 'Varning' : 'Stängt');
        c.innerHTML = '<div class="list-card-image" style="background-image:url(\'' + b.img + '\')"></div><div class="list-card-body"><div class="list-card-title">' + b.title + '</div><div class="list-card-desc">' + b.desc + '</div><div class="list-card-meta"><span class="beach-temp">' + b.temp + '<small>°C</small></span><span>' + b.wind + '</span><span class="alg-flag ' + b.alg + '">' + algLabel + '</span>' + access + '</div></div>';
        c.onclick = () => openSubPage('beach:' + b.id);
        list.appendChild(c);
    });
    refreshIcons();
}

function renderTransit() {
    const now = new Date();
    const minsUntil = 15 - (now.getMinutes() % 15) || 15;
    const nextHour = now.getHours();
    const nextMin = Math.ceil(now.getMinutes() / 15) * 15;
    const depH = nextMin >= 60 ? nextHour + 1 : nextHour;
    const depM = nextMin >= 60 ? nextMin - 60 : nextMin;
    const depStr = String(depH).padStart(2,'0') + ':' + String(depM).padStart(2,'0');
    $('transit-hero-time').innerHTML = minsUntil + '<small>min</small>';
    $('transit-hero-meta').textContent = 'Avgår ' + depStr + ' från Södra Hamnen';

    const list = $('transit-list');
    list.innerHTML = '';
    const cards = [
        { title: 'Personfärjan Lysekil ↔ Fiskebäckskil', sub: 'Avgår från Södra Hamnen · 7 min över', icon: 'ship', times: ['14:30','15:00','15:30'], actions: [{label:'Påminn 10 min innan',primary:true,run:()=>toast('Du får en notis 10 min innan avgång')},{label:'Hela tidtabellen',run:()=>openSubPage('transit:ferry-passenger')}] },
        { title: 'Bilfärjan Finnsbo ↔ Skår', sub: 'Gratis · 5 min över Gullmarsfjorden', icon: 'car', times: ['14:25','14:45','15:05'], actions: [{label:'Hela tidtabellen',primary:true,run:()=>openSubPage('transit:ferry-car')},{label:'Visa kö-prognos',run:()=>toast('Lugn kö just nu — 0–5 min väntan')}] },
        { title: 'Tuff-tuff-tåget', sub: 'Sommartid juni–augusti · 25 min runt staden', icon: 'train-front', times: ['12:00','13:00','14:00'], actions: [{label:'Linje & stopp',primary:true,run:()=>openSubPage('transit:tufftuff')},{label:'Pris 60 kr',run:()=>toast('Biljett ombord eller på turistbyrån')}] },
        { title: 'Bussar (Västtrafik)', sub: 'Stora Torget · linje 841 mot Uddevalla, 870 mot Smögen', icon: 'bus', times: ['14:18','14:48','15:18'], actions: [{label:'Öppna Västtrafik',primary:true,run:()=>toast('Öppnar Västtrafik')},{label:'Alla hållplatser',run:()=>openSubPage('transit:bus')}] },
        { title: 'Taxi Lysekil', sub: 'Beställ direkt på telefon, dygnet runt', icon: 'taxi', times: null, actions: [{label:'Ring 0523-141 41',primary:true,run:()=>toast('Ringer Taxi Lysekil — 0523-141 41')}] }
    ];
    cards.forEach(c => {
        const node = el('div', 'transit-card');
        const timesHtml = c.times ? '<div class="transit-times"><div class="transit-time next">' + c.times[0] + '</div><div class="transit-time">' + c.times[1] + '</div><div class="transit-time">' + c.times[2] + '</div></div>' : '';
        node.innerHTML = '<div class="transit-card-head"><span class="transit-card-icon"><i data-lucide="' + c.icon + '"></i></span><div><div class="transit-card-title">' + c.title + '</div><div class="transit-card-sub">' + c.sub + '</div></div></div>' + timesHtml + '<div class="transit-actions"></div>';
        const actions = node.querySelector('.transit-actions');
        c.actions.forEach(a => {
            const b = el('button', 'btn' + (a.primary ? '' : ' secondary'));
            b.style.flex = '1 1 auto';
            b.textContent = a.label;
            b.onclick = a.run;
            actions.appendChild(b);
        });
        list.appendChild(node);
    });
    refreshIcons();
}

const SUB_TITLES = {
    'events-list': 'Evenemang', 'hiking-list': 'Vandring', 'shops-list': 'Butiker',
    'eat-list': 'Mat & fika', 'sea-list': 'Hav & bad',
    'stay-list': 'Boende', 'report': 'Felanmälan', 'service': 'Service',
    'healthcare': 'Vård & apotek', 'waste': 'Sophämtning', 'accessibility': 'Tillgänglighet',
    'settings': 'Inställningar', 'about': 'Om appen'
};
function subPageTitle(routeId) {
    if (SUB_TITLES[routeId]) return SUB_TITLES[routeId];
    const [type] = routeId.split(':');
    return { event:'Evenemang', hike:'Vandring', shop:'Butiker', stay:'Boende',
             beach:'Badplats', eat:'Restaurang', story:'Berättelse', transit:'Tidtabell',
             'report-step':'Felanmälan', 'report-success':'Bekräftelse' }[type] || 'Lysekil';
}

let _histLock = false;

function _showSubPageUI(routeId) {
    renderSubPage(routeId);
    $('sub-page').classList.add('open');
    $('sub-page').setAttribute('aria-hidden', 'false');
    $('back-btn').classList.remove('hidden');
    $('home-btn').classList.remove('hidden');
    $('header-title').textContent = subPageTitle(routeId);
}

function _hideSubPageUI() {
    $('sub-page').classList.remove('open');
    $('sub-page').setAttribute('aria-hidden', 'true');
    $('back-btn').classList.add('hidden');
    $('home-btn').classList.add('hidden');
    $('header-title').textContent = 'Lysekil';
}

function openSubPage(routeId) {
    state.pageStack.push(routeId);
    history.pushState({ lysGuide: true, route: routeId }, '');
    _showSubPageUI(routeId);
}

function goBack() {
    if (!state.pageStack.length) return;
    state.pageStack.pop();
    _histLock = true;
    history.back();
    setTimeout(() => { _histLock = false; }, 80);
    if (state.pageStack.length === 0) {
        _hideSubPageUI();
    } else {
        const prev = state.pageStack[state.pageStack.length - 1];
        renderSubPage(prev);
        $('header-title').textContent = subPageTitle(prev);
    }
}

function closeAllSubPages() {
    const depth = state.pageStack.length;
    if (!depth) return;
    _histLock = true;
    history.go(-depth);
    setTimeout(() => { _histLock = false; }, 200);
    state.pageStack = [];
    _hideSubPageUI();
}

function goHome() {
    closeAllSubPages();
    switchTab('home');
}

function toggleNavDrawer() {
    const drawer = $('nav-drawer');
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
        drawer.classList.remove('open');
    } else {
        const active = document.querySelector('.nav-drawer-item.active');
        if (active) active.classList.remove('active');
        const cur = document.querySelector('.nav-drawer-item[data-tab="' + state.currentTab + '"]');
        if (cur) cur.classList.add('active');
        drawer.classList.add('open');
    }
}

function navDrawerGo(tab) {
    $('nav-drawer').classList.remove('open');
    closeAllSubPages();
    switchTab(tab);
}

document.addEventListener('click', e => {
    const drawer = $('nav-drawer');
    if (drawer && drawer.classList.contains('open')) {
        if (!drawer.contains(e.target) && e.target.id !== 'nav-menu-btn' && !$('nav-menu-btn').contains(e.target)) {
            drawer.classList.remove('open');
        }
    }
});

window.addEventListener('popstate', () => {
    if (_histLock) return;
    if (state.pageStack.length > 0) {
        state.pageStack.pop();
        if (state.pageStack.length === 0) {
            _hideSubPageUI();
        } else {
            const prev = state.pageStack[state.pageStack.length - 1];
            renderSubPage(prev);
            $('header-title').textContent = subPageTitle(prev);
        }
    }
});

function subHeader(title, kicker, img) {
    const k = kicker ? '<div class="sub-kicker">' + kicker + '</div>' : '';
    return '<div class="sub-page-header-img" style="background-image:url(\'' + (img || IMG.heroLysekil) + '\')"><div class="sub-page-title-wrap">' + k + '<h1 class="sub-title">' + title + '</h1></div></div>';
}

function listPage(title, kicker, headerImg, listHtml) {
    return subHeader(title, kicker, headerImg) + '<div class="sub-page-body">' + listHtml + '</div>';
}

function subDetailSimple(title, kicker, img, body) {
    return subHeader(title, kicker, img) + '<div class="sub-page-body"><p class="sub-paragraph">' + body + '</p></div>';
}

function renderSubPage(routeId) {
    const c = $('sub-page-content');
    c.scrollTop = 0;
    const parts = routeId.includes(':') ? routeId.split(':') : [routeId, null];
    const type = parts[0];
    const id = parts[1];

    if (routeId === 'sea-list') {
        const best = BEACHES.slice().sort((a, b) => b.temp - a.temp)[0];
        const html = BEACHES.map(b => {
            const access = b.access ? '<span class="access-badge"><i data-lucide="accessibility" style="width:12px;height:12px;"></i> Anpassad</span>' : '';
            const algLabel = b.alg === 'gron' ? 'Algfritt' : (b.alg === 'gul' ? 'Varning' : 'Stängt');
            const kicker = b.id === best.id ? '<div class="list-card-kicker">Varmast just nu</div>' : '';
            return '<button class="list-card" onclick="openSubPage(\'beach:' + b.id + '\')"><div class="list-card-image" style="background-image:url(\'' + b.img + '\')"></div><div class="list-card-body">' + kicker + '<div class="list-card-title">' + b.title + '</div><div class="list-card-desc">' + b.desc + '</div><div class="list-card-meta"><span class="beach-temp">' + b.temp + '<small>°C</small></span><span>' + b.wind + '</span><span class="alg-flag ' + b.alg + '">' + algLabel + '</span>' + access + '</div></div></button>';
        }).join('');
        c.innerHTML = listPage('Hav & bad', 'Badplatser i Lysekil', IMG.pinneviken, html);
        refreshIcons(); return;
    }

    if (routeId === 'eat-list') {
        const html = RESTAURANTS.map(r => {
            const kicker = r.cat === 'lunch' ? '<div class="list-card-kicker">Dagens lunch</div>' : (r.cat === 'cafe' ? '<div class="list-card-kicker">Café & fika</div>' : (r.cat === 'glass' ? '<div class="list-card-kicker">Glass</div>' : ''));
            const desc = r.cat === 'lunch' ? r.dish : r.desc;
            const price = r.cat === 'lunch' ? '<span><strong>' + r.price + '</strong></span>' : '';
            return '<button class="list-card" onclick="openSubPage(\'eat:' + r.id + '\')"><div class="list-card-image" style="background-image:url(\'' + r.img + '\')"></div><div class="list-card-body">' + kicker + '<div class="list-card-title">' + r.title + '</div><div class="list-card-desc">' + desc + '</div><div class="list-card-meta">' + price + '<span>' + r.hours + '</span></div></div></button>';
        }).join('');
        c.innerHTML = listPage('Mat & fika', 'Äta i Lysekil', IMG.hamnkrogen, html);
        refreshIcons(); return;
    }

    if (routeId === 'events-list') {
        const html = EVENTS.map(ev => '<button class="list-card" onclick="openSubPage(\'event:' + ev.id + '\')"><div class="list-card-image" style="background-image:url(\'' + ev.img + '\')"></div><div class="list-card-body"><div class="list-card-kicker">' + ev.date + '</div><div class="list-card-title">' + ev.title + '</div><div class="list-card-desc">' + ev.short + '</div><div class="list-card-meta"><span>' + ev.place + '</span></div></div></button>').join('');
        c.innerHTML = listPage('Evenemang', 'Vad händer i Lysekil', IMG.marknad, html);
        refreshIcons(); return;
    }
    if (type === 'event') { c.innerHTML = renderEvent(EVENTS.find(e => e.id === id)); refreshIcons(); return; }

    if (routeId === 'hiking-list') {
        const html = HIKING.map(h => '<button class="list-card" onclick="openSubPage(\'hike:' + h.id + '\')"><div class="list-card-image" style="background-image:url(\'' + h.img + '\')"></div><div class="list-card-body"><div class="list-card-title">' + h.title + '</div><div class="list-card-desc">' + h.desc + '</div><div class="list-card-meta"><span><strong>' + h.dist + '</strong></span><span>' + h.diff + '</span><span>' + h.time + '</span></div></div></button>').join('');
        c.innerHTML = listPage('Vandring & natur', 'Stigar runt Lysekil', IMG.stangehuvud, html);
        refreshIcons(); return;
    }
    if (type === 'hike') { c.innerHTML = renderHike(HIKING.find(h => h.id === id)); refreshIcons(); return; }

    if (routeId === 'shops-list') {
        const html = SHOPS.map(s => '<button class="list-card" onclick="openSubPage(\'shop:' + s.id + '\')"><div class="list-card-image" style="background-image:url(\'' + s.img + '\')"></div><div class="list-card-body"><div class="list-card-title">' + s.title + '</div><div class="list-card-desc">' + s.desc + '</div><div class="list-card-meta"><span>' + s.meta + '</span></div></div></button>').join('');
        c.innerHTML = listPage('Butiker & hantverk', 'Lokala näringsidkare', IMG.keramik, html);
        refreshIcons(); return;
    }
    if (type === 'shop') {
        const s = SHOPS.find(x => x.id === id);
        c.innerHTML = subDetailSimple(s.title, s.meta, s.img, s.desc);
        refreshIcons(); return;
    }

    if (routeId === 'stay-list') {
        const html = STAYS.map(s => '<button class="list-card" onclick="openSubPage(\'stay:' + s.id + '\')"><div class="list-card-image" style="background-image:url(\'' + s.img + '\')"></div><div class="list-card-body"><div class="list-card-title">' + s.title + '</div><div class="list-card-desc">' + s.desc + '</div><div class="list-card-meta"><span>' + s.meta + '</span></div></div></button>').join('');
        c.innerHTML = listPage('Boende', 'Hotell, camping och stugor', IMG.havshotell, html);
        refreshIcons(); return;
    }
    if (type === 'stay') {
        const s = STAYS.find(x => x.id === id);
        c.innerHTML = subDetailSimple(s.title, s.meta, s.img, s.desc);
        refreshIcons(); return;
    }

    if (type === 'beach') { c.innerHTML = renderBeach(BEACHES.find(b => b.id === id)); refreshIcons(); return; }
    if (type === 'eat')   { c.innerHTML = renderRestaurant(RESTAURANTS.find(r => r.id === id)); refreshIcons(); return; }
    if (type === 'story') { c.innerHTML = renderStory(STORIES.find(s => s.id === id)); refreshIcons(); return; }

    if (routeId === 'service')       { c.innerHTML = renderService();       refreshIcons(); return; }
    if (routeId === 'healthcare')    { c.innerHTML = renderHealthcare();    refreshIcons(); return; }
    if (routeId === 'waste')         { c.innerHTML = renderWaste();         refreshIcons(); return; }
    if (routeId === 'accessibility') { c.innerHTML = renderAccessibility(); refreshIcons(); return; }
    if (routeId === 'settings')      { c.innerHTML = renderSettings();      refreshIcons(); return; }
    if (routeId === 'about')         { c.innerHTML = renderAbout();         refreshIcons(); return; }

    if (routeId === 'report') { state.report = { type: null, photo: false, location: { lat: 58.2756, lng: 11.4406 }, desc: '', email: '' }; $('header-title').textContent = 'Felanmälan'; renderReport(1); return; }
    if (type === 'report-step') { renderReport(parseInt(id)); return; }
    if (type === 'report-success') { renderReportSuccess(id); return; }

    if (type === 'transit') { c.innerHTML = renderTransitDetail(id); refreshIcons(); return; }

    c.innerHTML = subDetailSimple('Sida saknas', '', '', 'Den här sidan finns inte i prototypen ännu.');
    refreshIcons();
}

function renderEvent(ev) {
    if (!ev) return subDetailSimple('Hittades inte', '', '', '');
    return subHeader(ev.title, ev.tag, ev.img) +
        '<div class="sub-page-body"><div class="sub-meta-grid"><div class="sub-meta-card"><div class="sub-meta-card-label">När</div><div class="sub-meta-card-value">' + ev.dateLong + '</div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Var</div><div class="sub-meta-card-value">' + ev.place + '</div></div></div><p class="sub-paragraph">' + ev.body + '</p><div class="cta-stack"><button class="btn full" onclick="toast(\'Sparad i din kalender\')"><i data-lucide="calendar-plus"></i> Lägg i min kalender</button><button class="btn full secondary" onclick="toast(\'Påminnelse aktiverad\')"><i data-lucide="bell"></i> Påminn mig dagen innan</button></div></div>';
}

function renderHike(h) {
    if (!h) return subDetailSimple('Hittades inte', '', '', '');
    return subHeader(h.title, 'Vandring', h.img) +
        '<div class="sub-page-body"><div class="sub-meta-grid"><div class="sub-meta-card"><div class="sub-meta-card-label">Längd</div><div class="sub-meta-card-value">' + h.dist + '</div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Tid</div><div class="sub-meta-card-value">' + h.time + '</div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Svårighet</div><div class="sub-meta-card-value">' + h.diff + '</div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Underlag</div><div class="sub-meta-card-value">Stig & klipp</div></div></div><p class="sub-paragraph">' + h.body + '</p><div class="cta-stack"><button class="btn full" onclick="toast(\'Karta nedladdad för offline\')"><i data-lucide="download"></i> Ladda ned offline-karta</button><button class="btn full secondary" onclick="toast(\'Öppnar vägbeskrivning till start\')"><i data-lucide="navigation"></i> Vägbeskrivning till start</button></div></div>';
}

function renderBeach(b) {
    if (!b) return subDetailSimple('Hittades inte', '', '', '');
    const algLabel = b.alg === 'gron' ? 'Inget alarm' : (b.alg === 'gul' ? 'Varning' : 'Stängt');
    return subHeader(b.title, 'Badplats', b.img) +
        '<div class="sub-page-body"><div class="sub-meta-grid"><div class="sub-meta-card"><div class="sub-meta-card-label">Vatten</div><div class="sub-meta-card-value">' + b.temp + '°C</div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Vind</div><div class="sub-meta-card-value">' + b.wind + '</div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Algvarning</div><div class="sub-meta-card-value"><span class="alg-flag ' + b.alg + '">' + algLabel + '</span></div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Tillgänglighet</div><div class="sub-meta-card-value">' + (b.access ? 'Anpassad' : 'Klippstig') + '</div></div></div><p class="sub-paragraph">' + b.desc + '</p><h3 class="sub-h3">Hitta hit</h3><div class="info-row"><div class="info-row-icon"><i data-lucide="footprints"></i></div><div class="info-row-text"><div class="info-row-label">Promenad</div><div class="info-row-value">' + b.walking + '</div></div></div><div class="info-row"><div class="info-row-icon"><i data-lucide="circle-parking"></i></div><div class="info-row-text"><div class="info-row-label">Parkering</div><div class="info-row-value">' + b.parkering + '</div></div></div><div class="info-row"><div class="info-row-icon"><i data-lucide="toilet"></i></div><div class="info-row-text"><div class="info-row-label">Toalett</div><div class="info-row-value">' + b.toalett + '</div></div></div><div class="cta-stack"><button class="btn full" onclick="toast(\'Öppnar vägbeskrivning\')"><i data-lucide="navigation"></i> Vägbeskrivning</button></div></div>';
}

function renderRestaurant(r) {
    if (!r) return subDetailSimple('Hittades inte', '', '', '');
    const lunchBlock = r.cat === 'lunch' ? '<div class="sub-meta-grid"><div class="sub-meta-card"><div class="sub-meta-card-label">Dagens lunch</div><div class="sub-meta-card-value">' + r.dish + '</div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Pris</div><div class="sub-meta-card-value">' + r.price + '</div></div></div>' : '';
    const accessRow = r.access ? '<div class="info-row"><div class="info-row-icon"><i data-lucide="accessibility"></i></div><div class="info-row-text"><div class="info-row-label">Tillgänglighet</div><div class="info-row-value">Hiss och anpassad toalett</div></div></div>' : '';
    const kicker = r.cat === 'cafe' ? 'Café' : (r.cat === 'glass' ? 'Glass' : 'Restaurang');
    return subHeader(r.title, kicker, r.img) +
        '<div class="sub-page-body">' + lunchBlock + '<p class="sub-paragraph">' + r.desc + '</p><div class="info-row"><div class="info-row-icon"><i data-lucide="clock"></i></div><div class="info-row-text"><div class="info-row-label">Öppettider</div><div class="info-row-value">' + r.hours + '</div></div></div><div class="info-row"><div class="info-row-icon"><i data-lucide="map-pin"></i></div><div class="info-row-text"><div class="info-row-label">Adress</div><div class="info-row-value">' + r.place + '</div></div></div><div class="info-row"><div class="info-row-icon"><i data-lucide="phone"></i></div><div class="info-row-text"><div class="info-row-label">Telefon</div><div class="info-row-value">' + r.phone + '</div></div></div>' + accessRow + '<div class="cta-stack"><button class="btn full" onclick="toast(\'Ringer restaurangen\')"><i data-lucide="phone"></i> Ring restaurangen</button><button class="btn full secondary" onclick="toast(\'Öppnar i karta\')"><i data-lucide="map"></i> Visa på karta</button></div></div>';
}

function renderStory(s) {
    if (!s) return subDetailSimple('Hittades inte', '', '', '');
    return subHeader(s.title, s.kicker, s.img) +
        '<div class="sub-page-body"><p class="sub-paragraph" style="font-size:var(--t-lg); line-height:1.5; color:var(--gullmarn-deep); font-family:var(--font-display); font-weight:400;">' + s.excerpt + '</p><p class="sub-paragraph">' + s.body + '</p></div>';
}

function renderTransitDetail(id) {
    const titles = {
        'ferry-passenger': { t: 'Personfärjan Lysekil ↔ Fiskebäckskil', k: 'Färja', i: IMG.farjan },
        'ferry-car':       { t: 'Bilfärjan Finnsbo ↔ Skår',             k: 'Bilfärja', i: IMG.bilfarjan },
        'tufftuff':        { t: 'Tuff-tuff-tåget',                       k: 'Sommartrafik', i: IMG.tuffTuff },
        'bus':             { t: 'Bussar (Västtrafik)',                   k: 'Kollektivtrafik', i: IMG.hamnen }
    };
    const m = titles[id] || { t: 'Tidtabell', k: '', i: IMG.heroLysekil };
    const allTimes = ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00'];
    const grid = allTimes.map(t => '<div class="transit-time">' + t + '</div>').join('');
    return subHeader(m.t, m.k, m.i) +
        '<div class="sub-page-body"><p class="sub-paragraph">Avgångar idag.</p><div class="transit-times" style="grid-template-columns:repeat(4,1fr);">' + grid + '</div><div class="cta-stack"><button class="btn full" onclick="toast(\'Påminnelse 10 min innan nästa avgång\')"><i data-lucide="bell"></i> Påminn mig nästa avgång</button></div></div>';
}

function renderService() {
    return subHeader('Service', 'Praktiskt för besökare', IMG.hamnen) +
        '<div class="sub-page-body">' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="circle-parking"></i></div><div class="info-row-text"><div class="info-row-label">Parkering</div><div class="info-row-value">Gästhamnen 10 kr/tim · Stora Torg 15 kr/tim · Pinneviken gratis</div></div></div>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="zap"></i></div><div class="info-row-text"><div class="info-row-label">Laddstationer</div><div class="info-row-value">Gästhamnen 2× 50 kW · Preem E6 snabbladdare</div></div></div>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="toilet"></i></div><div class="info-row-text"><div class="info-row-label">Toaletter</div><div class="info-row-value">Gästhamnen (HK-anpassad) · Stora Torg · Pinneviken (säsong)</div></div></div>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="banknote"></i></div><div class="info-row-text"><div class="info-row-label">Bankomater</div><div class="info-row-value">Stora Torget (Swedbank) · ICA Kvantum (Handelsbanken)</div></div></div>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="recycle"></i></div><div class="info-row-text"><div class="info-row-label">Återvinning</div><div class="info-row-value">Återvinningsstation Industrigatan · Pantmaskin ICA Kvantum</div></div></div>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="phone"></i></div><div class="info-row-text"><div class="info-row-label">Turistbyrån</div><div class="info-row-value">Södra Hamngatan 6 · 0523-130 50</div></div></div>' +
        '</div>';
}

function renderHealthcare() {
    return subHeader('Vård & apotek', 'När du behöver hjälp', IMG.hamnen) +
        '<div class="sub-page-body"><p class="sub-paragraph"><strong>Akut:</strong> Ring 112. Vid mindre akuta besvär ring 1177.</p>' +
        '<h3 class="sub-h3">Vård i Lysekil</h3>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="heart-pulse"></i></div><div class="info-row-text"><div class="info-row-label">Slättens vårdcentral</div><div class="info-row-value">Slättenvägen 9 · 010-441 30 00</div></div></div>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="stethoscope"></i></div><div class="info-row-text"><div class="info-row-label">Närakuten Uddevalla</div><div class="info-row-value">NU-sjukvården · 010-435 00 00</div></div></div>' +
        '<h3 class="sub-h3">Apotek</h3>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="pill"></i></div><div class="info-row-text"><div class="info-row-label">Apotek Hjärtat</div><div class="info-row-value">Kungsgatan 18 · Mån–fre 09–18, lör 10–14</div></div></div>' +
        '<h3 class="sub-h3">Tandvård</h3>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="smile"></i></div><div class="info-row-text"><div class="info-row-label">Folktandvården Lysekil</div><div class="info-row-value">Slättenvägen 9 · 010-441 92 30</div></div></div>' +
        '</div>';
}

function renderWaste() {
    return subHeader('Sophämtning & återvinning', 'För boende och stuggäster', IMG.heroLysekil) +
        '<div class="sub-page-body">' +
        '<div class="sub-meta-grid"><div class="sub-meta-card"><div class="sub-meta-card-label">Nästa hämtning</div><div class="sub-meta-card-value">Tisdag 7 juli</div></div><div class="sub-meta-card"><div class="sub-meta-card-label">Vad</div><div class="sub-meta-card-value">Rest- och matavfall</div></div></div>' +
        '<input class="report-input" placeholder="Din adress (t.ex. Kungsgatan 12)" />' +
        '<button class="btn full" onclick="toast(\'Notis dagen innan hämtning aktiverad\')"><i data-lucide="bell"></i> Påminn mig dagen innan</button>' +
        '<h3 class="sub-h3">Återvinningsstationer</h3>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="recycle"></i></div><div class="info-row-text"><div class="info-row-label">Industrigatan</div><div class="info-row-value">Glas, papper, plast, metall · Öppet dygnet runt</div></div></div>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="trash-2"></i></div><div class="info-row-text"><div class="info-row-label">Sivik återvinningscentral</div><div class="info-row-value">Sivik · Mån, ons 10–18, lör 09–13</div></div></div>' +
        '<h3 class="sub-h3">Vart slänger jag…?</h3>' +
        '<input class="report-input" placeholder="Sök t.ex. lysrör, batteri, färgburk" />' +
        '</div>';
}

function renderAccessibility() {
    const beachCards = BEACHES.filter(b => b.access).map(b => '<button class="list-card" onclick="openSubPage(\'beach:' + b.id + '\')"><div class="list-card-image" style="background-image:url(\'' + b.img + '\')"></div><div class="list-card-body"><div class="list-card-title">' + b.title + '</div><div class="list-card-desc">' + b.desc + '</div><div class="list-card-meta"><span class="access-badge"><i data-lucide="accessibility" style="width:12px;height:12px;"></i> Ramp</span></div></div></button>').join('');
    const restCards = RESTAURANTS.filter(r => r.access).map(r => '<button class="list-card" onclick="openSubPage(\'eat:' + r.id + '\')"><div class="list-card-image" style="background-image:url(\'' + r.img + '\')"></div><div class="list-card-body"><div class="list-card-title">' + r.title + '</div><div class="list-card-desc">' + r.desc + '</div><div class="list-card-meta"><span class="access-badge"><i data-lucide="accessibility" style="width:12px;height:12px;"></i> Hiss & toalett</span></div></div></button>').join('');
    return subHeader('Tillgänglighet', 'Anpassat för alla', IMG.pinneviken) +
        '<div class="sub-page-body"><p class="sub-paragraph">Slå på "Stor text" eller "Högkontrast" i Inställningar för att göra hela appen lättare att läsa.</p>' +
        '<div class="setting-row"><div><div class="setting-label">Filtrera allt på tillgänglighet</div><div class="setting-sub">Visar bara anpassade platser i listor</div></div><div class="switch ' + (state.settings.accessFilter ? 'on' : '') + '" onclick="toggleAccessFilter(this)"></div></div>' +
        '<h3 class="sub-h3">Anpassade badplatser</h3>' + beachCards +
        '<h3 class="sub-h3">Anpassade restauranger</h3>' + restCards + '</div>';
}

function toggleAccessFilter(elem) {
    state.settings.accessFilter = !state.settings.accessFilter;
    elem.classList.toggle('on', state.settings.accessFilter);
    toast(state.settings.accessFilter ? 'Filter på' : 'Filter av');
}

function renderSettings() {
    const ts = state.settings.textSize;
    const cont = state.settings.contrast;
    const mot = state.settings.motion;
    return subHeader('Inställningar', 'Anpassa appen', IMG.heroLysekil) +
        '<div class="sub-page-body">' +
        '<div class="more-list" style="margin-bottom:18px;">' +
        '<div class="setting-row"><div><div class="setting-label">Textstorlek</div><div class="setting-sub">Större text gör det lättare att läsa</div></div><div class="choice-pills">' +
            '<button class="choice-pill ' + (ts === 'normal' ? 'active' : '') + '" onclick="setTextSize(\'normal\')">Normal</button>' +
            '<button class="choice-pill ' + (ts === 'stor' ? 'active' : '') + '" onclick="setTextSize(\'stor\')">Stor</button>' +
            '<button class="choice-pill ' + (ts === 'extra-stor' ? 'active' : '') + '" onclick="setTextSize(\'extra-stor\')">Extra stor</button>' +
        '</div></div>' +
        '<div class="setting-row"><div><div class="setting-label">Högkontrastläge</div><div class="setting-sub">Renare färger, hårdare kanter</div></div><div class="switch ' + (cont === 'hog' ? 'on' : '') + '" onclick="toggleContrast(this)"></div></div>' +
        '<div class="setting-row"><div><div class="setting-label">Reducera animationer</div><div class="setting-sub">Stänger av övergångar och rörelse</div></div><div class="switch ' + (mot === 'reduced' ? 'on' : '') + '" onclick="toggleMotion(this)"></div></div>' +
        '</div>' +
        '<div class="more-list"><div class="setting-row"><div><div class="setting-label">Språk · Language</div><div class="setting-sub">Endast svenska i denna version</div></div><div class="choice-pills"><button class="choice-pill active">SV</button><button class="choice-pill" onclick="toast(\'Engelska kommer i full version\')">EN</button><button class="choice-pill" onclick="toast(\'Tyska kommer i full version\')">DE</button></div></div></div>' +
        '</div>';
}

function setTextSize(s) {
    state.settings.textSize = s;
    if (s === 'normal') document.body.removeAttribute('data-text-size');
    else document.body.setAttribute('data-text-size', s);
    renderSubPage('settings');
    toast('Textstorlek: ' + ({normal:'Normal',stor:'Stor','extra-stor':'Extra stor'}[s]));
}

function toggleContrast(elem) {
    state.settings.contrast = state.settings.contrast === 'hog' ? 'normal' : 'hog';
    elem.classList.toggle('on');
    if (state.settings.contrast === 'hog') document.body.setAttribute('data-contrast', 'hog');
    else document.body.removeAttribute('data-contrast');
}

function toggleMotion(elem) {
    state.settings.motion = state.settings.motion === 'reduced' ? 'on' : 'reduced';
    elem.classList.toggle('on');
    if (state.settings.motion === 'reduced') document.body.setAttribute('data-motion', 'reduced');
    else document.body.removeAttribute('data-motion');
}

function renderAbout() {
    return subHeader('Om Lysekils Guide', 'Lysekils Guide', IMG.heroLysekil) +
        '<div class="sub-page-body"><p class="sub-paragraph">Lysekils Guide är en prototyp framtagen som idéunderlag till Lysekils kommun. Innehållet är exempeldata och ska kompletteras med kommunens egna data, foton och realtids-API:er.</p>' +
        '<p class="sub-paragraph">Appen är byggd med tillgänglighet i fokus — minst 18 px brödtext, kontrast på AAA-nivå för läsning och stöd för stor text och högkontrast.</p>' +
        '<h3 class="sub-h3">Kontakt</h3>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="mail"></i></div><div class="info-row-text"><div class="info-row-label">E-post</div><div class="info-row-value">kommun@lysekil.se</div></div></div>' +
        '<div class="info-row"><div class="info-row-icon"><i data-lucide="phone"></i></div><div class="info-row-text"><div class="info-row-label">Växel</div><div class="info-row-value">0523-61 30 00</div></div></div></div>';
}

function renderReport(step) {
    const c = $('sub-page-content');
    const totalSteps = 5;
    let dots = '';
    for (let i = 1; i <= totalSteps; i++) dots += '<div class="report-dot ' + (i < step ? 'done' : '') + ' ' + (i === step ? 'active' : '') + '"></div>';
    let body = '';

    if (step === 1) {
        const tiles = REPORT_TYPES.map(rt => '<button class="choice-tile ' + (state.report.type === rt.key ? 'selected' : '') + '" onclick="selectReportType(\'' + rt.key + '\')"><span class="choice-tile-icon"><i data-lucide="' + rt.icon + '"></i></span><span>' + rt.label + '</span></button>').join('');
        body = '<h2 class="report-h">Vad gäller det?</h2><p class="report-sub">Välj typ av fel så kommer rätt person att titta på det.</p><div class="choice-list">' + tiles + '</div>';
    } else if (step === 2) {
        const dropTitle = state.report.photo ? 'Bild tillagd ✓' : 'Tryck för att ta bild';
        const dropSub = state.report.photo ? 'Tryck igen för att byta' : 'Eller välj från ditt galleri';
        const next = state.report.photo ? 'Nästa' : 'Hoppa över';
        body = '<h2 class="report-h">Lägg till en bild</h2><p class="report-sub">Ett foto hjälper oss att förstå snabbare. Du kan hoppa över det här om du vill.</p>' +
            '<div class="report-photo-drop" onclick="state.report.photo = true; toast(\'Bild tillagd\'); renderReport(2);"><i data-lucide="camera"></i><div class="report-photo-drop-title">' + dropTitle + '</div><div>' + dropSub + '</div></div>' +
            '<div class="report-actions"><button class="btn secondary" style="flex:1;" onclick="renderReport(1)">Tillbaka</button><button class="btn" style="flex:2;" onclick="renderReport(3)">' + next + '</button></div>';
    } else if (step === 3) {
        body = '<h2 class="report-h">Var är felet?</h2><p class="report-sub">Vi har hämtat din ungefärliga plats. Du kan flytta nålen om det behövs.</p>' +
            '<div id="report-map" style="height: 220px; border-radius: var(--r-md); margin-bottom: 12px; overflow: hidden;"></div>' +
            '<div class="report-actions"><button class="btn secondary" style="flex:1;" onclick="renderReport(2)">Tillbaka</button><button class="btn" style="flex:2;" onclick="renderReport(4)">Nästa</button></div>';
    } else if (step === 4) {
        body = '<h2 class="report-h">Beskriv kort</h2><p class="report-sub">Är det något extra vi behöver veta? Frivilligt fält.</p>' +
            '<textarea class="report-textarea" id="report-desc" placeholder="T.ex. Lampan blinkar och slocknar nattetid">' + state.report.desc + '</textarea>' +
            '<div class="report-actions"><button class="btn secondary" style="flex:1;" onclick="saveReportDesc(); renderReport(3)">Tillbaka</button><button class="btn" style="flex:2;" onclick="saveReportDesc(); renderReport(5)">Nästa</button></div>';
    } else if (step === 5) {
        body = '<h2 class="report-h">Hur når vi dig?</h2><p class="report-sub">För att kunna återkoppla. Vi delar inte din e-post.</p>' +
            '<input class="report-input" id="report-email" type="email" placeholder="din@epost.se" value="' + state.report.email + '" />' +
            '<div class="report-actions"><button class="btn secondary" style="flex:1;" onclick="saveReportEmail(); renderReport(4)">Tillbaka</button><button class="btn" style="flex:2;" onclick="submitReport()">Skicka anmälan</button></div>';
    }
    c.innerHTML = subHeader('Felanmälan', 'Steg ' + step + ' av ' + totalSteps, IMG.heroLysekil) + '<div class="report-step"><div class="report-progress">' + dots + '</div>' + body + '</div>';
    refreshIcons();
    if (step === 3) {
        const start = (state.report.location && typeof state.report.location === 'object')
            ? [state.report.location.lat, state.report.location.lng]
            : [58.2756, 11.4406];
        const reportMap = L.map('report-map', { zoomControl: false }).setView(start, 14);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap & CARTO',
            maxZoom: 19
        }).addTo(reportMap);
        const marker = L.marker(start, { draggable: true }).addTo(reportMap);
        marker.on('dragend', () => {
            const ll = marker.getLatLng();
            state.report.location = { lat: ll.lat, lng: ll.lng };
        });
        setTimeout(() => reportMap.invalidateSize(), 60);
    }
}

function selectReportType(key) {
    state.report.type = key;
    setTimeout(() => renderReport(2), 200);
}
function saveReportDesc()  { const v = $('report-desc');  if (v) state.report.desc  = v.value; }
function saveReportEmail() { const v = $('report-email'); if (v) state.report.email = v.value; }

function submitReport() {
    saveReportEmail();
    const id = 'LYS-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000);
    state.pageStack[state.pageStack.length - 1] = 'report-success:' + id;
    renderReportSuccess(id);
}

function renderReportSuccess(forceId) {
    const c = $('sub-page-content');
    const id = forceId || ('LYS-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000));
    c.innerHTML = subHeader('Tack', 'Anmälan mottagen', IMG.heroLysekil) +
        '<div class="report-success"><div class="report-success-mark"><i data-lucide="check"></i></div><h2 class="report-success-title">Vi tar hand om det</h2><div class="report-success-id">Ärendenummer: ' + id + '</div><p class="report-success-text">Vi har tagit emot din anmälan och svarar inom tre arbetsdagar. Spara ärendenumret om du vill följa upp.</p><button class="btn full" onclick="closeAllSubPages(); switchTab(\'home\')"><i data-lucide="home"></i> Till startsidan</button></div>';
    refreshIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    renderEat();
    renderSea();
    renderTransit();
    initSplash();
    initTabs();
    refreshIcons();
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
        state.settings.motion = 'reduced';
        document.body.setAttribute('data-motion', 'reduced');
    }
});
