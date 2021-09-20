// Display current date in jumbotron
$("#currentDay").text(moment().format("llll"));

// Initialize empty array for saved events
var events = JSON.parse(localStorage.getItem("events")) || [];
var checkStorage = localStorage.getItem("events");
var startTime = 9;
var currentTime = parseInt(moment().format("H"));

/ Generate time blocks for 9 am to 5 pm
for (let index = 0; index < 9; index++) {

    // Create row
    var divRow = $('<div class="row">');
    divRow.attr('data-id', index);
    $('.container').append(divRow);

    if (checkStorage === null) {

        // Create objects in events array with index as id for local storage
        events.push({ eventId: index });
        console.log(events);
        localStorage.setItem('events', JSON.stringify(events));
        
    };

