function getWeather(city){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=48&appid=bc44410118b10b4a172dcfb25048ec75&units=imperial`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            $('#city-name').text(data.city.name);
            $('#city-name').appendTo("hello");
            console.log(data.list[0].main.temp);
            var weatherinfo = [data.list[0].dt_txt, data.list[0].main.temp,data.list[0].wind.speed, data.list[0].main.humidity];
            for (var i = 0; i < 4; i++){
                $('<li>' + `${weatherinfo[i]}` + '</li>').appendTo('#info');
            }

            //populate weather cards
            var x = 2;
            var weatherCards = $('.weather-day'); //get every card with a weather-day class
            for (var i = 0; i < 5; i++){ //iterate 5 times because we have 5 cards
                 //first card
                $('<li>' + "Date: " + data.list[x].dt_txt + '</li>').appendTo('#' + weatherCards.eq(i).attr('id'));
                $('<li>' + "Temp: " + data.list[x].main.temp + '</li>').appendTo('#' + weatherCards.eq(i).attr('id'));
                $('<li>' + "Windspeed: " + data.list[x].wind.speed + '</li>').appendTo('#' + weatherCards.eq(i).attr('id'));
                $('<li>' + "Humidity: " + data.list[x].main.humidity +"%" + '</li>').appendTo('#' + weatherCards.eq(i).attr('id'));
                x += 8;
            }
            
            
        })
}


$('#citySearch').on("click", function(){
    var cityInput = $('#userInput').val();
    getWeather(cityInput);
})

