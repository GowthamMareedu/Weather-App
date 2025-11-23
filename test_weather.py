import requests

API_KEY = "26c2a6127edf49c2a9e153735250211"
CITY = "Vellore"

url = f"https://api.weatherapi.com/v1/current.json?key={API_KEY}&q={CITY}"

response = requests.get(url)
data = response.json()

# Handle errors safely
if "error" in data:
    print("❌ Error:", data["error"]["message"])
else:
    location = data["location"]["name"]
    country = data["location"]["country"]
    temp_c = data["current"]["temp_c"]
    condition = data["current"]["condition"]["text"]
    humidity = data["current"]["humidity"]
    wind_kph = data["current"]["wind_kph"]

    print(f"🌍 Location: {location}, {country}")
    print(f"🌡️ Temperature: {temp_c}°C")
    print(f"☁️ Condition: {condition}")
    print(f"💧 Humidity: {humidity}%")
    print(f"🌬️ Wind: {wind_kph} km/h")
