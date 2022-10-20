function getWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=48&appid=bc44410118b10b4a172dcfb25048ec75&units=imperial`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            //////////////////////////////////////
            var icon = ("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png'>");
            $('#city-name').text(data.city.name);
            $('#city-name').append(icon);
            console.log(data.list[0].main.temp);
            var weatherinfo = [moment(data.list[0].dt_txt).format("M/D/YY"), data.list[0].main.temp,data.list[0].wind.speed, data.list[0].main.humidity];
            for (var i = 0; i < 4; i++){
                $('<li>' + `${weatherinfo[i]}` + '</li>').appendTo('#info');
            }
            /////////////////////////////////////////////////////////////
            //populate weather cards
            var x = 2;
            var weatherCards = $('.weather-day'); //get every card with a weather-day class
            for (var i = 0; i < 5; i++){ //iterate 5 times because we have 5 cards
                 //first card
                var icon = ("<img src='http://openweathermap.org/img/w/" + data.list[x].weather[0].icon + ".png'>");
                var time = moment(data.list[x].dt_txt).format("M/D/YY");
                $('<li>' + "Date: " + time + '</li>').appendTo('#' + weatherCards.eq(i).attr('id'));
                $('<li>' + "Temp: " + data.list[x].main.temp + "F" + icon + '</li>').appendTo('#' + weatherCards.eq(i).attr('id'));
                $('<li>' + "Windspeed: " + data.list[x].wind.speed + '</li>').appendTo('#' + weatherCards.eq(i).attr('id'));
                $('<li>' + "Humidity: " + data.list[x].main.humidity +"%" + '</li>').appendTo('#' + weatherCards.eq(i).attr('id'));
                x += 8;
            }
            /////////////////////////////////////////////////////////////////////////////////////
            //add city to list
            $('<button class="city-button">' + data.city.name + '</button>').appendTo('#saved-searches');
            //use those buttons for something!
            
        })
}

$('#citySearch').on("click", function(){
    var cityInput = $('#userInput').val();
    getWeather(cityInput);
})

$('.city-button').on("click", function(){
    console.log("Hello");
})