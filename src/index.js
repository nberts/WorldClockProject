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
  let cityFlag = getFlagEmoji(cityTimeZone); // get flag emoji

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

  //reset selection to "Select a city..."
  resetCitySelection();
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");

citiesSelectElement.addEventListener("change", updateCity);
