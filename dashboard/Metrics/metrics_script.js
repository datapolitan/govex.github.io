$("#go").click(function(e){
  console.log("Getting site metrics for" + portal + "." + "Start Date =" + start + "End Date = " + end + "Iteration = " + interval);
  var url_array = [];
  var dataObj = [];
  startdate = document.getElementById("start")[0].value;
  start = new Date (startdate);

  enddate = document.getElementById("end")[0].value;
  end = new Date (enddate);

  interval = document.getElementById("interval")[0].value;
  int = Number (interval * 1000);

  range = []

  for (var i=start.getTime(); i  < end.getTime();i=i+int) {

  range.push(i)
  }

  var portal = document.getElementById("portal")[0].value;
  var length = range.length - 1;
  // var url_array = []

  range.forEach(function(item, i)
  {
    var url = {
      endpoint : ("https://" + portal + "/api/site_metrics.json?start=" + range[i] + "&end=" + range[i+1]),
      iteration : i
              }
    console.log(url)
    url_array.push(url)
  })

url_array.forEach(function(myUrl){
      $.ajax({
          url: myUrl.endpoint,
          type: "GET",
          dataObj: [],
          iter: myUrl.iteration


      }).done(function(data, status, jqXHR) {
        console.log(data);
        console.log("Returned Interval #" + (myUrl.iteration + 1) + " data with status of " + status);
        var socrataData = jqXHR.responseJSON;

        dataObj.push(socrataData);
        var dataTextObj = JSON.stringify(dataObj);
        $('#displayData').text(dataTextObj);

      }).fail(function(xhr, status, err) {
          console.log('fail', status, err);
          });
        });
});