// Display current date in jumbotron
$("#currentDay").text(moment().format("llll"));

// Initialize empty array for saved events
var activities = JSON.parse(localStorage.getItem("activities")) || [];
var checkStorage = localStorage.getItem("activities");
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
    activities.push({ activitieId: index });
    console.log(activities);
    localStorage.setItem("events", JSON.stringify(activities));
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
}
