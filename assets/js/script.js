// Display current date in jumbotron
$("#currentDay").text(moment().format("llll"));

// Initialize empty array for saved events
var events = JSON.parse(localStorage.getItem("events")) || [];
var checkStorage = localStorage.getItem("events");
var startTime = 9;
var currentTime = parseInt(moment().format("H"));

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
