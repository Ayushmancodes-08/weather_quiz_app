
      // Quiz data
      const quizData = [
        {
          question: "What does CSS stand for?",
          options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets",
          ],
          correct: 1,
        },
        {
          question: "Which HTML tag is used for creating an unordered list?",
          options: ["<ol>", "<ul>", "<li>", "<list>"],
          correct: 1,
        },
        {
          question: "What is the purpose of media queries in CSS?",
          options: [
            "To apply styles based on device characteristics",
            "To query media files in the project",
            "To create responsive typography",
            "To optimize images for different devices",
          ],
          correct: 0,
        },
        {
          question:
            "Which JavaScript method is used to select an HTML element by its id?",
          options: [
            "document.querySelector()",
            "document.getElementByTagName()",
            "document.getElementById()",
            "document.getElementByClass()",
          ],
          correct: 2,
        },
        {
          question: "What does API stand for in web development?",
          options: [
            "Application Programming Interface",
            "Automated Programming Interface",
            "Advanced Programming Integration",
            "Application Process Integration",
          ],
          correct: 0,
        },
      ];

      // DOM Elements
      const quizSection = document.getElementById("quizSection");
      const weatherSection = document.getElementById("weatherSection");
      const navItems = document.querySelectorAll(".nav-item");
      const questionText = document.getElementById("questionText");
      const quizOptionsContainer = document.getElementById(
        "quizOptionsContainer"
      );
      const currentQuestion = document.getElementById("currentQuestion");
      const totalQuestions = document.getElementById("totalQuestions");
      const quizProgress = document.getElementById("quizProgress");
      const resultsContainer = document.getElementById("resultsContainer");
      const quizScore = document.getElementById("quizScore");
      const quizTotal = document.getElementById("quizTotal");
      const restartQuiz = document.getElementById("restartQuiz");
      const cityInput = document.getElementById("cityInput");
      const searchWeather = document.getElementById("searchWeather");
      const cityName = document.getElementById("cityName");
      const weatherDate = document.getElementById("weatherDate");
      const weatherDesc = document.getElementById("weatherDesc");
      const weatherIcon = document.getElementById("weatherIcon");
      const temperature = document.getElementById("temperature");
      const windSpeed = document.getElementById("windSpeed");
      const humidity = document.getElementById("humidity");
      const uvIndex = document.getElementById("uvIndex");
      const visibility = document.getElementById("visibility");
      const apiStatusText = document.getElementById("apiStatusText");
      const forecastContainer = document.getElementById("forecastContainer");
      const apiKeyInput = document.getElementById("apiKeyInput");
      const saveApiKey = document.getElementById("saveApiKey");

      // State variables
      let currentQuestionIndex = 0;
      let score = 0;
      // Set your AccuWeather API key here
      let apiKey = "FDPAocePv6GpmMJan2XFpsJ0HK2FNhSA"; // Replace with your actual API key
      let usingLiveData = false;

      // Initialize the quiz
      function initQuiz() {
        totalQuestions.textContent = quizData.length;
        currentQuestion.textContent = currentQuestionIndex + 1;
        loadQuestion();
      }

      // Load a question
      function loadQuestion() {
        const currentQuizData = quizData[currentQuestionIndex];
        questionText.textContent = currentQuizData.question;

        // Clear previous options
        quizOptionsContainer.innerHTML = "";

        // Add new options
        currentQuizData.options.forEach((option, index) => {
          const optionElement = document.createElement("div");
          optionElement.classList.add(
            "quiz-option",
            "p-4",
            "rounded-xl",
            "border-2",
            "border-gray-200",
            "cursor-pointer",
            "hover:border-accent",
            "transition"
          );
          optionElement.textContent = option;

          optionElement.addEventListener("click", () => {
            selectOption(index);
          });

          quizOptionsContainer.appendChild(optionElement);
        });

        // Update progress bar
        const progressPercentage =
          (currentQuestionIndex / quizData.length) * 100;
        quizProgress.style.width = `${progressPercentage}%`;
      }

      // Handle option selection
      function selectOption(optionIndex) {
        const currentQuizData = quizData[currentQuestionIndex];

        if (optionIndex === currentQuizData.correct) {
          score++;
          // Visual feedback for correct answer
          quizOptionsContainer.children[optionIndex].classList.add(
            "bg-green-100",
            "border-green-500"
          );
        } else {
          // Visual feedback for wrong answer
          quizOptionsContainer.children[optionIndex].classList.add(
            "bg-red-100",
            "border-red-500"
          );
          // Also show correct answer
          quizOptionsContainer.children[currentQuizData.correct].classList.add(
            "bg-green-100",
            "border-green-500"
          );
        }

        // Move to next question after delay
        setTimeout(() => {
          currentQuestionIndex++;

          if (currentQuestionIndex < quizData.length) {
            currentQuestion.textContent = currentQuestionIndex + 1;
            loadQuestion();
          } else {
            showResults();
          }
        }, 1000);
      }

      // Show quiz results
      function showResults() {
        document.getElementById("questionContainer").classList.add("hidden");
        resultsContainer.classList.remove("hidden");
        quizScore.textContent = score;
        quizTotal.textContent = quizData.length;

        // Update progress bar to 100%
        quizProgress.style.width = "100%";
      }

      // Restart quiz
      restartQuiz.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById("questionContainer").classList.remove("hidden");
        resultsContainer.classList.add("hidden");
        initQuiz();
      });

      // Tab navigation
      navItems.forEach((item) => {
        item.addEventListener("click", () => {
          const tab = item.getAttribute("data-tab");

          navItems.forEach((navItem) => {
            navItem.classList.remove("active", "text-primary");
            navItem.classList.add("text-gray-600");
          });

          item.classList.add("active", "text-primary");
          item.classList.remove("text-gray-600");

          if (tab === "quiz") {
            quizSection.classList.remove("hidden");
            weatherSection.classList.add("hidden");
          } else {
            quizSection.classList.add("hidden");
            weatherSection.classList.remove("hidden");
          }
        });
      });

      // Format date
      function formatDate(date) {
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
      }

      // Render forecast
      function renderForecast(forecastData) {
        forecastContainer.innerHTML = "";

        forecastData.forEach((day) => {
          const forecastCard = document.createElement("div");
          forecastCard.classList.add(
            "forecast-card",
            "weather-card",
            "text-center",
            "p-4",
            "rounded-lg"
          );
          forecastCard.innerHTML = `
                    <p class="font-medium">${day.day}</p>
                    <img src="${day.icon}" alt="${day.desc}" class="mx-auto my-2 w-16 h-16">
                    <p class="text-lg font-semibold">${day.temp}°C</p>
                    <p class="text-sm text-gray-600">${day.desc}</p>
                `;
          forecastContainer.appendChild(forecastCard);
        });
      }

      // Get AccuWeather data
      async function getAccuWeather(city) {
        if (!apiKey) {
          throw new Error("No API key provided");
        }

        // Step 1: Get location key
        const locationResponse = await fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
        );

        if (!locationResponse.ok) {
          throw new Error("Failed to fetch location data");
        }

        const locationData = await locationResponse.json();
        if (!locationData || locationData.length === 0) {
          throw new Error("City not found");
        }

        const locationKey = locationData[0].Key;
        const locationName = `${locationData[0].LocalizedName}, ${locationData[0].Country.LocalizedName}`;

        // Step 2: Get current conditions
        const currentResponse = await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
        );

        if (!currentResponse.ok) {
          throw new Error("Failed to fetch current conditions");
        }

        const currentData = await currentResponse.json();
        if (!currentData || currentData.length === 0) {
          throw new Error("Current conditions not available");
        }

        // Step 3: Get 5-day forecast
        const forecastResponse = await fetch(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`
        );

        if (!forecastResponse.ok) {
          throw new Error("Failed to fetch forecast data");
        }

        const forecastData = await forecastResponse.json();

        return {
          locationName,
          current: currentData[0],
          forecast: forecastData,
        };
      }

      // Get weather data
      async function getWeather() {
        const city = cityInput.value.trim();

        if (!city) {
          alert("Please enter a city name");
          return;
        }

        // Show loading state
        searchWeather.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchWeather.disabled = true;

        try {
          // Try to get live data
          const weatherData = await getAccuWeather(city);

          // Update current weather
          cityName.textContent = weatherData.locationName;
          weatherDate.textContent = formatDate(new Date());
          weatherDesc.textContent = weatherData.current.WeatherText;
          weatherIcon.src = `https://developer.accuweather.com/sites/default/files/${weatherData.current.WeatherIcon.toString().padStart(
            2,
            "0"
          )}-s.png`;
          temperature.textContent = `${weatherData.current.Temperature.Metric.Value}°C`;
          windSpeed.textContent = `${weatherData.current.Wind.Speed.Metric.Value} km/h`;
          humidity.textContent = `${weatherData.current.RelativeHumidity}%`;
          uvIndex.textContent = `${
            weatherData.current.UVIndex
          } ${getUvIndexText(weatherData.current.UVIndex)}`;
          visibility.textContent = `${weatherData.current.Visibility.Metric.Value} km`;

          // Update forecast
          const forecastDays = weatherData.forecast.DailyForecasts.map(
            (day) => {
              return {
                day: new Date(day.Date).toLocaleDateString("en-US", {
                  weekday: "short",
                }),
                icon: `https://developer.accuweather.com/sites/default/files/${day.Day.Icon.toString().padStart(
                  2,
                  "0"
                )}-s.png`,
                temp: day.Temperature.Maximum.Value,
                desc: day.Day.IconPhrase,
              };
            }
          );

          renderForecast(forecastDays);

          // Update API status
          usingLiveData = true;
          apiStatusText.textContent = "Using live AccuWeather data";
          apiStatusText.className = "font-medium text-green-600";
        } catch (error) {
          console.error("Error fetching weather data:", error);
          apiStatusText.textContent = "Error: " + error.message;
          apiStatusText.className = "font-medium text-red-600";

          // Fallback to demo data
          useDemoWeatherData(city);
        } finally {
          // Reset button
          searchWeather.innerHTML = '<i class="fas fa-search"></i>';
          searchWeather.disabled = false;
        }
      }

      // Get UV index text
      function getUvIndexText(index) {
        if (index <= 2) return "Low";
        if (index <= 5) return "Moderate";
        if (index <= 7) return "High";
        if (index <= 10) return "Very High";
        return "Extreme";
      }

      // Use demo weather data
      function useDemoWeatherData(city) {
        // Simulate weather data
        const weatherConditions = [
          {
            desc: "Partly sunny",
            icon: "01-s",
            temp: 24,
            wind: 12,
            humidity: 65,
            uv: 5,
            visibility: 16,
          },
          {
            desc: "Mostly sunny",
            icon: "02-s",
            temp: 26,
            wind: 10,
            humidity: 60,
            uv: 6,
            visibility: 18,
          },
          {
            desc: "Cloudy",
            icon: "07-s",
            temp: 20,
            wind: 8,
            humidity: 75,
            uv: 3,
            visibility: 14,
          },
          {
            desc: "Rain",
            icon: "12-s",
            temp: 18,
            wind: 15,
            humidity: 85,
            uv: 2,
            visibility: 8,
          },
          {
            desc: "Thunderstorms",
            icon: "15-s",
            temp: 17,
            wind: 20,
            humidity: 90,
            uv: 1,
            visibility: 5,
          },
        ];

        // Random condition for demo
        const condition =
          weatherConditions[
            Math.floor(Math.random() * weatherConditions.length)
          ];

        // Update weather data
        cityName.textContent = city;
        weatherDesc.textContent = condition.desc;
        weatherIcon.src = `https://developer.accuweather.com/sites/default/files/${condition.icon}.png`;
        temperature.textContent = `${condition.temp}°C`;
        windSpeed.textContent = `${condition.wind} km/h`;
        humidity.textContent = `${condition.humidity}%`;
        uvIndex.textContent = `${condition.uv} ${getUvIndexText(condition.uv)}`;
        visibility.textContent = `${condition.visibility} km`;
        weatherDate.textContent = formatDate(new Date());

        // Generate forecast
        const forecastData = [];
        const baseDate = new Date();

        for (let i = 1; i <= 5; i++) {
          const date = new Date();
          date.setDate(baseDate.getDate() + i);

          const conditions = [
            {
              icon: "01-s",
              desc: "Sunny",
              temp: Math.floor(Math.random() * 10) + 20,
            },
            {
              icon: "02-s",
              desc: "Mostly sunny",
              temp: Math.floor(Math.random() * 8) + 18,
            },
            {
              icon: "06-s",
              desc: "Cloudy",
              temp: Math.floor(Math.random() * 7) + 16,
            },
            {
              icon: "12-s",
              desc: "Showers",
              temp: Math.floor(Math.random() * 5) + 14,
            },
            {
              icon: "07-s",
              desc: "Mostly cloudy",
              temp: Math.floor(Math.random() * 6) + 15,
            },
          ];

          const condition =
            conditions[Math.floor(Math.random() * conditions.length)];

          forecastData.push({
            day: date.toLocaleDateString("en-US", { weekday: "short" }),
            icon: `https://developer.accuweather.com/sites/default/files/${condition.icon}.png`,
            temp: condition.temp,
            desc: condition.desc,
          });
        }

        renderForecast(forecastData);
      }

      // Save API key
      saveApiKey.addEventListener("click", () => {
        const key = apiKeyInput.value.trim();
        if (key) {
          apiKey = key;
          localStorage.setItem("accuWeatherApiKey", key);
          alert("API key saved successfully!");
        } else {
          alert("Please enter a valid API key");
        }
      });

      // Initialize the application
      document.addEventListener("DOMContentLoaded", () => {
        initQuiz();

        // Set default API key if available
        if (apiKey) {
          apiKeyInput.value = apiKey;
        }

        // Load weather for default city
        getWeather();
      });

      // Add event listeners
      searchWeather.addEventListener("click", getWeather);
      cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          getWeather();
        }
      });
    