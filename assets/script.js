// Array containing time objects to loop through to create day planner
let currentDay = [
    {
        id: "0",
        time12: "09",
        time24: "09",
        amPm: "am",
        task: ""
    },
    {
        id: "1",
        time12: "10",
        time24: "10",
        amPm: "am",
        task: ""
    },
    {
        id: "2",
        time12: "11",
        time24: "11",
        amPm: "am",
        task: ""
    },
    {
        id: "3",
        time12: "12",
        time24: "12",
        amPm: "pm",
        task: ""
    },
    {
        id: "4",
        time12: "01",
        time24: "13",
        amPm: "pm",
        task: ""
    },
    {
        id: "5",
        time12: "02",
        time24: "14",
        amPm: "pm",
        task: ""
    },
    {
        id: "6",
        time12: "03",
        time24: "15",
        amPm: "pm",
        task: ""
    },
    {
        id: "7",
        time12: "04",
        time24: "16",
        amPm: "pm",
        task: ""
    },
    {
        id: "8",
        time12: "05",
        time24: "17",
        amPm: "pm",
        task: ""
    },
    
]

// Gets date for Jumbotron
function getJumboDate() {
    let currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}

getJumboDate();

currentDay.forEach(function(currentHour) {
    // Creates overall rows
    let overallRow = $("<form>").attr({"class": "row"});
    $(".container").append(overallRow);

    // Creates hour field
    let hourColumn = $("<div>")
        .text(`${currentHour.time12}${currentHour.amPm}`)
        .attr({"class": "col-md-2 hour"});

    // Creates task field
    let taskColumn = $("<div>").attr({"class": "col-md-9 description p-0"});
    let taskData = $("<textarea>");
    taskColumn.append(taskData);
    taskData.attr("id", currentHour.id);

    // Colors the task field
    if (currentHour.time24 < moment().format("HH")) {
        taskData.attr ({"class": "past"})
    } else if (currentHour.time24 === moment().format("HH")) {
        taskData.attr({"class": "present"})
    } else if (currentHour.time24 > moment().format("HH")) {
        taskData.attr({"class": "future"})
    }

    // Creates save button
    let saveButton = $("<i class='far fa-save fa-lg'></i>")
    let saveTask = $("<button>").attr({"class": "col-md-1 saveBtn"});

    // Appends all elements together to display
    saveTask.append(saveButton);
    overallRow.append(hourColumn, taskColumn, saveTask);
})

// Saves tasks to local storage
function saveTasks() {
    localStorage.setItem("currentDay", JSON.stringify(currentDay));
}

// Loads tasks from local storage
function loadTasks() {
    currentDay.forEach(function(hourTasks) {
        $(`#${hourTasks.id}`).val(hourTasks.task);
    })
}

// Sets tasks to view if any exist
function init() {
    let storedTasks = JSON.parse(localStorage.getItem("currentDay"));

    if (storedTasks) {
        currentDay = storedTasks;
    }

    saveTasks();
    loadTasks();
}

init();

// Saves data to local storage when button is clicked
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    let index = $(this).siblings(".description").children().attr("id");
    currentDay[index].task = $(this).siblings(".description").children().val();
    saveTasks();
    loadTasks();
})