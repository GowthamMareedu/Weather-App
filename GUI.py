import requests
from tkinter import *
from PIL import Image, ImageTk
from io import BytesIO

def get_weather():
    API_KEY = "26c2a6127edf49c2a9e153735250211"
    city = city_entry.get()
    if not city:
        result_label.config(text="⚠️ Please enter a city name.")
        return

    url = f"https://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}"
    response = requests.get(url)
    data = response.json()

    if "error" in data:
        result_label.config(text="❌ City not found or API error.")
        icon_label.config(image="")
    else:
        temp_c = data["current"]["temp_c"]
        condition = data["current"]["condition"]["text"]
        humidity = data["current"]["humidity"]
        wind_kph = data["current"]["wind_kph"]
        icon_url = "https:" + data["current"]["condition"]["icon"]

        # Display weather icon
        icon_response = requests.get(icon_url)
        img_data = icon_response.content
        icon = Image.open(BytesIO(img_data))
        icon = icon.resize((70, 70))
        photo = ImageTk.PhotoImage(icon)
        icon_label.config(image=photo)
        icon_label.image = photo

        # Display weather text
        result_label.config(
            text=(
                f"🌡 {temp_c}°C\n"
                f"☁ {condition}\n"
                f"💧 Humidity: {humidity}%\n"
                f"🌬 Wind: {wind_kph} km/h"
            )
        )

root = Tk()
root.title("Weather App 🌤️")
root.geometry("380x420")
root.config(bg="#e3f2fd")

Label(root, text="Weather Application", font=("Helvetica", 18, "bold"), bg="#e3f2fd", fg="#0d47a1").pack(pady=15)
Label(root, text="Enter City Name:", font=("Helvetica", 14), bg="#e3f2fd").pack(pady=5)

city_entry = Entry(root, font=("Helvetica", 14), justify="center", width=20)
city_entry.pack(pady=5)

Button(root, text="Get Weather", font=("Helvetica", 12, "bold"), bg="#2196f3", fg="white",
       activebackground="#1976d2", command=get_weather).pack(pady=10)

icon_label = Label(root, bg="#e3f2fd")
icon_label.pack(pady=10)

result_label = Label(root, text="", font=("Helvetica", 14), bg="#e3f2fd")
result_label.pack(pady=10)

root.mainloop()
