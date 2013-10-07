//Helper methods
function fileParser(filePath){
	var fileText;
	$.get(filePath, function(data) {
   		fileText = data;
   		var lines = fileText.split("\n");
   		var sentimentData = [];
   		for(var i = 0; i < lines.length; i++){
   			var lineString = lines[i].split(" ");
   			if(i<(lines.length-1)){
   				var dateString = lineString[0].split("-");
	   			var timeString = lineString[1].split(":");
	   			var sentimentRating = parseFloat(lineString[2]);
	   			
	   			//Date
	   			var year = parseFloat(dateString[0]);
	   			var month = parseFloat(dateString[1]);
	   			var day = parseFloat(dateString[2]);

	   			//Time
	   			var hour = parseFloat(timeString[0]);
	   			var minutes = parseFloat(timeString[1]);
	   			var seconds = parseFloat(timeString[2]);

	   			//Date in UTC
	   			var dateTime = Date.UTC(year,month,day,hour,minutes,seconds);
	   			sentimentData[i] = [dateTime, sentimentRating];
   			}
   		}
   		return sentimentData;
	}, 'text');
}

//Main Controller
function SubRedditController($scope, $timeout) {
  // 	fileParser("http://localhost:8000/gaming_sentiment.txt", function(output){
		// console.log(output);
  // 	});
	$scope.theData;
	$(document).ready(function(){
		$.get("http://localhost:8000/gaming_sentiment.txt", function(data) {
	   		fileText = data;
	   		var lines = fileText.split("\n");
	   		var sentimentData = [];
	   		for(var i = 0; i < lines.length; i++){
	   			var lineString = lines[i].split(" ");
	   			if(i<(lines.length-1)){
	   				var dateString = lineString[0].split("-");
		   			var timeString = lineString[1].split(":");
		   			var sentimentRating = parseFloat(lineString[2]);
		   			
		   			//Date
		   			var year = parseFloat(dateString[0]);
		   			var month = parseFloat(dateString[1]);
		   			var day = parseFloat(dateString[2]);

		   			//Time
		   			var hour = parseFloat(timeString[0]);
		   			var minutes = parseFloat(timeString[1]);
		   			var seconds = parseFloat(timeString[2]);

		   			//Date in UTC
		   			var dateTime = Date.UTC(year,month,day,hour,minutes,seconds);
		   			sentimentData[i] = [dateTime, sentimentRating];
	   			}
	   		}
	   		$scope.theData = sentimentData;
	   		console.log($scope.theData);
		}, 'text');
	});
}