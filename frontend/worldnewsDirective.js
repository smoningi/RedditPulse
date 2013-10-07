angular.module('RedditPulse', []).directive('worldnewsDirective', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      items: '='
    },
    controller: function ($scope, $element, $attrs) {
      console.log(2);
    },
    template: '<div id="container" style="margin: 0 auto"></div>',
    link: function (scope, element, attrs,timeout) {
      console.log(3);
      $.get("http://localhost:8000/news_sentiment.txt", function(data) {
        fileText = data;
        var lines = fileText.split("\n");
        var sentimentData = [];
        for(var i = 0; i < lines.length; i++){
          var lineString = lines[i].split(" ");
          if(i<(lines.length-1)){
            var dateString = lineString[0].split("-");
            var timeString = lineString[1].split(":");
            console.log(lineString[2]);
            var sentimentRating = parseFloat(lineString[2]);
            
            //Date
            var year = parseFloat(dateString[0]);
            var month = parseFloat(dateString[1]) - 1;
            var day = parseFloat(dateString[2]) - 1;

            //Time
            var hour = parseFloat(timeString[0]);
            var minutes = parseFloat(timeString[1]);
            var seconds = parseFloat(timeString[2]);

            //Date in UTC
            var dateTime = Date.UTC(year,month,day,hour,minutes,seconds);
            sentimentData[i] = [dateTime, sentimentRating];
          }
        }
        // $scope.theData = sentimentData;
        // console.log($scope.theData);
        var chart = new Highcharts.StockChart({
        chart: {
          renderTo: 'container',
          type: 'spline'
        },
        rangeSelector : {
          selected : 1
        },
        title : {
          text : 'World News'
        },
        xAxis: {
            type: 'datetime',
            title: {
              text: 'Time'
            },
            dateTimeLabelFormats: {
              second: '%Y-%m-%d<br/>%H:%M:%S',
              minute: '%Y-%m-%d<br/>%H:%M',
              hour: '%Y-%m-%d<br/>%H:%M',
              day: '%Y<br/>%m-%d',
              week: '%Y<br/>%m-%d',
              month: '%Y-%m',
              year: '%Y'
          }
        },
        yAxis:{
            title: {
              text: 'Sentiment'
            },
            min: -1
        },
        plotOptions: {
          spline: {
            threshold: 0,
            negativeColor: '#FF0000'
          }
        },
        series : [{
          name : 'World News',
          data : sentimentData
        }]
      });
    }, 'text');
      
      // scope.$watch("items", function (newValue) {
      //   chart.series[0].setData(newValue, true);
      // }, true);
      
    }
  }
});