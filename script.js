// دالة لجلب بيانات الطقس من API
async function fetchWeatherData(city) {
    const apiKey = 'e7ddcd08d37f6356df251617992e9a8d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// دالة لعرض بيانات الطقس
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (!data || !data.weather || !data.main) {
        weatherInfo.innerHTML = "خطأ: لا يمكن عرض بيانات الطقس.";
        return;
    }
    const city = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    weatherInfo.innerHTML = `
        <h3>${city}</h3>
        <p>درجة الحرارة: ${temp}°C</p>
        <p>الحالة: ${description}</p>
    `;
}

// دالة لمعالجة المدخلات والأخطاء
async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    try {
        const weatherData = await fetchWeatherData(city);
        displayWeather(weatherData);
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = `
            <p style="color: red;">خطأ: ${error.message}</p>
            <p>من فضلك تأكد من اسم المدينة وحاول مرة أخرى.</p>
        `;
    }
}
