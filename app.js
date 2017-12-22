$(document).ready(function(){


var config = {
    apiKey: "AIzaSyAmNdrmFfrGuZgppv7ePkANFsO0_b3EQac",
    authDomain: "k-g-project.firebaseapp.com",
    databaseURL: "https://k-g-project.firebaseio.com",
    projectId: "k-g-project",
    storageBucket: "k-g-project.appspot.com",
    messagingSenderId: "997849940572"
  };
  firebase.initializeApp(config);


var database = firebase.database();


database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of childSnapshot
  console.log(childSnapshot.val().train);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().first);
  console.log(childSnapshot.val().frequency);


var tFrequency = childSnapshot.val().frequency ;


var tfirstTime = childSnapshot.val().first;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(tfirstTime, "HH:mm").subtract(tFrequency, "days");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
nextTrain = moment(nextTrain).format("HH:mm");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  var newTrain = $("<tr>");
  var origTrain = $("<td>").html(childSnapshot.val().train);
  var origPlace = $("<td>").html(childSnapshot.val().destination);
  var origFrequency= $("<td>").html(childSnapshot.val().frequency);
  var anotherTrain= $("<td>").html(nextTrain); 
  var minutesLeft= $("<td>").html(tMinutesTillTrain);

  newTrain.append(origTrain);
  newTrain.append(origPlace);
  newTrain.append(origFrequency);
  newTrain.append(anotherTrain);
  newTrain.append(minutesLeft);
 

  $("#createdTrains").prepend(newTrain);




// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


$("#submitTrain").on("click", function(event){
	event.preventDefault();
	var trainName = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrain = $("#first").val().trim();
	var frequency = $("#frequency").val().trim();
	database.ref().push({
		train: trainName,
		destination: destination,
		first: firstTrain,
		frequency: frequency
	});

	$("#trainName").val("");
	$("#destination").val("");
	 $("#first").val("");
	 $("#frequency").val("");

});





































})