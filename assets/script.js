function getCity(city){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=bc44410118b10b4a172dcfb25048ec75`)
        .then (function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data[0].country);
            console.log(data[0].name);
            console.log(data[0].lat);
            console.log(data[0].lon);
            var lat = data[0].lat;
            var lon = data[0].lon;
            $('#city-name').text(data[0].name);
            getWeather(lat,lon);
        });
        
}

function getWeather(lat,lon){
    var link = 
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=bc44410118b10b4a172dcfb25048ec75&units=imperial`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data.list[0].main.temp);
        })
}


$('#citySearch').on("click", function(){
    var cityInput = $('#userInput').val();
    getCity(cityInput);
})

