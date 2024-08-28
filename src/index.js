let parisTime = "Europe/Paris";

function updateTime() {
  //Paris
  let parisElement = document.querySelector("#paris");
  let parisDateElement = parisElement.querySelector(".date");
  let parisTimeElement = parisElement.querySelector(".time");
  parisDateElement.innerHTML = moment().tz(parisTime).format("MMMM Do YYYY");
  parisTimeElement.innerHTML = moment()
    .tz(parisTime)
    .format("h:mm:ss [<small>]A[</small>]");
}

updateTime();
setInterval(updateTime, 1000);
