import './style.css';
import { getWeather } from './weather-service';
import { addDays } from 'date-fns';

const sandArr = document.getElementsByClassName('sand');
const beachNode = document.getElementById('heading-sand');
const maxWidth = beachNode!.offsetWidth - 5;
const maxHeight = beachNode!.offsetHeight - 5;

for (const sand of Array.from(sandArr)) {
  const xPos = Math.floor(Math.random() * maxWidth);
  const yPos = Math.floor(Math.random() * maxHeight);

  console.log(xPos, yPos);

  sand.style.top = yPos + 'px';
  sand.style.left = xPos + 'px';
}

const dateOne = document.getElementById('date-one');

const dateTwo = document.getElementById('date-two');

const dateThree = document.getElementById('date-three');

const dayOneTemp = document.getElementById('day-one-temp');

const dayTwoTemp = document.getElementById('day-two-temp');

const dayThreeTemp = document.getElementById('day-three-temp');

const dayOneChanceOfRain = document.getElementById('day-one-chance-of-rain');

const dayTwoChanceOfRain = document.getElementById('day-two-chance-of-rain');

const dayThreeChanceOfRain = document.getElementById('day-three-');

const dayOneWindDirection = document.getElementById('day-one-wind-direction');

const dayTwoWindDirection = document.getElementById('day-two-wind-direction');

const dayThreeWindDirection = document.getElementById(
  'day-three-wind-direction'
);

const durbanButton = document.getElementById('durban-container');

const pretoriaButton = document.getElementById('pretoria-container');

const capeTownButton = document.getElementById('capetown-container');

export interface Town {
  lon: number;
  lat: number;
  tzshift: number;
}

const pretoria: Town = {
  lon: 28.2293,
  lat: 25.7479,
  tzshift: 2,
};

const durban: Town = {
  lon: 31.0218,
  lat: 29.8587,
  tzshift: 2,
};

const capeTown: Town = {
  lon: 18.4241,
  lat: 33.9249,
  tzshift: 2,
};

function weatherInfoDisplay(lon: number, lat: number, tzshift: number) {
  getWeather(lon, lat, tzshift).then((response) => {
    if (response.ok) {
      response.json().then((weatherData) => {
        console.log(weatherData);

        const startDateDay = parseInt(weatherData.init.slice(6, 8));
        const startDateMonth = weatherData.init.slice(4, 6);
        const startDateYear = weatherData.init.slice(0, 4);
        let startDate = new Date(startDateYear, startDateMonth, startDateDay);
        const weatherDataTimePoint = weatherData.dataseries;
        //console.log(weatherDataTimePoint);
        const dayOne = weatherDataTimePoint[3];
        //console.log(dayOne);
        const dayTwo = weatherDataTimePoint[11];
        //console.log(dayTwo);
        const dayThree = weatherDataTimePoint[19];
        //console.log(dayThree);

        if (dateOne) {
          dateOne.innerText = '';
          dateOne.innerText = `${startDate}`.slice(4, 15);
        }
        if (dateTwo) {
          dateTwo.innerText = '';
          dateTwo.innerText = `${addDays(startDate, 1)}`.slice(4, 15);
        }
        if (dateThree) {
          dateThree.innerText = '';
          dateThree.innerText = `${addDays(startDate, 2)}`.slice(4, 15);
        }
        if (dayOneTemp) {
          dayOneTemp.innerText = '';
          dayOneTemp.innerText = dayOne.temp2m;
        }
        if (dayTwoTemp) {
          dayTwoTemp.innerText = '';
          dayTwoTemp.innerText = dayTwo.temp2m;
        }
        if (dayThreeTemp) {
          dayThreeTemp.innerText = '';
          dayThreeTemp.innerText = dayThree.temp2m;
        }

        if (dayOneChanceOfRain) {
          dayOneChanceOfRain.innerText = '';
          dayOneChanceOfRain.innerText = dayOne.rh2m;
        }
        if (dayTwoChanceOfRain) {
          dayTwoChanceOfRain.innerText = '';
          dayTwoChanceOfRain.innerText = dayTwo.rh2m;
        }
        if (dayThreeChanceOfRain) {
          dayThreeChanceOfRain.innerText = '';
          dayThreeChanceOfRain.innerText = dayThree.rh2m;
        }

        if (dayOneWindDirection) {
          dayOneWindDirection.innerText = '';
          dayOneWindDirection.innerText = dayOne.wind10m.direction;
        }
        if (dayTwoWindDirection) {
          dayTwoWindDirection.innerText = '';
          dayTwoWindDirection.innerText = dayTwo.wind10m.direction;
        }
        if (dayThreeWindDirection) {
          dayThreeWindDirection.innerText = '';
          dayThreeWindDirection.innerText = dayThree.wind10m.direction;
        }
      });
    }
  });
}

durbanButton?.addEventListener('click', () =>
  weatherInfoDisplay(durban.lon, durban.lat, durban.tzshift)
);

pretoriaButton?.addEventListener('click', () =>
  weatherInfoDisplay(pretoria.lon, pretoria.lat, pretoria.tzshift)
);

capeTownButton?.addEventListener('click', () =>
  weatherInfoDisplay(capeTown.lon, capeTown.lat, capeTown.tzshift)
);
