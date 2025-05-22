async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "YOUR_API_KEY"; // استبدل هذه بـ API Key الحقيقي

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById("weatherResult").innerText = "❌ Error: " + error.message;
    }
}

function displayWeather(data) {
    const result = `
    <p>📍 City: ${data.name}</p>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>☁️ Weather: ${data.weather[0].description}</p>
  `;
    document.getElementById("weatherResult").innerHTML = result;
}
