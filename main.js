// --- Flex Animation ---
const zones = document.querySelectorAll('.zone');

function toggleOpen(){
    zones.forEach(zone => {
    if (zone.classList.contains('open') && zone != this) {
        zone.classList.remove('open');
        }
    });
    this.classList.toggle('open');
};

function toggleActive(event) {
    console.log(event.propertyName)
    if (event.propertyName.includes('flex-grow') || event.propertyName.includes('visibility')) 
    this.classList.toggle('open-active')
    
};

zones.forEach(zone => zone.addEventListener('click', toggleOpen));
zones.forEach(zone => zone.addEventListener('transitionend', toggleActive));

// --- TimeZones ---
var DateTime = luxon.DateTime; // using luxon library https://moment.github.io/luxon/#/

const secondHands = document.querySelectorAll('.second-hand');
const minHands = document.querySelectorAll('.min-hand');
const hourHands = document.querySelectorAll('.hour-hand');

function setDate() {
    const now = DateTime.now();

    // Rotate Second Hands
    const secondsDegrees = ((now.second / 60) * 360) + 90;
    secondHands.forEach(secondHand => {
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    });
    
    // Rotate Minute Hands
    const minsDegrees = ((now.minute / 60) * 360) + ((now.second/60)*6) + 90;
    minHands.forEach(minHand => {
        minHand.style.transform = `rotate(${minsDegrees}deg)`;
    });

    // Rotate Hour Hands and get UTC-Offset for each TimeZone 
    function handleTimeZone(timeZone, city, hourHand) {
        const zoneTime = DateTime.now().setZone(timeZone);
        // Hour Hand
        hourDegrees = ((zoneTime.hour / 12) * 360) + ((zoneTime.minute/60)*30) + 90;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`
        // UTC-Offset
        const  zoneTimeCity = document.getElementById(city)
        const offSetUTC = zoneTime.offset
        if (offSetUTC > 0) {
            zoneTimeCity.innerText = (`UTC +${(offSetUTC / 60)}`);
        } else if (offSetUTC == 0) {
            zoneTimeCity.innerText = (`UTC`);
        } else {
            zoneTimeCity.innerText = (`UTC ${(offSetUTC / 60)}`);
        };   
    };

    // Check for each TimeZone
    hourHands.forEach(hourHand => {
        if (hourHand.classList.contains("los-angeles")) {
            handleTimeZone("America/Los_Angeles", "los-angeles", hourHand)
        } else if (hourHand.classList.contains("new-york")) {
            handleTimeZone("America/New_York", "new-york", hourHand)
        } else if (hourHand.classList.contains("london")) {
            handleTimeZone("Europe/London", "london", hourHand)
        } else if (hourHand.classList.contains("berlin")) {
            handleTimeZone("Europe/Berlin", "berlin", hourHand)
        } else if (hourHand.classList.contains("dubai")) {
            handleTimeZone("Asia/Dubai", "dubai", hourHand)
        } else if (hourHand.classList.contains("tokyo")) {
            handleTimeZone("Asia/Tokyo", "tokyo", hourHand)
        } else if (hourHand.classList.contains("sydney")) {
            handleTimeZone("Australia/Sydney", "sydney", hourHand)
        };
    });  
};

setInterval(setDate, 1000);

setDate();
