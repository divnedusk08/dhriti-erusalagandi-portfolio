
"use client";
import { ProjectCard, type Project } from "@/components/projects/project-card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

const projectsData: Project[] = [
  {
    id: "1",
    title: "HourTrackr NJHS",
    shortDescription: "A web app to help NJHS members easily track and view their volunteer hours, simplifying the process of managing service commitments.",
    longDescription: "HourTrackr NJHS was developed to streamline the volunteer hour logging process for National Junior Honor Society members. The application provides a user-friendly interface for students to submit, track, and get an overview of their service hours, ensuring they meet their requirements with less administrative hassle.",
    purpose: "To provide a centralized and easy-to-use digital tool for NJHS members to manage their volunteer hours, promoting accountability and organization.",
    functionality: [
      "User-friendly hour submission form",
      "Dashboard to view total and individual hours logged",
      "Secure user authentication for members",
      "Automated tracking of service hour goals",
    ],
    techStack: ["React", "Firebase", "Netlify", "Shadcn/UI", "Tailwind CSS"],
    liveLink: "https://hourtrackr.netlify.app/",
  },
  {
    id: "2",
    title: "Weather App",
    shortDescription: "A desktop weather application built with PyQt5 that provides real-time weather information with beautiful emoji representations and temperature displays.",
    longDescription: "The Weather App is a desktop application developed using PyQt5 that allows users to get current weather information for any city. The app features a clean, modern interface with large emoji weather representations and displays temperature in Fahrenheit. It includes comprehensive error handling for various API response scenarios and network issues.",
    purpose: "To provide a user-friendly desktop application for checking weather conditions with visual weather representations and accurate temperature data.",
    functionality: [
      "Real-time weather data retrieval via OpenWeatherMap API",
      "Beautiful emoji weather representations based on weather conditions",
      "Temperature display in Fahrenheit with precise calculations",
      "Comprehensive error handling for API and network issues",
      "Clean, modern PyQt5 interface with custom styling",
      "Support for any city worldwide",
    ],
    techStack: ["Python", "PyQt5", "Requests", "OpenWeatherMap API"],
    liveLink: undefined,
    repoLink: "https://github.com/yourusername/weather-app",
    codeContent: `import sys
import requests
from PyQt5.QtWidgets import (QApplication, QWidget, QLabel,
                             QLineEdit, QPushButton, QVBoxLayout)
from PyQt5.QtCore import Qt
from requests import HTTPError


class WeatherApp(QWidget):
    def __init__(self):
        super().__init__()
        self.city_label = QLabel("Enter city name: ", self)
        self.city_input = QLineEdit(self)
        self.get_weather_button = QPushButton("Get Weather", self)
        self.temperature_label = QLabel(self)
        self.emoji_label = QLabel(self)
        self.description_label = QLabel(self)
        self.initUI()

    def initUI(self):
        vbox = QVBoxLayout()

        vbox.addWidget(self.city_label)
        vbox.addWidget(self.city_input)
        vbox.addWidget(self.get_weather_button)
        vbox.addWidget(self.temperature_label)
        vbox.addWidget(self.emoji_label)
        vbox.addWidget(self.description_label)

        self.setLayout(vbox)

        self.city_label.setAlignment(Qt.AlignCenter)
        self.city_input.setAlignment(Qt.AlignCenter)
        self.temperature_label.setAlignment(Qt.AlignCenter)
        self.emoji_label.setAlignment(Qt.AlignCenter)
        self.description_label.setAlignment(Qt.AlignCenter)

        self.city_label.setObjectName("city_label")
        self.city_input.setObjectName("city_input")
        self.get_weather_button.setObjectName("get_weather_button")
        self.temperature_label.setObjectName("temperature_label")
        self.emoji_label.setObjectName("emoji_label")
        self.description_label.setObjectName("description_label")

        self.setStyleSheet("""
            QLabel, QPushButton{
                font-family: Arial;
            }    
            QLabel#city_label{
                font-size: 40px;
                font-style: italic;
            }
            QLineEdit#city_input{
                  font-size: 30px;
                  min-height: 10px;
                  padding: 10px;
            }
            QPushButton#get_weather_button{
                font-size: 30px;
                font-weight: bold;
            }
            QLabel#temperature_label{
                font-size: 55px;
            }
            QLabel#emoji_label{
                font-size: 100px;
                font-family: Segoe UI emoji;
            }
            QLabel#description_label{
                font-size: 50px;
            }         
        """)

        self.get_weather_button.clicked.connect(self.get_weather)

    def get_weather(self):

        api_key = "dfc6b354589374f91db32c13ab83e4a0"
        city = self.city_input.text()
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()

            if data["cod"] == 200:
                self.display_weather(data)

        except requests.exceptions.HTTPError as http_error:
            match response.status_code:
                case 400:
                    self.display_error("Bad request:\\nPlease check your input")
                case 401:
                    self.display_error("Unauthorized:\\nInvalid API key")
                case 403:
                    self.display_error("Forbidden:\\nAccess is denied")
                case 404:
                    self.display_error("Not found:\\nCity not found")
                case 500:
                    self.display_error("Internal Server:\\nPlease try again later")
                case 502:
                    self.display_error("Bad Gateway:\\nInvalid response from the server")
                case 503:
                    self.display_error("Service Unavailable:\\nServer is down")
                case 504:
                    self.display_error("Bad request:\\nNo response from the server")
                case _:
                    self.display_error(f"HTTP error occurred:\\n{http_error}")

        except requests.exceptions.ConnectionError:
            self.display_error("Connection Error: \\nCheck your internet connection")
        except requests.exceptions.Timeout:
            self.display_error("Timeout Error: \\nThe request timed out")
        except requests.exceptions.TooManyRedirects:
            self.display_error("Too many Redirects: \\nCheck the URL")
        except requests.exceptions.RequestException as req_error:
            self.display_error(f"Request Error: \\n{req_error}")

    def display_error(self, message):
        self.temperature_label.setStyleSheet("font-size: 30px;")
        self.temperature_label.setText(message)
        self.emoji_label.clear()
        self.description_label.clear()

    def display_weather(self, data):
        self.temperature_label.setStyleSheet("font-size: 60px;")
        temperature_k = data["main"]["temp"]
        temperature_c = temperature_k - 273.15
        temperature_f = (temperature_k * 9/5) - 459.67
        weather_id = data["weather"][0]["id"]
        weather_description = data["weather"][0]["description"]

        self.temperature_label.setText((f"{temperature_f:.0f}°F"))
        self.emoji_label.setText(self.get_weather_emoji(weather_id))
        self.description_label.setText(weather_description)

    @staticmethod
    def get_weather_emoji(weather_id):
        if 200 <= weather_id <= 232:
            return "⛈️"  # Thunderstorm
        elif 300 <= weather_id <= 321:
            return "🌦️"  # Drizzle
        elif 500 <= weather_id <= 504:
            return "🌧️"  # Rain
        elif weather_id == 511:
            return "🌨️"  # Freezing rain
        elif 520 <= weather_id <= 531:
            return "🌦️"  # Shower rain
        elif 600 <= weather_id <= 622:
            return "❄️"  # Snow
        elif 701 <= weather_id <= 741:
            return "🌫️"  # Fog, mist, haze
        elif weather_id == 762:
            return "🌋"
        elif weather_id == 771:
            return "💨"
        elif weather_id == 781:
            return "🌪️"
        elif weather_id == 800:
            return "☀️"  # Clear
        elif weather_id == 801:
            return "🌤️"  # Few clouds
        elif weather_id == 802:
            return "⛅"  # Scattered clouds
        elif weather_id == 803:
            return "🌥️"  # Broken clouds
        elif weather_id == 804:
            return "☁️"  # Overcast clouds
        else:
            return "❓"

if __name__ == "__main__":
    app = QApplication(sys.argv)
    weather_app = WeatherApp()
    weather_app.show()
    sys.exit(app.exec_())`,
  },
  {
    id: "3",
    title: "TaskFlow",
    shortDescription: "My to-do list app is designed to help users stay organized, focused, and productive. With a clean interface and easy-to-use features, it makes task management simple and effective.",
    longDescription: "TaskFlow is a user-friendly to-do list application aimed at boosting personal productivity. It allows users to create, manage, and track their tasks, set priorities, and mark them as complete. The clean and intuitive interface ensures a seamless user experience.",
    purpose: "To offer a simple yet powerful tool for individuals to manage their daily tasks, improve organization, and enhance productivity.",
    functionality: [
      "Create new tasks with titles and descriptions",
      "Mark tasks as complete/incomplete",
      "Set task priorities (e.g., high, medium, low)",
      "Filter tasks by status or priority",
      "User-friendly interface for easy task management",
    ],
    techStack: ["React", "TypeScript", "Shadcn/UI", "Tailwind CSS", "Local Storage"],
    liveLink: "https://9000-firebase-studio-1748367990635.cluster-pgviq6mvsncnqxx6kr7pbz65v6.cloudworkstations.dev",
  },
];

export default function ProjectsSection() {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl interactive-text-hover">
          My Projects
        </h2>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          A collection of my work, demonstrating my skills and passion.
        </p>
      </header>

      {projectsData.length > 0 ? (
        <div
          ref={containerRef}
          className={cn(
            "grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 stagger-fade-in-container",
            { "is-visible": isVisible }
          )}
        >
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className="stagger-item"
              style={{ animationDelay: `${index * 100}ms` }}
            > {/* Stagger animation */}
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No projects to display yet.</p>
      )}
    </div>
  );
}
