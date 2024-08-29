//function to add flag to city name
function getFlagEmoji(timeZone) {
  let flags = {
    "Europe/London": "🇬🇧",
    "America/New_York": "🇺🇸",
    "Asia/Tokyo": "🇯🇵",
    "Australia/Sydney": "🇦🇺",
    "Europe/Istanbul": "🇹🇷",
    "Europe/Athens": "🇬🇷",
    "Asia/Seoul": "🇰🇷",
    "Europe/Stockholm": "🇸🇪",
  };
  return flags[timeZone] || "🎯"; // return a "current location" emoji when not in list
}

//function to setinterval that updates time to current time
function updateTime() {
  let citiesElement = document.querySelectorAll("#cities .city");

  citiesElement.forEach((cityElement) => {
    let timeZone = cityElement.getAttribute("data-timezone");
    let cityTime = moment().tz(timeZone);

    let dateElement = cityElement.querySelector(".date");
    let timeElement = cityElement.querySelector(".time");

    dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
  });
}

//function that returns selection to select city option
function resetCitySelection() {
  let citySelectElement = document.getElementById("city");
  citySelectElement.selectedIndex = 0;
}

//function for adding the selected city to the already existing list of cities
function updateCity(event) {
  let cityTimeZone = event.target.value;

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityFlag = getFlagEmoji(cityTimeZone); // get flag

  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  //check if cityTimeZone is already listed
  if (document.querySelector(`.city[data-timezone="${cityTimeZone}"]`)) {
    alert(`${cityName} or your current time zone is already displayed`);
    return;
  }

  //creating new city
  let newCityHTML = `
    <div class="city" data-timezone="${cityTimeZone}">
        <div>
            <h2 class="city-name">${cityFlag} ${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format(
          "h:mm:ss [<small>]A[</small>]"
        )}</div>
    </div>`;

  //add new city info to displayed list
  citiesElement.insertAdjacentHTML("afterbegin", newCityHTML);

  //show reset button
  let resetButton = document.getElementById("reset-button");
  if (resetButton) {
    resetButton.style.display = "block";
  } else {
    console.error("Reset button not found"); //dbeug log
  }

  //reset selection to "Select a city..."
  resetCitySelection();
}

function resetList() {
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = "";

  let originalCities = `
        <div class="city" id="paris" data-timezone="Europe/Paris">
          <div>
            <h2>🇫🇷 Paris</h2>
            <div class="date">August 28th 2024</div>
          </div>
          <div class="time">15:58:13 <small>PM</small></div>
        </div>
        <div class="city" id="toronto" data-timezone="America/Toronto">
          <div>
            <h2>🇨🇦 Toronto</h2>
            <div class="date">August 28th 2024</div>
          </div>
          <div class="time">15:58:13 <small>PM</small></div>
        </div>
        <div class="city" id="dubai" data-timezone="Asia/Dubai">
          <div>
            <h2>🇦🇪 Dubai</h2>
            <div class="date">August 28th 2024</div>
          </div>
          <div class="time">15:58:13 <small>PM</small></div>
        </div> `;

  citiesElement.insertAdjacentHTML("afterbegin", originalCities);

  let resetButton = document.getElementById("reset-button");
  resetButton.style.display = "none";

  updateTime();
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);

let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetList);
