const cityNames = []; //used to verify if a city is already in the list
function getWeather(apiCall){
    fetch(apiCall)
        .then(function(response){
            if (response.status === 404){
                $('#city-name').text("Invalid City, Try again");
                $('#forcast-text').text("");
            }
            return response.json();
        })
        .then(function(data){
            ///////////////////////////////////////

            if (cityNames.length === 0){
                $('<button type="button" class="city-button">' + data.city.name + '</button>').appendTo('#saved-searches');//add city to list
                cityNames.push(data.city.name);
            }
            else if (cityNames.length > 0 && (cityNames.includes(data.city.name)== false)){
                $('<button type="button" class="city-button">' + data.city.name + '</button>').appendTo('#saved-searches');//add city to list
                cityNames.push(data.city.name);
            }
            //////////////////////////////////////
            ////////////////////////////////////////////////////////
            //create weather cards
            for (var i = 0; i < 5; i++){
                $('<div class="col box weather-day">' + '</div>').appendTo('#weather-cards');
            }
            ////////////////////////////////////////////////////
            //populate top info
            var icon = ("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png'>");
            $('#city-name').text(data.city.name);
            $('#city-name').append(icon);
            $('<li class="main-info">' + "Date: " + moment(data.list[0].dt_txt).format("M/D/YY") + '</li>').appendTo('#info');
            $('<li class="main-info">' + "Temp: " + data.list[0].main.temp + "&#8457;" + '</li>').appendTo('#info');
            $('<li class="main-info">' + "Windspeed: "+ data.list[0].wind.speed + "MPH" + '</li>').appendTo('#info');
            $('<li class="main-info">' + "Humidity: " + data.list[0].main.humidity + "%" + '</li>').appendTo('#info');

            $('#forcast-text').text(data.city.name + " 5 day forecast.");
            /////////////////////////////////////////////////////////////
            //populate weather cards
            var x = 2;
            var weatherCards = $('.weather-day'); //get every card with a weather-day class
            for (var i = 0; i < 5; i++){ //iterate 5 times because we have 5 cards
                 //dislay info to cards
                var icon = ("<img src='http://openweathermap.org/img/w/" + data.list[x].weather[0].icon + ".png'>");
                var time = moment(data.list[x].dt_txt).format("M/D/YY");
                $('<li>' + "Date: " + time + '</li>').appendTo(weatherCards.eq(i));
                $('<li>' + "Temp: " + data.list[x].main.temp + "&#8457;" + icon + '</li>').appendTo(weatherCards.eq(i));
                $('<li>' + "Windspeed: " + data.list[x].wind.speed + '</li>').appendTo(weatherCards.eq(i));
                $('<li>' + "Humidity: " + data.list[x].main.humidity +"%" + '</li>').appendTo(weatherCards.eq(i));
                x += 8;
            }
            /////////////////////////////////////////////////////////////////////////////////////
            
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