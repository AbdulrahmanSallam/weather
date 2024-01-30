const searchInput = document.getElementById("f-input");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const searchBtn = document.getElementById("find-btn");

getData("cairo");
// find button 
searchBtn.addEventListener("click", function () {
  const currentVal = searchInput.value;
  getData(currentVal);
});
// input
searchInput.addEventListener("input", function () {
  const currentVal = this.value;
  getData(currentVal);
});
// data
let data = [];
let dayName,
  monthName,
  dayDate,
  country,
  temp,
  iconUrl,
  status,
  umbrella,
  wind,
  dir,
  maxTemp,
  minTemp;

function setALlDate(allData, dayForecastIndex) {
  const date = new Date(allData.forecast.forecastday[dayForecastIndex].date);
  //get dayDate
  const dateStringArray = date.toDateString().split(" ", 3);
  dayDate = dateStringArray[2];

  // get day name
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dayName = days[date.getDay()];

  // get month name
  const MonthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthName = MonthsName[date.getMonth()]; // month name
}

// ================ card1 ==================
function setCard1Data(allData) {
  setALlDate(allData, 0);
  country = allData.location.name;
  temp = allData.current.temp_c;
  iconUrl = allData.current.condition.icon;
  status = allData.current.condition.text;
  umbrella = allData.current.humidity;
  wind = allData.current.wind_kph;
  dir = allData.current.wind_dir;
}

function displayCard1() {
  const container = `
                        <div class="c-top text-white-50 px-2 d-flex justify-content-between align-items-center p-2"> <span
                                id="day">${dayName}</span> <span id="date">${dayDate} ${monthName}</span></div>
                        <div class="c-content text-white p-3 ">
                            <div>
                                <span id="country" class="text-white-50 fs-3">${country}</span>
                            </div>
                            <div class="temp d-flex mb-4 justify-content-evenly ">
                                <div>${temp}<sup>o</sup>c</div><img src="${iconUrl}" alt="weather icon">
                            </div>
                            <p>${status}</p>
                            <div class="c-bottom d-flex text-white-50  align-items-center">
                                <div class="d-inline-block me-4"><img src="images/icon-umberella@2x.png" alt="umbrella icon"> ${umbrella}%
                                </div>
                                <div class="d-inline-block me-4"><img src="images/icon-wind@2x.png" alt="wind icon"> ${wind}km/h</div>
                                <div class="d-inline-block me-4"><img src="images/icon-compass@2x.png" alt="compass icon"> ${dir}
                                </div>
                            </div>
                        </div>
    `;
  card1.innerHTML = container;
}

// ================ card2_3 ==================

function setCards2_3Data(allData, dayIndex) {
  const day2Data = allData.forecast.forecastday[dayIndex].day;
  setALlDate(allData, dayIndex);
  maxTemp = day2Data.maxtemp_c;
  minTemp = day2Data.mintemp_c;
  iconUrl = day2Data.condition.icon;
  status = day2Data.condition.text;
}

function displayCard2() {
  const container = `
      <div class="c2-top d-flex text-white-50  justify-content-center align-items-center  p-2">${dayName}
      </div>
      <div class="c-content text-white  p-3">
          <div class="ce-img my-3"><img  src="${iconUrl}" alt="weather icon"></div>
          <div class="my-3"> <span class="d-block fs-3 fw-bold">${maxTemp} <sup>o</sup>C</span>
              <span>${minTemp} <sup>o</sup>C</span>
          </div>
          <p class="mt-5">${status}</p>
      </div>
      `;
  card2.innerHTML = container;
}

function displayCard3() {
  const container = `
      <div class="c-top d-flex text-white-50  justify-content-center align-items-center  p-2">${dayName}
      </div>
      <div class="c-content text-white  p-3">
          <div class="ce-img my-3"><img  src="${iconUrl}" alt="weather icon"></div>
          <div class="my-3"><span class="d-block fs-3 fw-bold">${maxTemp} <sup>o</sup>C</span>
              <span>${minTemp} <sup>o</sup>C</span>
          </div>
          <p class="mt-5">${status}</p>
      </div>
      `;
  card3.innerHTML = container;
}

//==================== Display all cards =============

function displayALlCards(data) {
  setCard1Data(data);
  displayCard1();
  setCards2_3Data(data, 1);
  displayCard2();
  setCards2_3Data(data, 2);
  displayCard3();
}

// ============== API ==============
async function getData(q) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=3d1de6a1a7ad4bf98b0191037242801&q=${q}&days=7`
  );

  if (response.status == 200 && response.ok == true) {
    const finalResponse = await response.json();
    data = finalResponse;
    displayALlCards(data);
  } else {
    console.log("error in api");
  }
}
