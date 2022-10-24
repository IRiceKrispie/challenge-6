const cityNames = []; //used to verify if a city is already in the list
function getWeather(apiCall){ //getWeather function with one parameter passed in
    fetch(apiCall) //use fetch with our api call
        .then(function(response){ //handle our response. If we get a 404 display an error message
            if (response.status === 404){
                $('#city-name').text("Invalid City, Try again");
                $('#forcast-text').text("");
            }
            return response.json(); //return the response to be used by the second promise
        })
        .then(function(data){ //second promise which holds our data object
            if (cityNames.length === 0){ //Adds a city button to our side bar when the first search is made
                $('<button type="button" class="city-button">' + data.city.name + '</button>').appendTo('#saved-searches');//add city to list
                cityNames.push(data.city.name); //add the city name to our array to check if any repeats are there later
            }
            else if (cityNames.length > 0 && (cityNames.includes(data.city.name)== false)){ //this is used after the first button is added. If the city name already exists a new button is not added
                $('<button type="button" class="city-button">' + data.city.name + '</button>').appendTo('#saved-searches');//add city to list
                cityNames.push(data.city.name);
            }   
            for (var i = 0; i < 5; i++){//create 5 weather cards
                $('<div class="col box weather-day">' + '</div>').appendTo('#weather-cards');
            }
            //populate top info
            var icon = ("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png'>"); //get the icon for the top header
            $('#city-name').text(data.city.name); //populate the top header with the city name and the weather info
            $('#city-name').append(icon);
            $('<li class="main-info">' + "Date: " + moment(data.list[0].dt_txt).format("M/D/YY") + '</li>').appendTo('#info'); //use moment JS to format our unix time stamp
            $('<li class="main-info">' + "Temp: " + data.list[0].main.temp + "&#8457;" + '</li>').appendTo('#info');
            $('<li class="main-info">' + "Windspeed: "+ data.list[0].wind.speed + "MPH" + '</li>').appendTo('#info');
            $('<li class="main-info">' + "Humidity: " + data.list[0].main.humidity + "%" + '</li>').appendTo('#info');

            $('#forcast-text').text(data.city.name + " 5 day forecast."); //small message before the 5 day forecast with the city name
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
                x += 8; //jump 8 indexes to try and get to a new day to display the forecast on the next card
            }
            localStorage.setItem(data.city.name, apiCall); //save api call to local storage with the city name as the name of the storage item
            $('.city-button').on("click", function(event){ //This function happens when one of the api buttons is clicked in the sidebar
                event.stopImmediatePropagation();//this prevents bubbling of all the buttons
                apiCall = (localStorage.getItem($(this)[0].innerText)); //get api call from local storage from the button that was clicked. We use $(this) to target that button
                ///remove info
                if ($(this)[0].innerText != $('#city-name')[0].innerText){ //if you click on a button with a different name, than was it currently displayed, we clean up the webpage first. Then make another api call and display the correct info. If the name is the same nothing needs to be done.
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
        })
}
$('#citySearch').on("click", function(){ //call this function when search button is hit
    var cityInput = $('#userInput').val();//get user input
    var apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&cnt=48&appid=bc44410118b10b4a172dcfb25048ec75&units=imperial`; //save our api call with the city the user wants
    $('.weather-day').each(function(){ //clear the page of any info that may be on it
        $(this).remove();
    })
        $('.main-info').each(function(){
            $(this).remove();
        })
        $('#city-name').text("");
    getWeather(apiCall); //the the getWeather function and pass the apiCall into it
})