//All cities tz
let parisTime = "Europe/Paris";
let torontoTime = "America/Toronto";
let dubaiTime = "Asia/Dubai";

function updateTime() {
  //Paris
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    parisDateElement.innerHTML = moment().tz(parisTime).format("MMMM Do YYYY");
    parisTimeElement.innerHTML = moment()
      .tz(parisTime)
      .format("h:mm:ss [<small>]A[</small>]");
  }
  //Toronto
  let torontoElement = document.querySelector("#toronto");
  if (torontoElement) {
    let torontoDateElement = torontoElement.querySelector(".date");
    let torontoTimeElement = torontoElement.querySelector(".time");
    torontoDateElement.innerHTML = moment()
      .tz(torontoTime)
      .format("MMMM Do YYYY");
    torontoTimeElement.innerHTML = moment()
      .tz(torontoTime)
      .format("h:mm:ss [<small>]A[</small>]");
  }
  //Dubai
  let dubaiElement = document.querySelector("#dubai");
  if (dubaiElement) {
    let dubaiDateElement = dubaiElement.querySelector(".date");
    let dubaiTimeElement = dubaiElement.querySelector(".time");
    dubaiDateElement.innerHTML = moment().tz(dubaiTime).format("MMMM Do YYYY");
    dubaiTimeElement.innerHTML = moment()
      .tz(dubaiTime)
      .format("h:mm:ss [<small>]A[</small>]");
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
    <div class="city">
        <div>
            <h2 class="city-name">${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format(
          "h:mm:ss [<small>]A[</small>]"
        )}</div>
    </div>
    `;
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");

citiesSelectElement.addEventListener("change", updateCity);
