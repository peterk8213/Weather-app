const apiKey = '07f6a3b0c07c52676f7223135c29b532';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
const searchBtn = document.getElementById("search-button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(cityName){
   
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    if (response.status !== 200) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        function reRun(){
            window.location.reload();
        }
        setTimeout(reRun,3000); 
            
    }
   
    if(response.status === 200){
        let data = await response.json();
        console.log(data.coord.lon, data.coord.lat)
        getTime(data.coord.lon, data.coord.lat);
        document.querySelector(".city").innerHTML =data.name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp)+"°C" ;
        document.querySelector(".humidity").innerHTML = data.main.humidity;
        document.querySelector(".wind").innerHTML =Math.floor(data.wind.speed)+"Km/h";
        if(data.weather[0].main ==="Clouds"){
            weatherIcon.src ="clouds.png";
        }
        if(data.weather[0].main ==="Clear"){
            weatherIcon.src ="clear.png";
        }
        else if(data.weather[0].main ==="Rain"){
            weatherIcon.src ="clouds.png";
        }
        else if(data.weather[0].main ==="Drizzle"){
            weatherIcon.src ="drizzle.png";
        }
        else if(data.weather[0].main ==="Mist"){
            weatherIcon.src ="mist.png";
        }

    }
}
async function getTime(longitude,latitude){
    try {
        
        const Key = "LB3DPT7AFIP7"
        const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${Key}&format=json&by=position&lat=${latitude}&lng=${longitude}`);
        const package = await response.json();
        if(package.status = "OK"){
            const time = document.querySelector(".selected-country-time");
            time.textContent ="Local time: " + package.formatted
            console.log(package)
        }
       

    } catch (error) {
        
    }
}

searchBtn.addEventListener("click",()=>{
    const city = document.querySelector(".search input").value;
    checkWeather(city);
   
})
