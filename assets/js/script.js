// Initialize empty array for saved events
var events = JSON.parse(localStorage.getItem("events")) || [];
var checkStorage = localStorage.getItem("events");
var startTime = 9;
var currentTime = parseInt(moment().format("H"));

// Display current date in jumbotron
$("#currentDay").text(moment().format("llll"));

// Generate time blocks for 9 am to 5 pm
for (let index = 0; index < 9; index++) {
  // Create row
  var divRow = $('<div class="row">');
  divRow.attr("data-id", index);
  $(".container").append(divRow);

  if (checkStorage === null) {
    // Create objects in events array with index as id for local storage
    events.push({ eventId: index });
    console.log(events);
    localStorage.setItem("events", JSON.stringify(events));
  }

  // Populate first column with time
  var tableTime = $('<div class="hour col-1">');
  var hour = moment(startTime, "h").format("LT");
  tableTime.text(hour);
  divRow.append(tableTime);

  // Create Description div and <textarea>s for events
  var eventDesc = $('<div class="description col-10">');
  eventDesc.attr("data-time", startTime);

  setDescClass();

  var eventTextArea = $('<textarea cols="65" rows="3"></textarea>');
  eventDesc.html(eventTextArea);
  eventTextArea.attr("data-id", index);
  divRow.append(eventDesc);

  // Get event description out of local storage to display in text event
  var eventText = events[index].description;
  eventTextArea.val(eventText);

  // Create save buttons
  var saveDiv = $('<div class="saveBtn col-1">');
  divRow.append(saveDiv);
  var saveBtn = $('<i class="far fa-save fa-md"></i>');
  saveDiv.html(saveBtn);
  saveBtn.attr("data-id", index);

  startTime++;
}

// Set classes for past, present, future time block
function setDescClass() {
  // Set class for Description div based on past/present/future
  if (moment(startTime).isBefore(currentTime)) {
    eventDesc.addClass("past");
    console.log("past");
  }

  if (moment(startTime).isSame(currentTime)) {
    eventDesc.addClass("present");
    console.log("present");
  }

  if (moment(startTime).isAfter(currentTime)) {
    eventDesc.addClass("future");
    console.log("future");
  }
}

// Add event listener to save button
$(".far").on("click", function () {
  // Get data-id of save click which is set to index in array
  var dataId = $(this).attr("data-id");
  console.log("The data-id of clicked item is: " + dataId);

  // Take textarea value with that currentId and...
  var eventText = $(`textarea[data-id|='${dataId}']`).val();
  console.log("Event text is " + eventText);

  // Set to description property of that ID/index in events array
  events[dataId].description = eventText;
  console.log(events);

  localStorage.setItem("events", JSON.stringify(events));

  console.log("Description saved for id: " + dataId);
});
