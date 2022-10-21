function getWeather(apiCall){
    fetch(apiCall)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            //////////////////////////////////////
            var icon = ("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png'>");
            $('#city-name').text(data.city.name);
            console.log($('#city-name')[0].innerText);
            $('#city-name').append(icon);
            ////////////////////////////////////////////////////////
            //create weather cards
            for (var i = 0; i < 5; i++){
                $('<div class="col box weather-day">' + '</div>').appendTo('#weather-cards');
            }
            ////////////////////////////////////////////////////
            //populate top info
            var weatherinfo = [moment(data.list[0].dt_txt).format("M/D/YY"), data.list[0].main.temp,data.list[0].wind.speed, data.list[0].main.humidity];
            for (var i = 0; i < 4; i++){
                $('<li class="main-info">' + `${weatherinfo[i]}` + '</li>').appendTo('#info');
            }
            /////////////////////////////////////////////////////////////
            //populate weather cards
            var x = 2;
            var weatherCards = $('.weather-day'); //get every card with a weather-day class
            for (var i = 0; i < 5; i++){ //iterate 5 times because we have 5 cards
                 //dislay info to cards
                var icon = ("<img src='http://openweathermap.org/img/w/" + data.list[x].weather[0].icon + ".png'>");
                var time = moment(data.list[x].dt_txt).format("M/D/YY");
                $('<li>' + "Date: " + time + '</li>').appendTo(weatherCards.eq(i));
                $('<li>' + "Temp: " + data.list[x].main.temp + "F" + icon + '</li>').appendTo(weatherCards.eq(i));
                $('<li>' + "Windspeed: " + data.list[x].wind.speed + '</li>').appendTo(weatherCards.eq(i));
                $('<li>' + "Humidity: " + data.list[x].main.humidity +"%" + '</li>').appendTo(weatherCards.eq(i));
                x += 8;
            }
            /////////////////////////////////////////////////////////////////////////////////////
            //add city to list
            $('<button type="button" class="city-button">' + data.city.name + '</button>').appendTo('#saved-searches');
            localStorage.setItem(data.city.name, apiCall); //save api call to local storage
            //use those buttons for something!
            $('.city-button').on("click", function(event){
                event.stopImmediatePropagation();
                apiCall = (localStorage.getItem($(this)[0].innerText)); //get api call from local storage

                ///remove info
                if ($(this)[0].innerText != $('#city-name')[0].innerText){ //if you click on a button with a different name
                    $('.weather-day').each(function(){
                    $(this).remove();
                })
                    $('.main-info').each(function(){
                        $(this).remove();
                    })
                    $('#city-name').text("");
                    getWeather(apiCall);
                }
                
            })
            //////////////////////////////////////////////////////////////////////////////////////////////////////
        })
}
///////////////////////////////////////////////////////
$('#citySearch').on("click", function(){
    var cityInput = $('#userInput').val();
    var apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&cnt=48&appid=bc44410118b10b4a172dcfb25048ec75&units=imperial`;
    $('.weather-day').each(function(){
        $(this).remove();
    })
        $('.main-info').each(function(){
            $(this).remove();
        })
        $('#city-name').text("");
    getWeather(apiCall);
})

